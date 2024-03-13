import { createHTML } from "../../server";
import Pixel from "../Pixel";

export default function ColorPalette() {
  return createHTML.div({
    child: [Pixel(), Pixel(), Pixel(), Pixel(), Pixel(), Pixel(), Pixel()],
    className: 'color-palette'
  });
};
