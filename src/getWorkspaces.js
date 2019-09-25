import { readJson } from 'fs-extra'
import { always, pipe, prop, then } from 'ramda'
import { ROOT_DIR, pathJoin2 } from './utils'

// getWorkspaces :: () -> [String]
export const getWorkspaces = () =>
  pipe(
    always('package.json'),
    pathJoin2(ROOT_DIR),
    readJson,
    then(prop('workspaces')),
  )()
