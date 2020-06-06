import { Command, CommanderStatic } from 'commander';

import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';
import { getRemainingFlags } from '../lib/utils/remaining-flags';

export class EventStoreCommand extends AbstractCommand {
    public load(program: CommanderStatic): void {
        program
        .command('replay-events')
        .alias('re')
        // .allowUnknownOption()
        .description('Replay alls events your project.')
        // .option(
        //     '-r',
        // )
        .action(async () => {
            try {
              await this.action.handle();
            } catch (err) {
              process.exit(0);
            }
        });
    }
}
