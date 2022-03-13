# poor-mans-ssg
The poor man's static site/blog generator. A simple script generates individual HTML pages from markdown files, and lists them in the home page. 

This is the basis for [notes.cerdenia.com](https://notes.cerdenia.com).

## Running locally

After cloning the repo, install dependencies:

```
npm i
```

Add new entries under the `markdown` folder. When finished, run the script:

```
npm run start
```

The generated HTML files will appear in the `dist` folder.
