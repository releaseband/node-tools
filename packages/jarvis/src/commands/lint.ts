import * as command from '@oclif/command';

import exec from '../exec';

export default class Lint extends command.Command {
  static flags = {
    fix: command.flags.boolean(),
  };

  static strict = false;

  private readonly defaultOptions: Array<string> = ['--format=codeframe'];

  async run(): Promise<void> {
    const { flags, argv } = this.parse(Lint);

    const options: Array<string> = [...this.defaultOptions];

    if (flags.fix) {
      options.push('--fix');
    }

    if (argv.length > 0) {
      options.push(...argv);
    } else {
      options.push('.');
    }

    await exec('eslint', options, 'inherit');
  }
}
