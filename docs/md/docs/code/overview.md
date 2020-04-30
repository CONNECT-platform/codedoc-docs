# Code Snippets

Code snippets and examples are perhaps the most important tools at your disposal when trying
to teach other people how to work with your software project (which is the purpose of **CODEDOC** to begin with).
As a result, codedoc comes with a host of features on code snippets to enhance learning experience by them.

---

## Highlights

> :Tabs
>
> > :Tab title=Markdown
> >````
> >```go | clojure-example.go
> >package main
> >
> >import "fmt"
> >
> >func intSeq() func() int {
> >/*!*//*!*/    i := 0
> >/*!*//*!*/    return func() int {
> >/*!*//*!*/        i++
> >/*!*//*!*/        return i
> >/*!*//*!*/    }
> >}
> >
> >func main() {
> >    nextInt := intSeq()
> >    fmt.Println(nextInt())
> >    fmt.Println(nextInt())
> >    fmt.Println(nextInt())
> >
> >    newInts := intSeq()
> >    fmt.Println(newInts())
> >}
> >```
> >````
>
> > :Tab title=How it looks
> >```go | clojure-example.go
> >package main
> >
> >import "fmt"
> >
> >func intSeq() func() int {
> >/*!*/    i := 0
> >/*!*/    return func() int {
> >/*!*/        i++
> >/*!*/        return i
> >/*!*/    }
> >}
> >
> >func main() {
> >    nextInt := intSeq()
> >    fmt.Println(nextInt())
> >    fmt.Println(nextInt())
> >    fmt.Println(nextInt())
> >
> >    newInts := intSeq()
> >    fmt.Println(newInts())
> >}
> >```

<br>

> :Buttons
> > :Button label=Learn More, url=/docs/code/highlights

---

## Hints

> :Tabs
> > :Tab title=Markdown
> >````
> >```python | google.py
> >import urllib2
> >import urllib
> >import json
> >
> >/*!*/url = "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&"  # --> url to google API
> >/*!*/query = raw_input("What do you want to search for ? >> ")           # --> get the search query from user
> >/*!*/query = urllib.urlencode({'q' : query })                            # --> url-encode it
> >/*!*/response = urllib2.urlopen (url + query).read()                     # --> ask google
> >/*!*/data = json.loads (response)                                        # --> parse the response
> >/*!*/results = data ['responseData'] ['results']                         # --> open the response array
> >
> >/*!*/for result in results:                                              # --> nicely print the results
> >    title = result['title']
> >    url = result['url']
> >    print (title + '; ' + url)
> >```
> >````
>
> > :Tab title=How It Looks
> >```python | google.py
> >import urllib2
> >import urllib
> >import json
> >
> >url = "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&"  # --> url to google API
> >query = raw_input("What do you want to search for ? >> ")           # --> get the search query from user
> >query = urllib.urlencode({'q' : query })                            # --> url-encode it
> >response = urllib2.urlopen (url + query).read()                     # --> ask google
> >data = json.loads (response)                                        # --> parse the response
> >results = data ['responseData'] ['results']                         # --> open the response array
> >
> >for result in results:                                              # --> nicely print the results
> >    title = result['title']
> >    url = result['url']
> >    print (title + '; ' + url)
> >```

<br>

> :Buttons
> > :Button label=Learn More, url=/docs/code/hints

---

## References

> :Tabs
> > :Tab title=Markdown
> >````
> >```rust | conversion.rs
> >/*!*//*!*/use std::convert::TryFrom;   // @see [official docs](https://doc.rust-lang.org/rust-by-example/conversion/try_from_try_into.html)
> >/*!*//*!*/use std::convert::TryInto;   // @see [official docs](https://doc.rust-lang.org/rust-by-example/conversion/try_from_try_into.html)
> >
> >#[derive(Debug, PartialEq)]
> >struct EvenNumber(i32);
> >
> >impl TryFrom<i32> for EvenNumber {
> >    type Error = ();
> >
> >    fn try_from(value: i32) -> Result<Self, Self::Error> {
> >        if value % 2 == 0 {
> >            Ok(EvenNumber(value))
> >        } else {
> >            Err(())
> >        }
> >    }
> >}
> >
> >fn main() {
> >    assert_eq!(EvenNumber::try_from(8), Ok(EvenNumber(8))); // --> Try From
> >    assert_eq!(EvenNumber::try_from(5), Err(()));           // --> Try From
> >
> >    let result: Result<EvenNumber, ()> = 8i32.try_into();   // --> Try To
> >    assert_eq!(result, Ok(EvenNumber(8)));                  // --> Try To
> >    let result: Result<EvenNumber, ()> = 5i32.try_into();   // --> Try To
> >    assert_eq!(result, Err(()));                            // --> Try To
> >}
> >```
> >````
>
> > :Tab title=How it Looks
> >```rust | conversion.rs
> >/*!*/use std::convert::TryFrom;   // @see [official docs](https://doc.rust-lang.org/rust-by-example/conversion/try_from_try_into.html)
> >/*!*/use std::convert::TryInto;   // @see [official docs](https://doc.rust-lang.org/rust-by-example/conversion/try_from_try_into.html)
> >
> >#[derive(Debug, PartialEq)]
> >struct EvenNumber(i32);
> >
> >impl TryFrom<i32> for EvenNumber {
> >    type Error = ();
> >
> >    fn try_from(value: i32) -> Result<Self, Self::Error> {
> >        if value % 2 == 0 {
> >            Ok(EvenNumber(value))
> >        } else {
> >            Err(())
> >        }
> >    }
> >}
> >
> >fn main() {
> >    assert_eq!(EvenNumber::try_from(8), Ok(EvenNumber(8))); // --> Try From
> >    assert_eq!(EvenNumber::try_from(5), Err(()));           // --> Try From
> >
> >    let result: Result<EvenNumber, ()> = 8i32.try_into();   // --> Try To
> >    assert_eq!(result, Ok(EvenNumber(8)));                  // --> Try To
> >    let result: Result<EvenNumber, ()> = 5i32.try_into();   // --> Try To
> >    assert_eq!(result, Err(()));                            // --> Try To
> >}
> >```

<br>

> :Buttons
> > :Button label=Learn More, url=/docs/code/refs

---

## Top-Bar

> :Tabs
> > :Tab title=Markdown
> >````
> >/*!*/```docker | project/Dockerfile
> ># our base image
> >FROM alpine:3.5
> >
> ># Install python and pip
> >RUN apk add --update py2-pip
> >
> ># upgrade pip
> >RUN pip install --upgrade pip
> >
> ># install Python modules needed by the Python app
> >COPY requirements.txt /usr/src/app/
> >RUN pip install --no-cache-dir -r /usr/src/app/requirements.txt
> >
> ># copy files required for the app to run
> >COPY app.py /usr/src/app/
> >COPY templates/index.html /usr/src/app/templates/
> >
> ># tell the port number the container should expose
> >EXPOSE 5000
> >
> ># run the application
> >CMD ["python", "/usr/src/app/app.py"]
> >```
> >````
>
> > :Tab title=How it Looks
> >```docker | project/Dockerfile
> ># our base image
> >FROM alpine:3.5
> >
> ># Install python and pip
> >RUN apk add --update py2-pip
> >
> ># upgrade pip
> >RUN pip install --upgrade pip
> >
> ># install Python modules needed by the Python app
> >COPY requirements.txt /usr/src/app/
> >RUN pip install --no-cache-dir -r /usr/src/app/requirements.txt
> >
> ># copy files required for the app to run
> >COPY app.py /usr/src/app/
> >COPY templates/index.html /usr/src/app/templates/
> >
> ># tell the port number the container should expose
> >EXPOSE 5000
> >
> ># run the application
> >CMD ["python", "/usr/src/app/app.py"]
> >```

<br>

> :Buttons
> > :Button label=Learn More, url=/docs/code/wmbar

---

## Unsupported Languages

**CODEDOC** uses [Prism](https://prismjs.com) for syntax highlighting. In case a language
is not supported by Prism, you will get an error indicating that the language for the snippet
is not recognized.

> :Buttons
> > :Button label=Languages Supported by Prism, url=https://prismjs.com/#supported-languages

In most cases, this is actually a typo in the markdown, and the error helps you track it down
and fix it. However, in rare cases you are actually writing a snippet in a new language which
is not yet supported by Prism. In such a case, you can overcome the error in two ways:

- You can remove the language marker:

> :Tabs
> > :Tab title=Markdown
> > ````
> > ```
> > Ok some unknown syntax
> > ```
> > ````
>
> > :Tab title=How it Looks
> > ```
> > Ok some unknown syntax
> > ```

<br>

> :Tabs
> > :Tab title=Markdown
> > ````
> > ``` | whatever.xyz
> > Ok some unknown syntax
> > Ok some unknown syntax
> > Ok some unknown syntax
> > ```
> > ````
>
> > :Tab title=How it Looks
> > ``` | whatever.xyz
> > Ok some unknown syntax
> > Ok some unknown syntax
> > Ok some unknown syntax
> > ```

<br>

- **OR**, you can use the `--safe-highlight` flag:

> :Tabs
> > :Tab title=Markdown
> > ````
> > ``` xyz | whatever.xyz | --safe-highlight
> > Ok some unknown syntax
> > Ok some unknown syntax
> > Ok some unknown syntax
> > ```
> > ````
>
> > :Tab title=How it Looks
> > ``` xyz | whatever.xyz | --safe-highlight
> > Ok some unknown syntax
> > Ok some unknown syntax
> > Ok some unknown syntax
> > ```



> :ToCPrevNext