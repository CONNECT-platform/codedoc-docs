# Output Files

You can configure the output of **CODEDOC** via `.codedoc/config.ts` like this:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';
// ...

export const config = /*#__PURE__*/configuration({
  //...
  dest: {
    html: '.',                           // --> the base folder for HTML files
    assets: '.',                         // --> the base folder for assets
    bundle: 'docs/assets',               // --> where to store codedoc's bundle (relative to `assets`)
    styles: 'docs/assets',               // --> where to store codedoc's styles (relative to `assets`)
    namespace: '',                       // --> project namespace
  },
  //...
});
```

You can provide any of these properties. Not provided properties will fallback to values
outlined above:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';
// ...

export const config = /*#__PURE__*/configuration({
  //...
  dest: {
/*!*/    html: 'dist/html',
/*!*/    bundle: 'docs/codedoc',
/*!*/    styles: 'docs/codedoc',
  },
  //...
});
```

---

## HTML Files

The `html` field determines where the HTML files will be output. If you have the following files:

```bash
docs/md/index.md
docs/md/whatever/stuff.md
```

with this configuration:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';
// ...

export const config = /*#__PURE__*/configuration({
  //...
  dest: {
    html: 'dist/html',
  },
  //...
});
```

Then **CODEDOC** will create the following HTML files:

```bash
dist/html/index.html
dist/html/whatever/stuff.html
```

<br>

> <span class="icon-font" style="vertical-align: sub">warning</span> **WARNING**
>
> The default configuration for output files is optimized for publishing to GitHub Pages.
> If you do intend to publish to GitHub Pages, modify them only if you know what you are doing.

---

## Assets

`assets` determines where **CODEDOC** dev server should look for static files, and also where
it will generate its own static files.

I would highly recommend only overriding `bundle` and `styles` properties for controlling where
codedoc assets will be put in. `bundle` property controls where the client-side javascript
required by codedoc will be put (relative to `assets`), and `styles` property controls where
the CSS required by codedoc will be put (relative to `assets`).
Only modify `assets` itself _IF_ you have specific requirements
by your hosting service.

<br>

> :Buttons
> > :Button label=Learn More about Assets, url=/docs/assets-and-images

---

## Project Namespace

It is possible that your project won't be hosted on the root URL of your domain.
For example, your domain might be `https://dude.cute.cloud`, but your docs are served on
`https://dude.cute.cloud/my-project/`. This is for example the case if you are using
GitHub Pages without using a custom domain, where your docs would be served on
`https://<user>.github.io/<repo>`.

The `namespace` property basically abstracts away this concern. It must be set to the
URL prefix of your docs relative to the root URL of your domain, for example
when your docs are served on `https://dude.cute.cloud/my-project/`, then your namespace
must be set to `/my-project`, or in case of GitHub Pages (without a custom domain),
your namespace must be set to `/<repo>` (the CLI will configure this automatically for you
on initialization).

Imagine you have configured your project namespace like this:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';
// ...

export const config = /*#__PURE__*/configuration({
  //...
  dest: {
    namespace: '/my-project',
  },
  //...
});
```

Then the following will happen:

- **CODEDOC** dev server will serve your static files on `/my-project/`, for example
if you have an image named `banner.svg` in the root folder of your project, it will be served
locally on `/my-project/banner.svg`

- `/my-project` will be prepended to all anchors `<a>` whose URL (`href`) starts with `/`

- `/my-project` will be prepended to all scripts `<script>` whose URL (`src`) starts with `/`

- `/my-project` will be prepended to all links `<link>` whose URL (`href`) starts with `/`

- `/my-project` will be prepended to all images `<img>` whose URL (`src`) starts with `/`

This simply means that the namespace will automatically be taken care of without you needing
to modify your links, anchors, image sources, etc. For example, if you start with a GitHub Page
without a custom domain, you simply set the `namespace` property to `/<repo>`, and then when
you get a custom domain for your docs, update the `namespace` to `''` (or remove it from config).

---

## Build Files on Git

For deploying to GitHub Pages, you would need the generated HTML, CSS, and Javascript files
to also be put on your repository. This can be incovenient, since random stubs are used
across these files which means they will be different everytime you change them, which can make it
difficult to track changes to your markdown files.

One solution is to put build files on `gh-pages` branch and setup GitHub Pages to use that branch.
A more complete solution, as proposed by [Lukas Frost](https://github.com/LukasForst), is to put
all build files in a folder that is ignored by git, and then use GitHub Actions to automatically
push the contents of that file to `gh-pages`.

To achieve this, do the following steps:

**STEP 1**: Configure GitHub Pages to `gh-pages`.

**STEP 2**: Configure codedoc to put its build files in `dist` folder, via `.codedoc/config.ts`:

```ts | .codedoc/config.ts
import { configuration } from '@codedoc/core';

// ...


export const config = /*#__PURE__*/configuration({
  // ...
  dest: {
    // ...
    html: 'dist',
    assets: 'dist',
  },
  // ...
});
```

<br>

**STEP 3**: Add `dist` folder to `.gitignore`:

```bash | .gitignore
# ...

dist

# ...
```

If you use GitHub's default gitignore for Node, it includes this config.

**STEP 4**: Add GitHub Actions pipeline to `.github/workflows/deploy-to-gh-pages.yml`:

```yml | .github/workflows/deploy-to-gh-pages.yml
name: Deploy to GitHub Pages
on:
  push:
    branches:
      - master
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Build
        run: |
          # install .codedoc dependencies
          (cd .codedoc && npm install)
          # install codedoc
          npm install @codedoc/cli
          # build repo
          (PATH=$(npm bin):$PATH && codedoc build)
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@releases/v3
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          BRANCH: gh-pages
          FOLDER: dist
```

>:Buttons
> >:CopyButton

<br>

> <span class="icon-font" style="vertical-align: sub">warning</span> **WARNING**
>
> If you are using images and figures in your docs, you should also configure your build
> pipeline to copy them to `dist/` folder before pushing to `gh-pages` branch as well:
>
> ```yml | .github/workflows/deploy-to-gh-pages.yml
> name: 'Deploy to Github Pages'
> on:
>   push:
>     branches:
>       master
> jobs:
>   build-and-deploy:
>   # ...
>   steps:
>     # ...
>
>     - name: Build
>       run: |
>       # install .codedoc dependencies
>       (cd .codedoc && npm install)
>       # install codedoc
>       npm install @codedoc/cli
>       # build repo
>       (PATH=$(npm bin):$PATH && codedoc build)
>/*!*/      # copy assets
>/*!*/      cp repo-banner.svg dist/
>/*!*/      cp repo-banner-dark.svg dist/
>/*!*/      cp favicon.ico dist/
>
>     # ...
> ```


You can also checkout [this repository](https://github.com/LukasForst/blog) by LukasFrost or
[the repo of these docs](https://github.com/CONNECT-platform/codedoc-docs) for examples of how to do this setup.

> :ToCPrevNext