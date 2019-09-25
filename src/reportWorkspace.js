import { readdir } from 'fs-extra'
import { equals, pipe, reject, slice, then } from 'ramda'
import { ROOT_DIR, pathJoin2, mapAsync } from './utils'
import { reportModule } from './reportModule'

// reportWorkspace :: GlobPath -> Unit
export const reportWorkspace = pipe(
  slice(0, -2), // remove `/*` from the workspace glob path
  pathJoin2(ROOT_DIR),
  workspacePath =>
    pipe(
      readdir,
      // TODO: Expose a blacklist for ignored modules
      then(reject(equals('storybook'))), 
      then(
        mapAsync(
          pipe(
            // TODO: Why can this not be point free? It errors if you remove `x`
            x => pathJoin2(workspacePath, x),
            reportModule,
          ),
        ),
      ),
    )(workspacePath),
)
