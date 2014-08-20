##Motivation

I am a big fan of gulp and sadly I did not found any gulp webpack seed project, so I made one.
This seed based on [React Infinite Scroll component](https://github.com/lapanoid/react-infinite-scroll)

##Install

clone this repo

```bash
npm i
```
<!---
#OR Use by package managers
## via npm 
```bash
npm install react-infinite-scroll-webpack
```

## via bower
```bash
bower install react-infinite-scroll
```
--->

##Some Webpack livereload magic
Just run
```bash
gulp
```
to use Webpack dev server.
You can play with source code and it will be livereloaded on change.

##Usual build
```bash
gulp build-all
```
You can also build prod and dev separately.

```bash
gulp build-prod
gulp build-dev
```
Check dist folder for index.html after build.


##TODO
* fix [issue](https://github.com/lapanoid/gulp-webpack-seed/issues/1)
* move from gulp-clean to gulp rimraf
* fix web dev server configuration ( path: "/" not path: "./dist/dev/scripts", but need both)
* support generation of amd dist assets

##Some considerations
Firstly, my plan was to split distrs and source project. But this introduce a lot of problems and complexity, which require solvation before we can actually use npm to start reuse and manage packages. Screw that (at least for now). 
All I need to start use npm is version bump -> publish task for sourse project, and define path in main property of package.json

```
{
  "name": "myexposedmodulename",
  "main": "src/scripts/myexposedmodulename.jsx",
  ...
```

After that our package is can be required by webpack 
