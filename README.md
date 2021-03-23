# Markdown Notepad

## Introduction

This is a frontend project for markdown parser, converting markdown into html. You can write markdown and see the preview at the same time.

The project is created with Vue cli.

The features include:

- real-time parsing
- easy-to-use functional buttons for those who are not familiar with markdown
- downloading markdown and the rendered html as a file. It also supports uploading a markdown file to render html.

The project uses `marked` to parse markdown.

As for a test markdown file selected from reality containing 22000 words, the render time of several libraries is below:

| library                                               | average time/10 times | comments                |
| ----------------------------------------------------- | --------------------- | ----------------------- |
| [showdown](https://github.com/showdownjs/showdown)    | 150.6ms               |                         |
| [markdown](https://github.com/evilstreak/markdown-js) | 60.9ms                |                         |
| [markdown-it]()                                       | 19.3ms                |                         |
| [remarkable](https://github.com/jgm/CommonMark)       | 12.7ms                | Not support html syntax |
| [marked](https://github.com/markedjs/marked)          | 17ms                  |                         |



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

The output file is `./dist/index.html`.

### Lints and fixes files

```
npm run lint
```
