#!/usr/bin/env node
import path from 'path'
import prompts from 'prompts'
import fs from 'fs-extra'
import chalk from 'chalk'
import {validatePkgName, install} from './utils/index.js'
import { fileURLToPath} from 'node:url'

await init()

async function init () {
  const options = await getOptions()
  let pkgName = process.argv[2] === undefined ? options.name : process.argv[2]
  validatePkgName(pkgName)
  const dir = path.resolve(pkgName.startsWith('@') ? pkgName.split('/')[1] : pkgName)
  await validateDir(pkgName)
  await copyFiles(options, dir)
  install(options.packageManager, dir)
  console.log(`${chalk.green("✔")} Success! Created ${chalk.cyan(pkgName)} at ${chalk.cyan(dir)}`)
}

async function getOptions () {
  let questions = [
    {
      message: '项目描述',
      name: 'description',
      type: 'text',
      initial: '这是一个项目模版',
    },
    {
      name: "packageManager",
      type: "select",
      choices: ["yarn", "pnpm", "npm"].map((i) => ({ title: i, value: i })),
      message: "请选择要使用的包管理工具",
    },
  ]
  if (process.argv[2] === undefined) {
    questions.unshift({
      message: '项目名称',
      name: 'name',
      type: 'text',
      initial: 'vue3-tailwind',
    })
  }
  return await prompts(questions)
}

async function validateDir (dir) {
  if (fs.pathExistsSync(dir)) {
    console.log(chalk.bold(`目录 ${dir} 已存在`))
    const { yes } = await prompts({
      name: 'yes',
      type: 'confirm',
      message: chalk.bold('您是否需要覆盖已存在的目录？')
    })
    if (!yes) process.exit(1)
    await fs.remove(dir)
  }
  fs.mkdirpSync(dir, {})
}

async function copyFiles (options, dir) {
  const templateDir = path.resolve(
      fileURLToPath(import.meta.url),
      '../',
      `template-vue3-tailwind`,
  )
  const {name, description} = options
  fs.copySync(templateDir, dir)
  await fs.writeFileSync(path.resolve(dir, 'README.md'), `# ${name}\n\n${description}\n`)
  // 修改package.json
  const pkgPath = path.resolve(dir, 'package.json')
  const json = JSON.parse(fs.readFileSync(pkgPath))
  json.name = name
  json.description = description
  fs.writeFileSync(pkgPath, JSON.stringify(json, null, 2) + '\n')
  // 重命名_开头的文件
  const renameFiles = {
    _gitignore: '.gitignore',
    _env: '.env'
  }
  Object.keys(renameFiles).forEach(key => {
    fs.moveSync(path.resolve(dir, key), path.resolve(dir, renameFiles[key]), {overwrite: true})
  })
}
