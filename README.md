# figma-import-react-icons

A plugin that allows you to import any icon set from [react-icons](https://react-icons.github.io/react-icons/) in to your
Figma file, creating a component with an appropriate name for each icon.

## Development

### 1. Install the plugin locally

1. Clone the repository

2. Open the Figma desktop app

3. Visit `Plugins > Development > New Plugin...`

4. Choose the `Click to choose a manifest.json file` option

5. Find and open the `manifest.json` file in the repository

### 2. Build the plugin (in watch mode)

Install the dependencies and start the build in watch mode:

```bash
yarn install
yarn build:watch
```

This will build the plugin and then re-build it whenever a file is modified.

You can now test the plugin by visiting `Plugins > Development > Import React-Icons`.

Note: Figma has no "hot reload" for plugins, when you make a change to a file
you must wait for compilation to finish and then close and re-open the plugin.

## Publishing a new version

Coming soon!

## TODO

View [TODO.md](./TODO.md)
