import * as command from '@oclif/command';
import * as path from 'path';

import exec from '../exec';

export default class LintStaged extends command.Command {
  private configPath = path.resolve(__dirname, 'lint-staged.config.json');

  async run(): Promise<void> {
    await exec('lint-staged', ['--config', this.configPath]);
  }
}
