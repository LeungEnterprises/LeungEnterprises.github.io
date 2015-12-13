# [Leung Enterprises](https://www.leungenterprises.com/) Homepage Source
This repository has the source code of the site as well as a gulpfile for compiling those files.

View the site here: [https://www.leungenterprises.com](https://www.leungenterprises.com/)

## How to Use
1. Make changes to any files in this repository, then run `gulp`.
2. The compiled files will appear in the `build` directory.
3. Copy the compiled folder (`build`) from this repository into the `www-produce` repository to produce the files.

## Committing
`git push origin master:source`


## Included Plugins
- "babel": "^6.0.15" (for the ES6 gulpfile)
- "babel-preset-es2015": "^6.0.15" (for the ES6 gulpfile)
- "bower": "^1.6.5" (for frontend packages - all installed packages are put in the `vendor` directory
- "gulp": "^3.9.0" (task runner)
- "gulp-babel": "^6.0.0" (compiles the ES6 back into ES5)
- "gulp-flatten": "^0.2.0" (used to flatten the font file structure which is compied from `vendor` into the `fonts` dir)
- "gulp-jade": "^1.1.0" (compiles Jade into HTML)
- "gulp-plumber": "^1.0.1" (prevents stops/crashes on errors in Gulp)
- "gulp-stylus": "^2.1.0" (compiles Stylus into CSS)
