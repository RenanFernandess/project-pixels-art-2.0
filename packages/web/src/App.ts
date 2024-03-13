import ColorPalette from "./components/ColorPalette";
import { createHTML } from "./server/createHTML";


function App() {
  return createHTML.section({ child: ColorPalette() });
};

export default App()