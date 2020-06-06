import * as chalk from 'chalk';
import { CommanderStatic } from 'commander';

import {
  EventStoreAction,
} from '../actions';
import { ERROR_PREFIX } from '../lib/ui';
import { EventStoreCommand } from './event-store.command';

export class CommandLoader {
  public static load(program: CommanderStatic): void {
    new EventStoreCommand(new EventStoreAction()).load(program);
    this.handleInvalidCommand(program);
  }

  private static handleInvalidCommand(program: CommanderStatic) {
    program.on('command:*', () => {
      // tslint:disable-next-line:no-console
      console.error(
        `\n${ERROR_PREFIX} Invalid command: ${chalk.red('%s')}`,
        program.args.join(' '),
      );
      // tslint:disable-next-line:no-console
      console.log(
        `See ${chalk.red('--help')} for a list of available commands.\n`,
      );
      process.exit(1);
    });
  }
}
