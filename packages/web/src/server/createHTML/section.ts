interface sectionProps {
  child: HTMLElement | string;
  className?: string;
}

export default function section({ child, className}: sectionProps) {
  const section = document.createElement("section");
  className && section.classList.add(className);
  section.append(child);
  return section;
}