export default function createButton(
  { text = '', id, className = 'buttons', name, typeEvent = 'click' },
  callback,
  ) {
  const button = document.createElement('button');
  button.type = 'button';
  if (id) button.id = id;
  button.className = className;
  if (name) button.name = name;
  if (callback) button.addEventListener(typeEvent, callback);
  button.innerText = text;
  return button;
}

export function createDiv({ id, className, typeEvent = 'click' }, callback) {
  const div = document.createElement('div');
  div.className = className;
  if (id) div.id = id;
  if (callback) div.addEventListener(typeEvent, callback);
  return div;
}