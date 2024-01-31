"use client";

import { User } from "@/payload-types";
import { trpc } from "@/trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

type AuthContext = {
  user?: User | null;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
};
const Context = createContext({} as AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null | undefined>();
  const fetchedMe = useRef(false);

  const signOut = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok)
        throw new Error("An error occurred while attempting to logout.");

      setUser(null);

      toast.success("Signed out successfully");
    } catch (err) {
      toast.error("Couldn&apos;t sign out, please tyr again.");
    }
  };

  useEffect(() => {
    if (fetchedMe.current) return;
    fetchedMe.current = true;

    const fetchMe = async () => {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`
      ).then((req) => req.json());
      setUser(result.user ?? null);
      return result.user;
    };

    fetchMe();
  }, []);

  return (
    <Context.Provider value={{ user, setUser, signOut }}>
      {children}
    </Context.Provider>
  );
};

type UseAuth<T = User> = () => AuthContext; // eslint-disable-line no-unused-vars
export const useAuth: UseAuth = () => useContext(Context);

const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc`,
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: "include",
            });
          },
        }),
      ],
    })
  );

  return (
    <AuthProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </trpc.Provider>
    </AuthProvider>
  );
};

export default Providers;
