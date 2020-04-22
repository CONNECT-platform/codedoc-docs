> :DarkLight
> > :InLight
> >
> > ![header](/repo-banner.svg)
>
> > :InDark
> >
> > ![header](/repo-banner-dark.svg)

**CODEDOC** is an open-source tool that helps you with creating beautiful and modern software documentation.
It creates a JAMStack app from your markdown files that you can easily deploy on services such as GitHub Pages.

```bash
npm i -g @codedoc/cli             # --> click on each line to copy it
```

---

# Usage

Assume you have a repo on github named `my-project` and want to write documentations for it
using codedoc. Install the codedoc cli, clone your repo locally, then:

```bash
cd my-project                # --> go to your project folder
codedoc init                 # --> initialize codedoc
codedoc serve                # --> serve the docs
```

Open a browser on the URL the CLI tool tells you (e.g. `localhost:3000/my-project`) and
see the docs boilerplate.

Your markdown files by default are located at `docs/md/`, for example the main page you see
will be from `docs/md/index.md`. The table of contents will also by default be on `docs/md/_toc.md`.
Modify them and see the changes in realtime.

<br>

## Publishing

When you are done with your docs and want to publish them, say to GitHub Pages, simply
run this command in your project folder:

```bash
codedoc build               # --> build the docs for deployment
```

Then add all the built files and push to GitHub:

```bash
git add -A                  # --> add your built files
git commit -m "meine docs"  # --> commit the changes
git push                    # --> push to the cloud
```

Remember to enable [GitHub Pages](https://pages.github.com) on your repo.

---

# Features

This very documentation was created using codedoc, so basically every feature you see here you would
get for your own documentation. Check out [this repository](https://github.com/CONNECT-platform/codedoc-docs)
to see how exactly these documentations were created using codedoc.

<br>

## Enhanced Markdown

> :Tabs
> > :Tab title=the markdown
> >
> > ```md
> > Hi _this_ is my content, and let me have some buttons beneath it:
> >
> > > :Buttons                                                          <!--> this is how you use custom components -->
> > > > :Button icon=true, label=share, url=https://twitter.com         <!--> this `Button` component is a child of the `Buttons` component -->
> > >
> > > > :Button label=Google!, url=https://stackblitz.com               <!--> this other `Button` is also part of the parent `Buttons` component -->
> > ```
>
> > :Tab title=how it looks
> >
> > 
> > Hi _this_ is my content, and let me have some buttons beneath it:
> >
> > > :Buttons
> > > > :Button icon=true, label=share, url=https://twitter.com
> > >
> > > > :Button label=Google!, url=https://stackblitz.com

<br>

> :Buttons
> > :Button label=Learn More, url=/docs/markdown/overview

<br>

## Enhanced Code Snippets

> :Tabs
> > :Tab title=the markdown
> >
> > ````md
> > So I have some code with enhanced features here:
> > ```tsx
> > import { build } from '@codedoc/core';         // --> programmatically import codedoc
> > import { join } from 'path';                   // @see [official docs](https://nodejs.org/api/path.html)
> >
> > function doStuff() {                           // --> this function does stuff.
> >   console.log('Lets see the markdown again');  // @see tab:the markdown
> > }
> > ```
> > > :Buttons
> > > > :CopyButton
> > ````
>
> > :Tab title=how it looks
> >
> > So I have some code with enhanced features here:
> > ```tsx
> > import { build } from '@codedoc/core';         // --> programmatically import codedoc
> > import { join } from 'path';                   // @see [official docs](https://nodejs.org/api/path.html)
> >
> > function doStuff() {                           // --> this function does stuff.
> >   console.log('Lets see the markdown again');  // @see tab:the markdown
> > }
> > ```
> > > :Buttons
> > > > :CopyButton

<br>

> :Buttons
> > :Button label=Learn More, url=/docs/code/overview

<br>

## Customizability

Easily change any aspect of your docs, from theme colors and fonts
to meta data of each page and their layouts. Create your own custom
header or ToC with JSX/TSX-based components, or use custom JSX-TSX-based
components in your markdown.

The component-based structure of codedoc simply means that you can even
re-use your custom components across different projects, or you can
publish them (for example to NPM) so that other people can enjoy them too!

<br>

## Integrated Search

If your project is on GitHub, codedoc by default includes a cross-docs
search functionality using GitHub search API. You can also easily
integrate your own search APIs into the default search components (besides
being able to actually use your own custom search components).

The same search functionality is used on this documentation. You can check it out
by clicking on the <span class="icon-font" style="vertical-align:middle">menu</span> icon in the footer and
opening the search functionality.

<br>

## Integrated Dark Mode

Its 2020, and dark-mode should be considered a universal right! Codedoc
supports dark-mode on all your docs. Device settings is used by default,
while allowing your readers to manually override this.

<br>

## Collaborative

Everything is markdown, so you can easily work on a project's documentation
with your peers using any version control software like Git. No need for
half-baked weird visual interfaces on top!

<br>

## Open-Source

Codedoc is an open-source tool, completely free-to-use, MIT-licensed,
no strings attached. I simply needed this tool to write usable docs for some
open-source projects I was working on.

> :ToCPrevNext