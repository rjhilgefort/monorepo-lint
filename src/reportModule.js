import { readJson } from 'fs-extra'
import { cond, T, prop, pathSatisfies, __, otherwise, pipe, then } from 'ramda'
import { isArray } from 'lodash/fp'
import chalk from 'chalk'
import { log, pathJoin2, mapIndexed } from './utils'
import { schema } from './schema'
import { relativeModulePath } from './relativeModulePath'

// reportModule :: AbsolutePath -> Unit
export const reportModule = modulePath => {
  const module = relativeModulePath(modulePath)

  return pipe(
    pathJoin2(__, 'package.json'),
    readJson,
    then(x => schema.validate(x, { abortEarly: false })),
    then(() => {
      log(chalk.bold.green(`✅  ${module}`))

      return { [module]: true }
    }),
    otherwise(err => {
      // Print module
      log(chalk.bold.red(`❌  ${module}`))

      cond([
        [
          // Handle schema errors thrown from `yup`
          pathSatisfies(isArray, ['errors']),
          pipe(
            prop('errors'),
            mapIndexed((error, i) => {
              const num = chalk.bold.red(`${i + 1})`)
              log(`   ${num} ${chalk.red(error)}`)
            }),
          ),
        ],
        // Any non-`yup` errors
        [
          T,
          pipe(
            prop('message'),
            chalk.red,
            log,
          ),
        ],
      ])(err)

      // Always return an object indicating this module had an error
      return { [module]: false }
    }),
  )(modulePath)
}
