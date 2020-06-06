export const CLI_ERRORS = {
  MISSING_TYPESCRIPT: (path: string) =>
    // tslint:disable-next-line:max-line-length
    `Could not find TypeScript configuration file "${path}". Please, ensure that you are running this command in the appropriate directory (inside Nest workspace).`,
  WRONG_PLUGIN: (name: string) =>
    `The "${name}" plugin is not compatible with Nest CLI. Neither "after()" nor "before()" function have been provided.`
};
