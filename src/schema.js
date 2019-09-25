import { object, string, array } from 'yup'

export const schema = object().shape({
  name: string()
    .required()
    .matches(/^@dcf\//),
  version: string()
    .required()
    .matches(/^(\d+\.)?(\d+\.)?(\*|\d+)$/),
  description: string().required(),
  license: string()
    .required()
    .matches(/UNLICENSED/),
  main: string().required(),
  types: string(),
  scripts: object()
    .required()
    .shape({
      precommit: string()
        .required()
        .matches(/lint-staged/),
      preinstall: string()
        .required()
        .matches(/npx use-yarn/),
      clean: string()
        .required()
        .matches(/run-p clean:\*/),
      'clean:node_modules': string()
        .required()
        .matches(/rimraf node_modules/),
      'clean:build': string()
        .required()
        .matches(/^(rimraf (dist|build)|echo 'N\/A)/),
      tsc: string()
        .required()
        .matches(/^tsc -p tsconfig/),
      build: string()
        .required()
        .matches(/^((?!clean).)*$/),
      dev: string().required(),
      test: string().required(),
      'test:watch': string().matches(/(--watch|react-app-rewired)/),
      eslint: string()
        .required()
        .matches(/^(eslint|echo 'N\/A)/),
      'eslint:fix': string()
        .required()
        .matches(/^(yarn lint --fix|echo 'N\/A|yarn eslint --fix)/),
      lint: string()
        .required()
        .matches(
          /^(run-s tsc.*eslint|echo 'N\/A|eslint .+{js,ts}|eslint .+{js,jsx,ts,tsx})/,
        ),
      'lint:fix': string()
        .required()
        .matches(
          /^(yarn lint --fix|echo 'N\/A|yarn tsc && yarn eslint:fix|yarn eslint --fix)/,
        ),
    }),
  dependencies: object(),
  'lint-staged': object()
    .required()
    .shape({
      linters: object().required(),
      ignore: array(),
    }),
})
