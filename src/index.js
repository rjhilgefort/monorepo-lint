import chalk from 'chalk'
import { equals, any, ifElse, values, mergeAll, unnest, pipe } from 'ramda'
import { getWorkspaces } from './getWorkspaces'
import { reportWorkspace } from './reportWorkspace'
import { mapAsync, log, exitWith0, exitWith1 } from './utils'

getWorkspaces()
  .then(mapAsync(reportWorkspace))
  .then(
    pipe(
      unnest,
      mergeAll,
      values,
      ifElse(any(equals(false)), exitWith1, exitWith0),
    ),
    err => {
      pipe(
        chalk.red,
        log,
      )(err)
      log(err)
      exitWith1()
    },
  )
