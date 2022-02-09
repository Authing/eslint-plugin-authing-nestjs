const path = require('path')
const chalk = require('chalk')
const execa = require('execa')

const step = msg => console.log(chalk.cyan(msg))
const run = (bin, args, opts = {}) => execa.sync(bin, args, { stdio: 'inherit', ...opts })

readyGo()

async function readyGo() {
  const { stdout } = await run('git', ['diff', '--cached'], { stdio: 'pipe' })

  if (stdout) {
    step('\nLint code...')
    lintCode(stdout)
  } else {
    console.log('No changes to commit.')
  }
}

function lintCode(stdout) {
  let arr = []

  stdout.replace(/(diff\s--git\sa\/.{1,}(\s|\n|\t))b\//g, ($0, $1) => {
    arr.push($1.replace(/diff\s--git\sa\//, ''))
  })

  arr
    .map(item => item.replace(/\s/g, ''))
    .filter(item => path.extname(item) === '.ts')
    .forEach(item => run('npm', ['run', 'lint:custom', item]))
}
