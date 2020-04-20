# Code Highlights

To highlight a line in a code snippet, add `/*!*/` symbol to the beginning
of the line:

````
```go | clojure-example.go
package main

import "fmt"

func intSeq() func() int {
/*!*//*!*/    i := 0
/*!*//*!*/    return func() int {
/*!*//*!*/        i++
/*!*//*!*/        return i
/*!*//*!*/    }
}

func main() {
    nextInt := intSeq()
    fmt.Println(nextInt())
    fmt.Println(nextInt())
    fmt.Println(nextInt())

/*!*//*!*/    newInts := intSeq()
/*!*//*!*/    fmt.Println(newInts())
}
```
````

```go | clojure-example.go
package main

import "fmt"

func intSeq() func() int {
/*!*/    i := 0
/*!*/    return func() int {
/*!*/        i++
/*!*/        return i
/*!*/    }
}

func main() {
    nextInt := intSeq()
    fmt.Println(nextInt())
    fmt.Println(nextInt())
    fmt.Println(nextInt())

/*!*/    newInts := intSeq()
/*!*/    fmt.Println(newInts())
}
```

---

## Spacing and Language Support

The symbol `/*!*/` is pre-processed by codedoc before syntax highlighting and removed from the code,
so it will not cause any issues in languages where `/* ... */` is not a valid comment syntax. This
also means that you should not factor it in for line indentation and spacing:

> :Tabs
> > :Tab title=Markdown
> > ````
> > ```go
> > func a() int {
> > /*!*//*!*/  i := 0             // --> these two lines will have same indentation
> > /*!*/  i++                // --> these two lines will have same indentation
> > }
> > ```
> > ````
>
> > :Tab title=How it Looks
> > ```go
> > func a() int {
> > /*!*/  i := 0             // --> these two lines will have same indentation
> >   i++                // --> these two lines will have same indentation
> > }
> > ```

> :ToCPrevNext
