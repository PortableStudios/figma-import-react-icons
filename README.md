# figma-import-react-icons

A plugin that allows you to import any icon set from [react-icons](https://react-icons.github.io/react-icons/) in to your
Figma file, creating a component with an appropriate name for each icon.

https://www.figma.com/community/plugin/921172243620367846/Import-React-Icons

## Development

### 1. Install the plugin locally

1. Clone the repository

2. Open the Figma desktop app

3. Visit `Plugins > Development > Import plugin from manifest...`

4. Find and open the `manifest.json` file in the repository

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

To publish an update to the plugin you will need to login as the "Portable Account" account (check LastPass) and then:

1. Build the new version of the plugin and test it

2. Open the Figma desktop app

3. Visit `Plugins > Manage Plugins...`

4. Under `In development` press the options button next to `Import React-Icons` and select `Publish New Release...`

5. (Optional) Add some information to the `"Version notes"` field

6. Hit `"Publish"`

## TODO

View [TODO.md](./TODO.md)
