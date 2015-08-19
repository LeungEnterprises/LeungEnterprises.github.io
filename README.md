# [Leung Enterprises](http://www.leungenterprises.com/) Homepage
v3.0.0

Leung Enterprises is a web design and development firm located in Ambler, PA.  We make modern, responsive websites for individuals and businesses.

Get started at [http://www.leungenterprises.com](http://www.leungenterprises.com/)!

## Global Dependencies
- [Gulp](http://gulpjs.com)
  - `npm install -g gulp`

## Workflow
First, run `git clone https://github.com/LeungEnterprises/leungenterprises.github.io`
Next, `cd leungenterprises.github.io`
### Development
Run `gulp dev` and visit http://localhost:3000
BrowserSync will reload the page everytime you make a change in the `src` directory
### Compilation
Run `gulp produce` after going into the `leungenterprises.github.io` directory to compile and minify all your files.
Run `gulp production` to do the above (produce your files) and then serve the production files at http://localhost:8080
### Deployment
1. If you haven't created a git repo, run `git init` to start.
2. Then, `git add .` and `git commit -m "Initial"`.
3. Next, for user pages, rename the branch by running `git branch -m dev`.
4. Run `git remote add origin <REPO URL>`.
5. Then, `git push origin dev`.
6. Next, create a new branch by running `git branch -b master`.
7. Delete every file except for the `dist` folder and the `README.md` file by running `git rm -rf <file name>`
8. Next, run `git mv dist/* .` to move the files in `dist` to the current folder
9. Then, run `git add .` and `git commit -m 'initial deploy'`.
10. To deploy to gh-pages run `git push origin master`.
11. Finally, to checkout back to the `dev` branch without pulling all the changes you made, run `git checkout -f dev`
12. Remember when committing to the remote repo, don't commit to `master` but run `git push origin dev`.

## Social
- Follow [@LeungEnterprise](http://twitter.com/LeungEnterprise) on Twitter
- Read the [Leung Enterprises Blog](http://blog.leung.enterprises/)

## License
  &copy; 2015 Leung Enterprises.  This repository is released under the [Creative Commons Attribution 4.0 International](http://creativecommons.org/licenses/by/4.0/).
