import { addStyle } from "./utils";

type child = HTMLElement | string | HTMLElement[];

interface divProps {
  child?: child;
  className?: string;
  style?: {
    backgroundColor: string;
    width: string;
    height: string;
  }
}

export default function div({ className, child, style }: divProps) {
  const div = document.createElement("div");
  className && div.classList.add(className);
  style && addStyle(div, style);
  if (Array.isArray(child)) child.forEach(el => div.appendChild(el));
  else div.append(child || '');
  return div;
};