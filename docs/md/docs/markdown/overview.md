# Markdown Features

**CODEDOC** parses markdown documents using [`@connectv/marked`](https://github.com/CONNECT-platform/marked) package,
which is in turn based on [`marked`](https://marked.js.org/#/README.md#README.md). This means it supports following
markdown flavours:

- [CommonMark](http://spec.commonmark.org/0.29/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)

Plus the [quoted components syntax](https://github.com/CONNECT-platform/marked#custom-quoted-components)
of `@connectv/marked`. This syntax allows for custom structural components (like buttons, tabs, etc.) to be
used inside your markdown files, thereby greatly extending functionality of standard markdown.

---

## Component Syntax

The quoted component syntax allows for using custom structural components using markdown's own
`block-quote` element:

```md
Some other _markdown_ stuff

/*!*/> :Component1 attr1=value1, attr2=value2, ...                     <!--> Component definition -->
/*!*/>                                                                 <!--> This new line is important, because markdown -->
/*!*/> Contents of the component, which is simply **more markdown**.   <!--> More markdown to be included as contents of the component. -->
```

The first line of the block-quote must be the component reference, starting with `:<component-name>`. Arguments can be
passed to the component via the attributes on the same line, with the syntax `attribute=value` separated by `,`.
Some components can also have child content, which can be any markdown content. This content **MUST** be separated
from the first line by an empty line, as otherwise it might get interpreted as continuation of the component definition
line (i.e. the first line).

Since components can have markdown content, this means you can use child components within a parent component as well:

```md
> :ParentComponent attr=value
>
> Some content.
/*!*/> > :ChildComponent child attr=child value, child attr 2=child value 2
/*!*/> >
/*!*/> > Child component's content
>
/*!*/> > :SecondChildComponent
```

---

## Default Components

### Tabs

```md
> :Tabs
> > :Tab title=First Tab
> >
> > Content of the first tab
>
> > :Tab title=Second Tab
> >
> > Content of the second tab
```

> :Tabs
> > :Tab title=First Tab
> >
> > Content of the first tab
>
> > :Tab title=Second Tab
> >
> > Content of the second tab

<br>

> :Buttons
> > :Button label=Learn More, url=/docs/markdown/tabs

<br>

### Buttons

```md
> :Buttons
> > :Button icon=true, label=android, url=https://www.google.com
>
> > :Button label=Twitter, url=https://www.twitter.com
```
> :Buttons
> > :Button icon=true, label=android, url=https://www.google.com
>
> > :Button label=Twitter, url=https://www.twitter.com

<br>

> :Buttons
> > :Button label=Learn More, url=/docs/markdown/buttons

<br>

### Collapse

```md
> :Collapse label=Collapsible, default=open
>
> Some collapsible content
```

> :Collapse label=Collapsible, default=open
>
> Some collapsible content

<br>

> :Buttons
> > :Button label=Learn More, url=/docs/markdown/collapse

<br>

### ToC Navigation

```md
> :ToCPrevNext
```

> :ToCPrevNext

> :Buttons
> > :Button label=Learn More, url=/docs/markdown/toc-nav

<br>

### Dark/Light Content

```md
> :DarkLight
> > :InDark
> >
> > Only visible in dark. Change to light mode to see other stuff.
> > ![Night Image](https://9to5mac.com/wp-content/uploads/sites/6/2018/06/mojave-night.jpg?quality=82&strip=all&w=600)
>
> > :InLight
> >
> > Only visible in light. Change to dark mode to see other stuff.
> > ![Day Image](https://cdn.osxdaily.com/wp-content/uploads/2018/06/macos-mojave-day-wallpaper-r-610x343.jpg)
```

> :DarkLight
> > :InDark
> >
> > Only visible in dark. Change to light mode to see other stuff.
> > ![Night Image](https://9to5mac.com/wp-content/uploads/sites/6/2018/06/mojave-night.jpg?quality=82&strip=all&w=610)
>
> > :InLight
> >
> > Only visible in light. Change to dark mode to see other stuff.
> > ![Day Image](https://cdn.osxdaily.com/wp-content/uploads/2018/06/macos-mojave-day-wallpaper-r-610x343.jpg)

<br>


### Watermark

```md
> :Watermark
```

> :Watermark

---

## Custom Components

With some knowledge of [Typescript](https://www.typescriptlang.org) and 
TSX/JSX, you can create your own custom components
that you can use in your doc markdowns. Codedoc simply uses [CONNECTIVE SDH](https://github.com/CONNECT-platform/connective-sdh)
for its components system (including in-markdown components), which allows you to create even dynamic and fully
interactive components in your markdowns (as every element you see in these docs is also a SDH component).

> :Buttons
> > :Button label=Learn More, url=/docs/markdown/custom-components

> :ToCPrevNext