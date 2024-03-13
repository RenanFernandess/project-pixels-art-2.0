interface StyleProps {
  backgroundColor: string;
  width: string;
  height: string;
}

export default function addStyle(node: HTMLElement, style: StyleProps) {
  const { backgroundColor, width, height } = style;
  node.style.backgroundColor = backgroundColor;
  node.style.width = width;
  node.style.height = height;
}