import { createHTML } from "../../server";

export default function Pixel() {
  const style = { width: '20px', height: '20px', backgroundColor: 'black' }
  return createHTML.div({ style, className: 'pixel'});
}
