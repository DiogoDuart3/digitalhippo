"use client";

import { useCart } from "@/hooks/use-cart";
import { Product } from "@/payload-types";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsSuccess(false), 2000);

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <Button
      onClick={() => {
        addItem(product);
        setIsSuccess(true);
      }}
      size="lg"
      className="w-full"
      disabled={isSuccess}
    >
      {isSuccess ? "Added!" : "Add to cart"}
    </Button>
  );
};

export default AddToCartButton;
