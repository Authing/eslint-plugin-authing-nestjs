const path = require('path')
const chalk = require('chalk')
const execa = require('execa')

const step = msg => console.log(chalk.cyan(msg))
const run = (bin, args, opts = {}) => execa.sync(bin, args, { stdio: 'inherit', ...opts })

readyGo()

function readyGo() {
  const { stdout } = run('git', ['diff', '--cached'], { stdio: 'pipe' })

  if (stdout) {
    step('\nLint code...')
    lintCode(stdout)

    step('\nUnit testing...')
    test()
  } else {
    console.log('No changes to commit.')
  }
}

function lintCode(stdout) {
  // There are no operations such as merging tsconfig for the time being
  // so use Map to search rather than Array
  const sensitivelyFilesMap = {
    'tsconfig.json': true,
    '.eslintrc': true,
    '.prettierrc': true
  }
  const originDiffs = []

  stdout.replace(/(diff\s--git\sa\/.{1,}(\s|\n|\t))b\//g, ($0, $1) => {
    originDiffs.push($1.replace(/diff\s--git\sa\//, '').replace(/\s/g, ''))
  })

  if (originDiffs.some(diff => sensitivelyFilesMap[diff])) {
    return run('npm', ['run', 'lint'])
  }

  const diffs = originDiffs.filter(item => path.extname(item) === '.ts')
  diffs.forEach(item => run('npm', ['run', 'lint:custom', item]))
}

function test () {
  run('npm', ['run', 'test'])
}
