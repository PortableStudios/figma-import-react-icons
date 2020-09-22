# TODO

## Improve performance

The plugin currently takes ~8 seconds to load in Figma, which is not ideal.
This is due to the combined size of all the icon sets being included,
which add up to ~15.5mb at the time of writing. It's safe to assume
the long loading time is caused by the need for the browser to parse
and execute this large amount of JavaScript.

I've attempted two methods of improving this, with mixed results:

- Dynamic imports: I attempted to use [ES2020 dynamic imports](https://dev.to/nialljoemaher/dynamic-importing-code-splitting-es2020-3dm3) to allow
  the icon sets to be split in to chunks and loaded dynamically by the main bundle, however during
  testing the promise always threw the following error: `ChunkLoadError: Loading chunk # failed`.
  I'm assuming Figma plugins don't support dynamic imports, possibly due to security restrictions,
  but I have a support ticket open with the Figma team to confirm whether this is true or not.

- Code generation: Inspired by [code from the the react-icons website](https://github.com/react-icons/react-icons/blob/master/packages/preview/src/utils/getIcons.ts)
  I attempted to use [babel-plugin-codegen](https://github.com/kentcdodds/babel-plugin-codegen) to convert the icons
  from React components to SVG strings at compile time rather than runtime. My assumption was
  that this would result in 1) a smaller bundle and 2) faster parsing code since the
  browser would only have to parse string literals rather than React functional components.
  While it actually resulted in a slightly larger bundle¹, the plugin did become
  roughly x2 faster to load. However I decided the amount of confusion and added
  maintenance caused by using inline code generation was not worth the speed-up.
  I still have the code if we want to return to this solution and test it further.

¹ I attempted to use `svgo` to solve this problem but was thwarted by the fact that `svgo`
optimisation is asynchronous and `babel-plugin-codegen` doesn't support asynchronous code.

If possible, a solution that allowed us to dynamically fetch the icons at runtime might
be ideal as it would allow us to pull from any of the available `react-icons` versions.

## Make it configurable

Currently the layout options (padding, spacing, icon size, etc.) are hard-coded,
it might be nice if the designer could change these before importing an icon set.

If we can find a way to dynamically import `react-icons` at runtime it
would also be nice for the designer to be able to choose the version
of `react-icons` they want to import an icon set from, ensuring that
the icons are the same as the ones available to the developer in code.

## Publish it!

Let's make it available to people!

We need to decide whether the plugin should be private or public, and
whether it should be published by an individual or the Portable team.
