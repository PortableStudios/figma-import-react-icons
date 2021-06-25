import iconManifest from './iconManifest';
import './ui.scss';

const postMessage = (pluginMessage: unknown) => {
  window.parent.postMessage({ pluginMessage }, '*');
};

const getElement = (className: string) => {
  return document.getElementsByClassName(className)[0];
};

// Add a button to the UI for every icon set
const buttonContainer = getElement('js-buttons');
iconManifest.forEach((set) => {
  const button = document.createElement('button');
  button.classList.add('button');
  button.innerText = set.name;
  button.onclick = () => {
    // Read the configuration options
    const outlineCheckbox = document.getElementsByName('outline-strokes')[0];
    const shouldOutlineStrokes = (outlineCheckbox as HTMLInputElement).checked;
    // Display the loading indicator
    getElement('js-loading-container').classList.add('-visible');
    // Send a message to the "back end" (after a delay to allow the loading screen to appear)
    setTimeout(() => {
      postMessage({
        type: 'import-icons',
        id: set.id,
        name: set.name,
        shouldOutlineStrokes,
      });
    }, 500);
  };
  buttonContainer.appendChild(button);
});

// Implement the click handler for any toggle buttons
Array.from(document.getElementsByTagName('button')).forEach((button) => {
  const toggleId = button.dataset.toggle;
  if (!toggleId) return;

  button.addEventListener('click', () => {
    document.getElementById(toggleId)?.classList.toggle('-hidden');
  });
});

// Change the height of the UI to fit the buttons
const container = getElement('js-container');
postMessage({ type: 'change-height', height: container.clientHeight });

// Listen for messages coming from the "back end"
onmessage = (e) => {
  const { type } = e.data.pluginMessage;
  switch (type) {
    case 'done':
      // If the icons are finished importing, hide the loading indicator
      getElement('js-loading-container').classList.remove('-visible');
      break;
    default:
      break;
  }
};
