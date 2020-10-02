import * as command from '@oclif/command';

import Lint from './lint';

export default class Fix extends command.Command {
  static strict = false;

  async run(): Promise<void> {
    const { argv } = this.parse(Fix);

    await Lint.run(['--fix', ...argv]);
  }
}
