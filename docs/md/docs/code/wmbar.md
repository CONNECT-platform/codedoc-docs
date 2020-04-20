# Code Top Bar

Code snippets can have a top-bar which resembles a generic window manager top-bar and
can host file names. This is to enhance the familiarity of code-snippets, increasing their
learnability and encouraging readers to try them more actively. Additionally, the filename
and extension can help readers quickly identify the language of the snippet and where
it would appear in their own project.

By default, any code snippet with more than one line of code will have this bar. You can 
set the name of the file like this:

````
/*!*/```sql | DB/migrations/some-migration.sql
create table dbo.PersonData
    (
      id                         int identity(1, 1) ,
      Name                       nvarchar(200) not null ,
      Email                      nvarchar(200) null ,
      Phone                      nvarchar(100) null ,
      Street                     nvarchar(200) null ,
      City                       nvarchar(200) null ,
      StateProvince              nvarchar(50) null ,
      PostalCode                 nvarchar(50) null ,
      constraint PK_PersonDataID primary key ( id )
    );
```
````

```sql | DB/migrations/some-migration.sql
create table dbo.PersonData
    (
      id                         int identity(1, 1) ,
      Name                       nvarchar(200) not null ,
      Email                      nvarchar(200) null ,
      Phone                      nvarchar(100) null ,
      Street                     nvarchar(200) null ,
      City                       nvarchar(200) null ,
      StateProvince              nvarchar(50) null ,
      PostalCode                 nvarchar(50) null ,
      constraint PK_PersonDataID primary key ( id )
    );
```

---

## Disabling the Top Bar

You can disable the top-bar via `.codedoc/theme.ts`:


```tsx | .codedoc/theme.ts
import { createTheme } from '@codedoc/core/transport';


export const theme = /*#__PURE__*/createTheme({
  // ...
/*!*/  code: {
/*!*/    wmbar: false,                          // --> disable the top-bar by default
/*!*/  },
});
```

Note that the top-bar will still appear for any snippet that has a file name.

---

## Disabling/Enabling per Snippet

You can also enable/disable the top-bar on a per-snippet basis. Regardless of the theme settings:
- Any snippet with a filename will have a top-bar
- Any snippet with `--wmbar` flag will have a top-bar (but not necessarily a filename)
- Any snippet with `--no-wmbar` flag will NOT have a top-bar. When both a file name and the `--no-wmbar` flag
  are provided:
   - If the filename comes first, no top-bar is shown
   - If the flag comes first, then the top-bar is shown
- No one-liner snippet will ever have a top-bar (even with the flags and filename)

> :Tabs
> > :Tab title=Markdown
> > ````
> > /*!*/```js | --wmbar
> > // --> lets add a comment so this snippet is two lines
> > console.log('HALO!');
> > ```
> > ````
>
> > :Tab title=How it Looks
> > ```js | --wmbar
> > // --> lets add a comment so this snippet is two lines
> > console.log('HALO!');
> > ```

<br>

> :Tabs
> > :Tab title=Markdown
> > ````
> > /*!*/```js | whatever.js | --no-wmbar 
> > // --> lets add a comment so this snippet is two lines
> > console.log('HALO!');
> > ```
> > ````
>
> > :Tab title=How it Looks
> > ```js | whatever.js | --no-wmbar
> > // --> lets add a comment so this snippet is two lines
> > console.log('HALO!');
> > ```

> :ToCPrevNext