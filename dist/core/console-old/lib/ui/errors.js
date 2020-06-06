"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLI_ERRORS = {
    MISSING_TYPESCRIPT: (path) => `Could not find TypeScript configuration file "${path}". Please, ensure that you are running this command in the appropriate directory (inside Nest workspace).`,
    WRONG_PLUGIN: (name) => `The "${name}" plugin is not compatible with Nest CLI. Neither "after()" nor "before()" function have been provided.`
};
//# sourceMappingURL=errors.js.map