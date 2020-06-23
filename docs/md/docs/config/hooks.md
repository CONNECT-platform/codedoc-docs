# Build Hooks

The `afterBuild` config allows you to add functions (called _hooks_) that will be invoked after the build process is finished:

```ts
import { configuration } from '@codedoc/core';

//...

export const config = /*#__PURE__*/configuration({
  //...
/*!*/  afterBuild: [
/*!*/    function logFinished() {
/*!*/      console.log('Build Finished!!!!');
/*!*/    }
/*!*/  ],
  //...
});
```

<br>

> [touch_app](:Icon) **NOTE**
>
>It is highly recommended to use named functions (and not arrow functions) as _hooks_. **CODEDOC** will log
the name of each _hook_ it is running, so providing a name makes it easy to track and debug _hooks_.

---

## Async Hooks

An after-build hook can also be asynchronous.**CODEDOC** will wait for each _hook_ to finish before it executes
the next _hook_ (or deems the build process complete).

---

## Build Object

Each after-build hook will also be passed a `Build` object, which contains information about the build that just
concluded:

```ts
import { configuration, Build, CodedocConfig } from '@codedoc/core';

//...

export const config = /*#__PURE__*/configuration({
  //...
/*!*/  afterBuild: [
/*!*/    async function hook(build: Build<CodedocConfig>) {
/*!*/      ...
/*!*/    }
/*!*/  ],
  //...
});
```

Any `Build` object has the following properties:

- `config`:\
  The (final) configuration used for the build.

- `partial`:\
  Whether the build was partial or complete. For example, on local development only partial builds
  are conducted (limited to markdown files that have changed).

- `source`:\
  The source (markdown) files that were used. This is an [RxLine `Line` object](https://loreanvictor.github.io/rxline/docs/basics/lines),
  containing unpopulated [RxLine `File`s](https://loreanvictor.github.io/rxline/docs/basics/files#files), each
  containing the following properties:
    - `root`: the root search path the file was obtained from
    - `path`: the path of the file relative to root search path

- `built`:\
  An array of [RxLine `File`s](https://loreanvictor.github.io/rxline/docs/basics/files#files), each containing
  the following properties:
    - `root`: the root path for all generated HTML files
    - `path`: path of the particular file relative to `root`
    - `content`: HTML string content of the file

> :ToCPrevNext