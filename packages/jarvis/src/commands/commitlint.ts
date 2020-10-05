import * as command from '@oclif/command';

import exec from '../exec';

export default class Commitlint extends command.Command {
  private readonly defaultOptions: Array<string> = ['-E', 'HUSKY_GIT_PARAMS'];

  async run(): Promise<void> {
    await exec('commitlint', this.defaultOptions);
  }
}
