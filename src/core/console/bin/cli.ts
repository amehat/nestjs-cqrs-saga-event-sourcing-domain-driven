#!/usr/bin/env node
import { NestFactory } from '@nestjs/core';
import * as chalk from 'chalk';
import * as program from 'commander';

import { ConsoleModule } from '../console.module';
import { EventStoreCommand } from '../commands/event-store.command';
import { AppModule } from '../../../app.module';
import { EventStoreModule } from '../../../core/eventstore/event-store.module';

// tslint:disable-next-line:no-console
const log = console.log;

async function bootstrap() {
  // const app = await NestFactory.createApplicationContext(ConsoleModule);

  const app = await NestFactory.create(ConsoleModule);
  const eventStoreCommand = app.select(EventStoreModule).get(EventStoreCommand);

  process.stdout.write('\u001b[2J\u001b[0;0H');

  program
    .version(
      require('../../../../package.json').version,
      '-v, --version',
      'Output the current version.',
    )
    .usage('<command> [options]')
    .helpOption('-h, --help', 'Output usage information.');

  program
    .command('replay-events')
    .description('Replay all events')
    .alias('re')
    .action(() => {
        log(`${chalk.bgRgb(60, 190, 100).bold.gray(' Replay events ')}`);
        eventStoreCommand.execute();
    })
    .on('--help', function() {
        log(`${chalk.bgRgb(60, 190, 100).bold.gray(' Replay events ')}`);
    });

  await program.parseAsync(process.argv);
}
bootstrap();
