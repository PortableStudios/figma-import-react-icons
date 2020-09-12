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
    // Display the loading indicator
    getElement('js-loading-container').classList.add('-visible');
    // Send a message to the "back end" (after a delay to allow the loading screen to appear)
    setTimeout(() => {
      postMessage({ type: 'import-icons', id: set.id, name: set.name });
    }, 500);
  };
  buttonContainer.appendChild(button);
});

// Change the height of the UI to fit the buttons
const container = getElement('js-container');
postMessage({ type: 'change-height', height: container.clientHeight });
