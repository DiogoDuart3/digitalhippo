import { RichTextElement } from "@payloadcms/richtext-slate";
import br from "./br";
import label from "./label";
import largeBody from "./largeBody";
import video from "./video";

const elements: RichTextElement[] = [
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "link",
  largeBody,
  label,
  video,
  br,
  "upload",
  "ul",
  "ol",
];

export default elements;
