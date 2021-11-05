
if [ "$(git status --porcelain | wc -l)" -eq "0" ]; then
  echo "› 🟢 Git repo is clean."
else
  echo "› Repo is dirty, committing changes"
  git add .
  git commit -m ":package: Preparing release"
  git push origin master
fi

echo "› Incrementing version"
npm version patch --no-git-tag-version

echo "› Publishing..."
npm publish --access=public

echo "› Published changes to npm"

echo "› Committing updated files"
git add .
git commit -m ":package: Post release"
git push origin master

echo "› Installing latest cli version globally"

npm install -g @envuso/cli


