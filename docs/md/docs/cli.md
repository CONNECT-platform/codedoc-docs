# CLI

The CLI is the recommended way of using **CODEDOC**. To install it, you would need
the following first:

- [NodeJS](https://nodejs.org/en/download/)
- [NPM](https://www.npmjs.com/get-npm) version 10.0 or above
- [git](https://git-scm.com/downloads)

After installing the above, you can easily install codedoc CLI via NPM:

```bash
npm i -g @codedoc/cli
```

---

## Setting Up a Project

```bash
cd <my-project>
codedoc init              # --> you could also use `codedoc i`
```

The `init` command will create the `.codedoc/` folder in your project
and populate it with some initial setup, and also add some boiler-plate
markdown files in `docs/` folder for you to get started.

Codedoc will try to automatically guess a good title for your documentations,
based on your project's repo and its folder name. To congiure your project
according to your preferences, simply modify contents of `.codedoc/config.ts`:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';

import { theme } from './theme';


export const config = /*#__PURE__*/configuration({
  theme,
  page: {
    title: {
/*!*/      base: 'My Project'     // --> the title of your docs
    },
  },
});
```

If your project folder is version controlled by `git` with the remote
set to a GitHub repository, it will automatically configure GitHub integrations
for you as well.

<br>

### Cloning Existing Projects

When you clone an existing project that is already setup (i.e. has a `.codedoc` folder in
its repo), you still need to install local dependencies (in `.codedoc/node_modules`) to
be able to build/serve the files locally.

For this purpose, you can use `codedoc install` command:

```bash
git clone <my-awsome-project>.git            # --> so my-awseome-project is an already setup
cd my-awesome-project                        # --> lets go inside
codedoc install                              # --> and install local dependencies.
```

---

## Development

**CODEDOC** comes with a nice development server that constantly watches, rebuilds and
serves your docs on your local machine:

```bash
codedoc serve             # --> Or alternatively, `codedoc s` or `codedoc w`.
```

The development server by default serves your docs on local port `3000`,
though you can change that in `.codedoc/config.ts`:

``` ts | .codedoc/config.ts
// ...

export const config = /*#__PURE__*/configuration({
  // ...
/*!*/  dev: {
/*!*/    port: 3002            // --> now the dev server serves on port 3002.
/*!*/  },
  // ...
});
```

Additionally, if your project is a GitHub repo, for example named `my-repo`,
then by default the dev server will serve the docs on `localhost:3000/my-repo/`
(and not `localhost:3000`). This is to mimic the behaviour of GitHub Pages in
case a custom domain is not used, and can be configured via `.codedoc/config.ts` as well:

```ts | .codedoc/config.ts
// ...

export const config = /*#__PURE__*/configuration({
  // ...
/*!*/  dest: {
/*!*/    // ...
/*!*/    namespace: '/x'            // --> now the dev server serves on `localhost:3000/x`.
/*!*/  },
  // ...
});
```

<br>

> [touch_app](:Icon) **PROJECT NAMESPACE**
>
> Project namespace is basically for situations where your docs are not going
> be served at the root URL of your domain. For example, when you are publishing
> to GitHub Pages without using a custom domain, the URL your docs will be served
> on:
> ```bash
> https://<user-name>.github.io/<repo-name>
> ```
> Then:
> - `https://<user-name>.github.io` is the root URL of the domain,
> - `/<repo-name>` is your namespace.
> 
> > :Buttons
> > > :Button url=/docs/config/output#project-namespace, label=Learn More

---

## Publishing

If you want to publish your docs, you need to build them for production:

```bash
codedoc build             # --> Or simply `codedoc b`.
```

<br>

> [warning](:Icon) **WARNING**
>
> Running `codedoc serve` would overwrite your built files, so make sure to always
> run `codedoc build` before publishing your docs.

---

## Updates

You can check whether the CLI or the local installation of codedoc require any
updates via the `version` command:

```bash
codedoc version           # --> Or simply `codedoc v`.
```

In case you need to update the CLI or the local installation, simply use the `update` command:

```bash
codedoc update            # --> Or simply `codedoc u`.
```

<br>

The `update` command simply invokes NPM's own `update` command, so by default it will
not violate [semver's version matching rules](https://docs.npmjs.com/misc/semver).
This might mean that sometimes `codedoc update` won't update your CLI / CODEDOC installation.
You can enforce an update to latest version by using `update latest` command:

```bash
codedoc update latest     # --> Forcefully update everything to latest version
```

>
> **`$ codedoc version`** \
> `# Fetching version info ...` \
> `# @codedoc/cli version 0.2.3 ...................................... latest: 0.4.0` 
>
> **`$ codedoc update`** \
> `# nothing happens`
>
> **`$ codedoc update latest`**\
> `# updating ...`

The `update latest` command is only available since `@codedoc/cli@0.2.0`, so if you have a version
before that, you need to upgrade using `npm i -g @codedoc/cli@latest`.

> [warning](:Icon) **CAUTION**
>
> Updates that violate semver's version matching rules might actually not be backwards compatible.
> This typically happens due to a major update. So **ONLY USE** `codedoc update latest` when you know
> that the update is backwards-compatible and/or its breaking changes wouldn't affect your project.


> :ToCPrevNext