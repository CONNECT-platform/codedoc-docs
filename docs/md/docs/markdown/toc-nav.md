# ToC Navigation

The `ToCPrevNext` component scans through the ToC, matches the URL of current page
and extrapolates the previous and next pages, showing beautiful buttons for navigating to them:

```md
> :ToCPrevNext
```

> :ToCPrevNext

<br><br>

## Custom Labels

You can customize the labels of the buttons via `prev-label` and `next-label` attributes:

```md
> :ToCPrevNext prev-label=...Previously, next-label=Up Next...
```

> :ToCPrevNext prev-label=...Previously, next-label=Up Next...

<br><br>

## Custom Icons

You can customize the icons of the buttons via `prev-icon` and `next-icon` attributes:

```md
> :ToCPrevNext prev-label=...Previously, prev-icon=arrow_back, next-label=Up Next..., next-icon=arrow_forward
```

> :ToCPrevNext prev-label=...Previously, prev-icon=arrow_back, next-label=Up Next..., next-icon=arrow_forward

The icons are read from the configured icon-font, which is by default
[Material Icons](https://material.io/resources/icons/?style=baseline). You can override
this in `.codedoc/config.ts` as well.

> :Buttons
> > :Button label=Learn More about Custom Icon Font, url=/docs/config/page#icon-font


<br><br>

> :ToCPrevNext