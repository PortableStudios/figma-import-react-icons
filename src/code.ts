import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import iconComponents from './iconComponents';

// Display the plugin UI
const maxHeight = 420;
const defaultWidth = 420;
figma.showUI(__html__, { width: defaultWidth, height: 0 });

// Handle messages from the UI
figma.ui.onmessage = async (msg) => {
  switch (msg.type) {
    // Change the window height
    case 'change-height': {
      const { height } = msg;
      figma.ui.resize(defaultWidth, Math.min(height, maxHeight));
      break;
    }
    // Import an icon set in to the current Figma page
    case 'import-icons': {
      const { id, name } = msg;
      const icons = iconComponents[id as keyof typeof iconComponents];
      const iconKeys = Object.keys(icons);

      // Layout constants
      const iconSize = 24;
      const iconSpacing = 24;
      const iconsPerRow = 20;
      const framePadding = 32;

      // Create a frame for the icons
      const frame = figma.createFrame();
      frame.name = name;
      frame.layoutMode = 'VERTICAL';
      frame.counterAxisSizingMode = 'AUTO';
      frame.horizontalPadding = framePadding;
      frame.verticalPadding = framePadding;
      frame.itemSpacing = iconSpacing;

      // Calculate how many rows we need, create them and add them to the frame
      const rows: FrameNode[] = [];
      const numRows = Math.ceil(iconKeys.length / iconsPerRow);
      for (let i = 1; i <= numRows; i += 1) {
        const row = figma.createFrame();
        row.name = `Row ${i}`;
        row.layoutMode = 'HORIZONTAL';
        row.counterAxisSizingMode = 'AUTO';
        row.itemSpacing = iconSpacing;
        frame.appendChild(row);
        rows.push(row);
      }

      // Iterate over the icons, importing them in to Figma
      iconKeys.forEach((iconName, i) => {
        // Render the React component to an SVG string
        const iconComponent = icons[iconName as keyof typeof icons];
        const svgString = renderToStaticMarkup(createElement(iconComponent));
        // Create a node from the SVG string, resize it
        const svgNode = figma.createNodeFromSvg(svgString);
        svgNode.resize(iconSize, iconSize);
        // Create a component, size it and name it
        const componentNode = figma.createComponent();
        componentNode.resize(iconSize, iconSize);
        componentNode.name = `react-icons/${id}/${iconName}`;
        // Move the vectors from the frame node to the component node
        svgNode.children.forEach((c) => componentNode.appendChild(c));
        svgNode.remove();
        // Add the component node to the correct row
        const rowIndex = Math.floor(i / iconsPerRow);
        rows[rowIndex].appendChild(componentNode);
      });

      // Add the frame to the page, select it and scroll to it
      figma.currentPage.appendChild(frame);
      figma.currentPage.selection = [frame];
      figma.viewport.scrollAndZoomIntoView([frame]);
      figma.closePlugin();
      break;
    }
    default:
      break;
  }
};
