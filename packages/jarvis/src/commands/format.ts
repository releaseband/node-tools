import * as command from '@oclif/command';

import exec from '../exec';

export default class Format extends command.Command {
  static strict = false;

  private readonly defaultOptions: Array<string> = [
    '--write',
    '--ignore-unknown',
  ];

  async run(): Promise<void> {
    const { argv } = this.parse(Format);

    const options: Array<string> = [...this.defaultOptions];

    if (argv.length > 0) {
      options.push(...argv);
    } else {
      options.push('.');
    }

    await exec('prettier', options);
  }
}
