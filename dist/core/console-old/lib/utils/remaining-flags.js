"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRemainingFlags(cli) {
    const rawArgs = [...cli.rawArgs];
    return rawArgs
        .splice(Math.max(rawArgs.findIndex((item) => item.startsWith('--')), 0))
        .filter((item, index, array) => {
        if (cli.options.find((o) => o.short === item || o.long === item)) {
            return false;
        }
        const prevKeyRaw = array[index - 1];
        if (prevKeyRaw) {
            const previousKey = camelCase(prevKeyRaw.replace('--', '').replace('no', ''));
            if (cli[previousKey] === item) {
                return false;
            }
        }
        return true;
    });
}
exports.getRemainingFlags = getRemainingFlags;
function camelCase(flag) {
    return flag.split('-').reduce((str, word) => {
        return str + word[0].toUpperCase() + word.slice(1);
    });
}
//# sourceMappingURL=remaining-flags.js.map