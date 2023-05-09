import validate from 'validate-npm-package-name'
import chalk from 'chalk'
import { execSync } from 'child_process'

export function validatePkgName (name) {
  const validateResult = validate(name)
  if (!validateResult.validForNewPackages) {
    console.error(
        `Could not create a project called ${chalk.red(`"${name}"`)} because of npm naming restrictions `
    )
    printValidateResult(validateResult.errors)
    printValidateResult(validateResult.warnings)
    process.exit(1)
  }
}
function printValidateResult (results) {
  if (typeof results !== "undefined") {
    results.forEach(err => {
      console.error(chalk.red(` * ${err}`))
    })
  }
}

export function install (manager, cwd) {
  let cmd = manager === 'yarn' ? 'yarn' : manager + ' i'
  execSync(cmd, {
    stdio: 'inherit',
    cwd
  })
}