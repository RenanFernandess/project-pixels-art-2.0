export default function createButton(text, id, className, name) {
  const button = document.createElement('button');
  button.type = 'button';
  button.id = id;
  button.className = className;
  button.name = name;
  button.innerText = text;
  return button;
}