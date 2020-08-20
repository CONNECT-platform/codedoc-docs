# CLI

The CLI is the recommended way of using **CODEDOC**. To install it, you would need
the following first:

- [NodeJS](https://nodejs.org/en/download/) version 10.0 or above
- [NPM](https://www.npmjs.com/get-npm)
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

<br>

### Forking or Using Templates

When forking or using a template project, you get some already set configuration that you
most probably need to modify. For example, typically you need to change the [title configuration](/docs/config/page#page-title)
of your pages or [the GitHub integration configuration](/docs/config/misc#github-integration).
To assist with that process, **CODEDOC** CLI is equipped with the `codedoc check` command, which
will check your **CODEDOC** configuration against environment settings and inform you of possible
configuration changes you need to make:

```bash
git clone <my-forked-project>.git            # --> Clone your own fork
cd my-forked-project                         # --> Lets go inside
codedoc install                              # --> Install all necessary dependencies
/*!*/codedoc check                                # --> Check project configuration
```
> [update](:Icon) **VERSION NOTICE**
>
> The `check` command is only available since `@codedoc/cli@0.2.5`, so if you have a version
> before that, you need to upgrade using `codedoc update` or `npm i -g @codedoc/cli@latest`.

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

<br>

### Using Docker

Projects initialized using `codedoc init` also include a `Dockerfile` and a `docker-compose.yml` file.
If you want to run the development server inside a container, you can just run this:

```bash
docker-compose up
```

> [warning](:Icon) **WARNING**
>
> If you want to use your own custom docker setup, be careful not to volume
> `.codedoc/node_modules` folder. The host environment and the container environment typically differ
> greatly and should not share modules. It is always a good idea to start from the default docker configuration:
> - [Default `Dockerfile`](https://github.com/CONNECT-platform/codedoc-boilerplate/blob/master/Dockerfile)
> - [Default `docker-compose.yml`](https://github.com/CONNECT-platform/codedoc-boilerplate/blob/master/docker-compose.yml)

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

### Major Updates

`update` command will not upgrade the CLI or local installation to the latest if there is a _major update_
between your installed version and the latest version. This is because _major updates_ might include
breaking changes (by definition).

If you are sure that there are no breaking changes in the update that would affect you, you could
update to latest version using `update latest` command:

```bash
codedoc update latest     # --> Forcefully update everything to latest version
```

> [update](:Icon) **VERSION NOTICE**
>
> The `update latest` command is only available since `@codedoc/cli@0.2.0`, so if you have a version
> before that, you need to upgrade using `npm i -g @codedoc/cli@latest`.

<br>

### Update Permissions

By default, `update` and `update latest` commands will attempt to update both the CLI and the local installation
(if run in a **CODEDOC** project folder). In some shell environments, you might not have permissions to update
the CLI, while you do have permissions to update the local installation. In such situations, you can use
the `--local` flag to only update your local installation:

```bash
codedoc update --local           # --> Only update local installation, to latest compatible version
codedoc update latest --local    # --> Only update local installation, to latest version
```

> [update](:Icon) **VERSION NOTICE**
>
> The `--local` flag is only available since `@codedoc/cli@0.2.1`, so if you have a version
> before that, you need to upgrade using `codedoc update` or `npm i -g @codedoc/cli@latest`.

---

## Plugins

With `codedoc install` (or `codedoc install plugin`), you can also install plugins. A plugin
can be any NPM package that lives inside `.codedoc` folder and is either used by `.codedo`, your
own custom components, etc.

```bash
codedoc install @codedoc/coding-blog-plugin   # --> installs coding.blog plugin
```

<br>

Use `codedoc update plugins` for keeping plugins up to date:

```bash
codedoc update plugins                        # --> soft updates all plugins
```

Or use `codedoc update plugin` for updating a particular plugin (and no need to worry about
grammatically correct version of the command, the CLI is pretty forgiving):

```bash
codedoc update plugin @codedoc/coding-blog-plugin
```

<br>

If `codedoc update plugins` does not update a plugin properly, it is perhaps because
there is a major difference version. In such a case, you can manually update the plugin
using `codedoc install`:

```bash
codedoc install my-plugin
# -- OR, for really enfocring major updates --
codedoc install my-plugin@latest
```

<br>

> [warning](:Icon) **BE CAREFUL!**
>
> Major updates of packages might have breaking changes with them, so it is always
> a good idea to see if the update will break any of your code.


<br>

> [update](:Icon) **VERSION NOTICE**
>
> Plugin management is only available since `@codedoc/cli@0.2.2`, so if you have a version
> before that, you need to upgrade using `codedoc update` or `npm i -g @codedoc/cli@latest`.

> :ToCPrevNext
