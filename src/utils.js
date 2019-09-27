import path from 'path'
import { addIndex, curryN, map, pipe, curry } from 'ramda'

export const log = console.log

export const ROOT_DIR = process.cwd()

export const pathJoin2 = curryN(2, path.join)

export const mapIndexed = addIndex(map)

// eslint-disable-next-line no-process-exit
export const exitWith0 = () => process.exit(0)

// eslint-disable-next-line no-process-exit
export const exitWith1 = () => process.exit(1)

export const PromiseAll = x => Promise.all(x)

// mapAsync :: Function -> Array a -> Promise<a>
export const mapAsync = curry((xf, data) =>
  pipe(
    map(xf),
    PromiseAll,
  )(data),
)
