const globby = require('globby')
const path = require('path')
const fs = require('fs-extra')

const rootDir = process.cwd()

fs.mkdirpSync(`${rootDir}/dist/types/`)

readyGo()

async function readyGo () {
  await copyTypes()
  copyTsConfig()
}

async function copyTypes () {
  const files = await globby(`${rootDir}/src/types/*.ts`)
  files.forEach(file => {
    const filename = path.basename(file)
    fs.copyFileSync(file, `${rootDir}/dist/types/${filename}`)
  })
}

function copyTsConfig () {
  const tsConfig = require(`${rootDir}/tsconfig.json`)
  delete tsConfig.include
  delete tsConfig.exclude
  fs.writeFileSync(`${rootDir}/dist/tsconfig.json`, JSON.stringify(tsConfig, null, 2), 'utf-8')
}
