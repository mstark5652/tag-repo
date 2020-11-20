const core = require('@actions/core')
const github = require('@actions/github')

const run = async () => {
  const ghToken = core.getInput('gh-token') || process.env.GH_TOKEN
  const version = core.getInput('build-version') || process.env.BUILD_VERSION
  const message = core.getInput('build-message') || process.env.BUILD_MESSAGE || version

  if (!ghToken) {
    throw new Error('gh-token was not found.')
  }
  if (!version) {
    throw new Error('build-version was not found')
  }

  const octokit = github.getOctokit(ghToken)

  const tagCreateResponse = await octokit.git.createTag({
    ...github.context.repo,
    tag: version,
    message: message,
    object: process.env.GITHUB_SHA,
    type: 'commit'
  })

  console.log(`Pushing annotated tag to the repo: ${version}`)

  await octokit.git.createRef({
    ...github.context.repo,
    ref: `refs/tags/${version}`,
    sha: tagCreateResponse.data.sha
  })
}

run().catch(error => {
  console.error('Failed to run tag-repo action.', error)
  core.setFailed(error.message)
  return process.exit(1)
})
