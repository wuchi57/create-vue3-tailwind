#!/usr/bin/env node
import path from 'path'
import prompts from 'prompts'
import fs from 'fs-extra'
import chalk from 'chalk'
import {validatePkgName, install} from './utils/index.js'

const __dirname = path.resolve()

const pkgName = process.argv[2]
validatePkgName(pkgName)
const dir = path.resolve(pkgName.startsWith('@') ? pkgName.split('/')[1] : pkgName)
await init(dir)

async function init (dir) {
  await createDir()
  const options = await getOptions()
  await copyFiles(options)
  install(options.packageManager, dir)
  console.log(`${chalk.green("✔")} Success! Created ${chalk.cyan(pkgName)} at ${chalk.cyan(dir)}`)
}

async function createDir () {
  if (fs.pathExistsSync(dir)) {
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

async function getOptions () {
  return await prompts([
    {
      message: '项目名称',
      name: 'name',
      type: 'text',
      initial: pkgName,
    },
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
  ])
}

async function copyFiles (options) {
  const {name, description} = options
  fs.copySync(path.resolve(__dirname, './template-vue3-tailwind'), dir)
  await fs.writeFileSync(path.resolve(dir, 'README.md'), `# ${name}\n\n${description}\n`)
  // 修改package.json
  const pkgPath = path.resolve(dir, 'package.json')
  const json = JSON.parse(fs.readFileSync(pkgPath))
  json.name = name
  json.description = description
  fs.writeFileSync(pkgPath, JSON.stringify(json, null, 2) + '\n')
}
