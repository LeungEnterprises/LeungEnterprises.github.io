#!/usr/bin/env bash

git checkout dev
# gulp produce

echo "Please enter a commit message: "
read commit_message
git add --all .
git commit -m "\"$commit_message\""
git push origin dev

deploy_date=$(date +"%s")
folder_name="dist_$deploy_date"
cp -ar dist ../$folder_name
echo "Copied dist folder to ../$folder_name"
git checkout master

rm -rf css
rm -rf fonts
rm -rf img
rm -rf js
rm -rf partials
rm -rf portfolio
rm -rf CNAME
rm -rf LICENSE
rm -rf README.md
rm -rf sitemap.xml
rm -rf *.html

echo "Removed old files"
cp -ar ../$folder_name/. ./
echo "Copied new files"
rm -rf ../$folder_name
echo "Removed dist folder"

git add --all .
git commit -m "\"$commit_message\""
git push origin master