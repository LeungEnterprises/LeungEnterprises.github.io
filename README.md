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
Run `gulp deploy` to deploy to the gh-pages branch of your remote repository.  (Make sure you have a remote set in your local git repo)

## Social
- Follow [@LeungEnterprise](http://twitter.com/LeungEnterprise) on Twitter
- Read the [Leung Enterprises Blog](http://blog.leung.enterprises/)

## License
  &copy; 2015 Leung Enterprises.  This repository is released under the [Creative Commons Attribution 4.0 International](http://creativecommons.org/licenses/by/4.0/).
