const globby = require('globby')
const path = require('path')
const fs = require('fs-extra')

fs.mkdirpSync('./dist/types/')

globby('./src/types/*.ts').then(files => {
  files.forEach(file => {
    const filename = path.basename(file)
    fs.copyFileSync(file, `./dist/types/${filename}`)
  })
})
