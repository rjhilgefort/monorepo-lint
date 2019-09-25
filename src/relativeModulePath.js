import { join, pipe, split, takeLast } from 'ramda'

// relativeModulePath :: AbsolutePath -> RelativePath
export const relativeModulePath = absoluteModulePath =>
  pipe(
    split('/'),
    takeLast(2),
    join('/'),
  )(absoluteModulePath)
