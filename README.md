# tag-repo
Github Action to tag repository with the build version.

## Usage
```
uses: mstark5652/tag-repo@v0.1.0
with:
  gh-token: ${{ secrets.GITHUB_TOKEN }}
  build-version: 'v1'
  build-message: 'New release'
```

Want to dynamically pull the version number? For a standard javascript application, you can replace the build-version value with the following to pull the version number from your package.json.
* Add an addition step above the tag-repo call
```
- name: Get build version
  id: get-build-version
  run: echo "::set-output name=build-version::$(node -p "require('./package.json').version")"
  shell: bash
```
* Then set build-version with the output from that earlier step
```
build-version: ${{ steps.get-build-version.outputs.build-version }}
```
