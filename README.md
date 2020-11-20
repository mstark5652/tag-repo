# tag-repo

Github Action to tag repository with the build version.

## Usage
```
uses: actions/tag-repo@v0.1.0
with:
  gh-token: ${{ secrets.GITHUB_TOKEN }}
  build-version: 'v${{ node -p "require('./package.json').version" }}'
  build-message: 'New release'
```
gh-token
build-version
build-message
