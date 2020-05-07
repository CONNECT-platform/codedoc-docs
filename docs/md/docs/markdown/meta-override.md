# Page-Specific Meta

The `MetaOverride` component allows you to override some of the meta information
of a specific page (as opposed to the whole project):

```md
> :MetaOverride target=description
>
> Some specific description for this particular page.

> :MetaOverride target=keywords, behavior=extend
>
> additional, keywords, for this page
```

---

## Overridable Meta Tags

You can specify which meta tag you want to override via `target`
attribute. The following values are supported for this attribute:

- `subject`: the subject of the content of the page.

- `description`: the description of the content of the page.

- `keywords`: the keywords attributed to content of the page, specifically useful for SEO optimization.
  content must be a comma separated list of keywords.

---

## Extending Global Meta

In some cases you might want to extend the global meta set for your doc pages
via some other configuration (e.g. `.codedoc/config.ts`). For example, you might
want to have your global keywords set on each page and then defined some page-specific
keywords for a specific page.

For such cases, you can use the `behavior` attribute:

```md
> :MetaOverride target=keywords, behavior=extend
>
> additional, keywords, for this page
```

The behavior attribute's value can be either `replace` (default) or `extend`. In case of
`replace`, if there is an existing meta tag with the same target (i.e. `name` attribute), then its
content will be replaced by what you have provided. In case of `extend`, the content will be extended:

- For `subject` and `description` targets, the override content will be concatenated to the original content
  separated by a space.
- For `keywords`, the array of new keywords will be concatenated with the array of original keywords, then all
  of them will be joined with `,`.

> :ToCPrevNext