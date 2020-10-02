import * as command from '@oclif/command';

import exec from '../exec';

export default class Lint extends command.Command {
  static flags = {
    fix: command.flags.boolean(),
  };

  static strict = false;

  async run(): Promise<void> {
    const { flags, argv } = this.parse(Lint);

    const options: Array<string> = ['--format=codeframe'];

    if (flags.fix) {
      options.push('--fix');
    }

    if (argv.length > 0) {
      options.push(...argv);
    } else {
      options.push('.');
    }

    await exec('eslint', options);
  }
}
