# Terminal Snippets

Terminal snippets are like typical code snippets with two main differences:

- There is a prefix string at the beginning of each line,
- There can be multiple _output_ segments within the snippet.

````md
```bash
echo Hellow World! # --> this is typical code, shown with a prefix
> Hellow World!    # --> this is the output segment
```
````
```bash
echo Hellow World!
> Hellow World!
```

---

## Languages

By default, all `bash` code snippets are considered terminal snippets. You can enforce that on other
languages using `--term` flag:

````md
```js | --term
console.log('Hellow World!');
> Hellow World!
```
````
```js | --term
console.log('Hellow World!');
> Hellow World!
```

<br>

> Additionally, you can add `--no-term` flag to `bash` code snippets so that they are
> displayed like regular code snippets.

---

## Custom Prefix

You can specify the terminal prefix by passing it to `--term` flag:

````md
```bash | --term eugenes-laptop codedoc>
pwd
> /Users/eugene/projects/codedoc

cd ..
pwd
> /Users/eugene/projects
```
````
```bash | --term eugenes-laptop codedoc>
pwd
> /Users/eugene/projects/codedoc

cd ..
pwd
> /Users/eugene/projects
```

---

## Colored Outputs

You can style the outputs using [chalk's template literal syntax](https://github.com/chalk/chalk#tagged-template-literal):

````md
```bash
codedoc s
> {greenBright #} Serving ...
> {greenBright #} Fetching project configuration ...
> ts-node-dev ver. 1.0.0-pre.63 (using ts-node ver. 8.10.2, typescript ver. 3.9.7)
>
> {greenBright #} Serving docs on {cyan http://localhost:3000}
> {gray # building ........ docs/md/404.md}
> {green # built:: ......... dist/404.html}
> ...
````
```bash
codedoc s
> {greenBright #} Serving ...
> {greenBright #} Fetching project configuration ...
> ts-node-dev ver. 1.0.0-pre.63 (using ts-node ver. 8.10.2, typescript ver. 3.9.7)
>
> {greenBright #} Serving docs on {cyan http://localhost:3000}
> {gray # building ........ docs/md/404.md}
> {green # built:: ......... dist/404.html}
> ...
```

> :ToCPrevNext