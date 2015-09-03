#!/usr/bin/env bash

git checkout dev
# gulp produce

echo "Please enter a commit message: "
read commit_message
git add --all .
git commit -m \"$commit_message\"
# git push origin dev

