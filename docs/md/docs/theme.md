# Theme

The color theme of your **CODEDOC** project is specified in `.codedoc/theme.ts`:

```tsx | .codedoc/theme.ts
import { createTheme } from '@codedoc/core/transport';


export const theme = /*#__PURE__*/createTheme({
  light: {                       // --> color scheme for contenttecoxt in light-mode
    primary: '#1eb2a6'           // --> the primary color in light-mode (for links, buttons, etc.)
  },
  dark: {                        // --> color scheme for content in dark-mode
    primary: '#1eb2a6'           // --> the primary color in dark-mode (for links, buttons, etc.)
  }
});
```

The object passed to `createTheme()` method must be a `ThemeExtension` object:

```ts
export interface ThemeExtension {
  light?: Partial<ContentTheme>;          // --> color scheme of content in light-mode
  dark?: Partial<ContentTheme>;           // --> color scheme of content in dark-mode
  code?: {                                // @see #code-colors
    wmbar?: boolean;                      // --> whether to display the top-bar of a code snippet
    light?: Partial<CodeTheme>;           // --> color scheme of code in light-mode
    dark?: Partial<CodeTheme>;            // --> color scheme of code in dark-mode
  },
  quote?: {                               // @see #quote-colors
    light?: Partial<QuoteTheme>,          // --> color scheme of quote blocks in light mode
    dark?: Partial<QuoteTheme>,           // --> color scheme of quote blocks in dark mode
  },
  toc?: {                                 // @see #table-of-contents-colors
    light?: Partial<ToCTheme>,            // --> color scheme of toc in light mode
    dark?: Partial<ToCTheme>,             // --> color scheme of toc in dark mode
  }
}
```

---

## Content Colors

Color scheme of the content, i.e. texts, page background, buttons, etc. is determined via `ContentTheme` objects:

```ts
export interface ContentTheme {
  background: string;           // --> CSS color string, background of the page
  text: string;                 // --> CSS color string, color of text
  primary: string;              // --> CSS color string, primary color (for buttons, links, etc)
  primaryContrast: string;      // --> CSS color string, text color on primary background (e.g. buttons)
  border: string;               // --> CSS color string, border colors
  code: string                  // --> CSS color string, in-text code color
}
```

You can specify any of these properties for either dark mode or light mode. Each specified property
should be a valid CSS color string.

```tsx | .codedoc/theme.ts
export const theme = /*#__PURE__*/createTheme({
  light: {
    primary: 'red',
    background: 'rgb(240, 240, 240)',
    text: '#616161',
  },
  dark: {
    primary: '#1eb2a6'
  }
});
```

The `primaryContrast` property is an exception from said rule, as it can also have the special value `"deduce"`
(which is in-fact its default value). `primaryContrast` will be used for text that is rendered on elements
whose background is of the `primary` color. If its value is `"deduce"`, then it will be either `white` or `black`
depending on the luminosity of `primary` color itself.

---

## Code Colors

Color scheme of code snippets can be specified via the `code` property of a `ThemeExtension` object:

```tsx | .codedoc/theme.ts
import { 
  createTheme, 
/*!*/  DefaultCodeThemeLight,
} from '@codedoc/core/transport';


export const theme = /*#__PURE__*/createTheme({
  light: {
    primary: '#1eb2a6',
  },
  dark: {
    primary: '#1eb2a6'
  },
/*!*/  code: {
/*!*/    wmbar: false,                          // --> disable the top-bar by default
/*!*/    light: DefaultCodeThemeLight,          // --> use the default light code theme in light-mode
/*!*/  },
});
```

The `wmbar` property specifies whether the top-bar of code-snippets should be displayed (the little bar
with 3 dots and sometimes a filename). This bar is never displayed on code snippets that are only one line,
and is always displayed on code snippets that have a file name. The `wmbar` property determines
the default behavior for other cases, though that can also be overriden for each specific snippet.

The `light` and `dark` properties must be `CodeTheme` objects. This object determines the colors of
various syntax elements within code snippets. **CODEDOC** itself comes with two code theme presets,
`DefaultCodeTheme` and `DefaultCodeThemeLight` (the latter is not used by default). Provided values
for these two properties must be partials of `CodeTheme` interface:

```ts
export interface CodeTheme {
  background: string;                // --> CSS color string, background of the snippet
  text: string;                      // --> CSS color string, default text color
  shadow: string;                    // --> CSS box-shadow string, shadow around a snippet

  lineHover: string;                 // --> CSS color string, background of a hovered line
  lineHightlight: string;            // --> CSS color string, background of a highlighted line
  lineHighlightText: string;         // --> CSS color string, default text color of a highlighted line
  lineCounter: string;               // --> CSS color string, color of line counters
  lineCounterBorder: string;         // --> CSS color string, color of the line counter border
  lineCounterBorderHover: string;    // --> CSS color string, color of the line counter border in a hovered line
  lineCounterHighlight: string;      // --> CSS color string, color of line counter in a highlighted line

  keyword: string;                   // --> CSS color string, color of keywords, e.g. `import`, `return`, etc.
  boolean: string;                   // --> CSS color string, color of boolean values
  number: string;                    // --> CSS color string, color of numeric values
  string: string;                    // --> CSS color string, color of string literals
  function: string;                  // --> CSS color string, color of function tokens
  parameter: string;                 // --> CSS color string, color of function parameters
  tag: string;                       // --> CSS color string, color of HTML, JSX and TSX tags
  comment: string;                   // --> CSS color string, color of comments
  operator: string;                  // --> CSS color string, color of operators
  punctuation: string;               // --> CSS color string, color of punctuation tokens
  builtin: string;                   // --> CSS color string, color of builtin values
  className: string;                 // --> CSS color string, color of tag class names (HTML/JSX/TSX)
  attrName: string;                  // --> CSS color string, color of tag attribute names (HTML/JSX/TSX)
  attrValue: string;                 // --> CSS color string, color of tag attribute values (HTML/JSX/TSX)
  plainText: string;                 // --> CSS color string, color of plain text in HTML/JSX/TSX tags
  script: string;                    // --> CSS color string, color of script tokens
}
```

---

## Quote Colors

The `quote` property of a `ThemeExtension` object specifies color scheme for block quotes, via its `light` property
for light-mode and via its `dark` property for dark mode. If provided, any of these two properties must be
a partial of `QuoteTheme` interface:

```ts
export interface QuoteTheme {
  background: string;             // --> CSS color string, background of block-quotes
  text: string;                   // --> CSS color string, text color of block-quotes
  border: string;                 // --> CSS color string, border color for block-quotes
}
```

---

## Table of Contents Colors

The `toc` property of a `ThemeExtension` object specifies color scheme for the table of contents, via its `light`
and `dark` properties respectively for light mode and dark mode. If provided, any of these two properties must
be a partial of `ToCTheme`:

```ts
export interface ToCTheme {
  background: string;             // --> CSS color string, background of ToC
  border: string;                 // --> CSS color string, border of ToC
}
```

> :ToCPrevNext