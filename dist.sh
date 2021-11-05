
if [ "$(git status --porcelain | wc -l)" -eq "0" ]; then
  echo "› 🟢 Git repo is clean."
else
  echo "› Repo is dirty, committing changes"
  git add .
  git commit -m ":package: Prearing release"
  git push origin next
fi

echo "› Incrementing version"
npm version patch --no-git-tag-version

echo "› Publishing..."
npm publish --access=public

echo "› Published changes to npm"

echo "› Installing latest cli version globally"

npm install -g @envuso/cli


