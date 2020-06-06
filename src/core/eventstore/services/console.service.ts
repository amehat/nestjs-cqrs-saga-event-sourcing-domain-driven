import { Injectable, Logger } from '@nestjs/common';
import { Command, Console } from 'nestjs-console';
import 'colors';
import { get as emoji } from 'node-emoji';

import { EventStoreStore } from '../store/eventstore.store';

@Injectable()
@Console()
export class ConsoleService {
  @Command({
    command: 'replay-events',
    description:
      'Replay all events and dispatch one after the other with the message queue',
    alias: '-r',
  })
  public async replayAllEvents(): Promise<void> {
    ConsoleService.clearConsole();
    Logger.log('+ run replay all events'.green);
    const eventStoreProvider = new EventStoreStore();
    await eventStoreProvider.replayAllEvent();
    Logger.log('+ finish replay all events '.green + emoji('rocket'));
  }

  public static clearConsole(): void {
    process.stdout.write('\u001b[2J\u001b[0;0H');
  }
}
