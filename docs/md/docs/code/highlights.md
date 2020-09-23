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

---

## Added/Removed Lines

Similar to `/*!*/` syntax, you can add `/*+*/` or `/*-*/` at the beginning of each
line to indicate that this is an _added_ or _removed_ line:

````
```rust
use std::net::TcpListener;
/*!*//*+*/use std::net::TcpStream;
/*!*//*+*/use std::io::prelude::*;

fn main() {
  let listener = TcpListener::bind("127.0.0.1:7878").unwrap();

  for stream in listener.incoming() {
    let stream = stream.unwrap();

/*!*//*-*/    println!("Connection established!");
/*!*//*+*/    handle_connection(stream);
  }
}

/*!*//*+*/fn handle_connection(mut stream: TcpStream) {
/*!*//*+*/  let mut buffer = [0; 512];
/*!*//*+*/  stream.read(&mut buffer).unwrap();
/*!*//*+*/  println!("Request: {}", String::from_utf8_lossy(&buffer[..]));
/*!*//*+*/}
```
````
```rust
use std::net::TcpListener;
/*+*/use std::net::TcpStream;
/*+*/use std::io::prelude::*;

fn main() {
  let listener = TcpListener::bind("127.0.0.1:7878").unwrap();

  for stream in listener.incoming() {
    let stream = stream.unwrap();

/*-*/    println!("Connection established!");
/*+*/    handle_connection(stream);
  }
}

/*+*/fn handle_connection(mut stream: TcpStream) {
/*+*/  let mut buffer = [0; 512];
/*+*/  stream.read(&mut buffer).unwrap();
/*+*/  println!("Request: {}", String::from_utf8_lossy(&buffer[..]));
/*+*/}
```

<br>

Similar to `/*!*/`, `/*+*/` and `/*-*/` are pre-processed and language independent, i.e. you can use exactly the same
syntax regardless of the language you are using it in.

---

## Error/Warning Underline

You can use `/*~*/` in your code snippets to underline some part that would result in an error:

````
```csharp
public Option<int> method() =>
/*!*/  new Dictionary<int, int>()./*~*/TryGetValue/*~*/(0);
```
````

```csharp
public Option<int> method() =>
  new Dictionary<int, int>()./*~*/TryGetValue/*~*/(0);
```

<br>

Similarly you can use `/*~warn~*/` to underline parts that would result in a warning:
````
```csharp
public Option<int> method() =>
/*!*/  new Dictionary<int, int>()./*~warn~*/TryGetValue/*~warn~*/(0);
```
````
```csharp
public Option<int> method() =>
  new Dictionary<int, int>()./*~warn~*/TryGetValue/*~warn~*/(0);
```

<br>

Both `/*~*/` and `/*~warn~*/` work on multiple lines:
````
```csharp
public Option<int> /*~*/method() =>
  new Dictionary<int, int>().TryGetValue/*~*/(0);
```
````
```csharp
public Option<int> /*~*/method() =>
  new Dictionary<int, int>().TryGetValue/*~*/(0);
```

<br>

> [warning](:Icon) **WARNING**
>
> Since `/*~*/` and `/*~warn~*/` are interleaved within rest of the syntax,
> they ONLY WORK in languages supporting `/* ... */` comment syntax. They are
> also not pre-processed, so they will be copied alongside the rest of the code.

> :ToCPrevNext
