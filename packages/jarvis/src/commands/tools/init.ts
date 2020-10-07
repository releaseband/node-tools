import * as command from '@oclif/command';
import chalk from 'chalk';
import cpy from 'cpy';
import { Listr, ListrTask } from 'listr2';
import * as path from 'path';

import {
  getPeerDependencies,
  installDependencies,
  PackageInfo,
} from '../../npm';

type ConfigInfo = {
  template: string;
  config: string;
};

type ToolInfo = {
  name: string;
  packages: Array<PackageInfo & { skipPeerDependencies?: boolean }>;
} & ConfigInfo;

const configs: Array<ConfigInfo> = [
  {
    template: 'editorconfig.template',
    config: '.editorconfig',
  },
  {
    template: 'gitignore.template',
    config: '.gitignore',
  },
];

const tools: Array<ToolInfo> = [
  {
    name: 'Prettier',
    packages: [{ name: '@releaseband/prettier-config', version: 'latest' }],
    template: 'prettier.template.json',
    config: '.prettierrc.json',
  },
  {
    name: 'ESLint',
    packages: [{ name: '@releaseband/eslint-config', version: 'latest' }],
    template: 'eslint.template.json',
    config: '.eslintrc.json',
  },
  {
    name: 'commitlint',
    packages: [{ name: '@releaseband/commitlint-config', version: 'latest' }],
    template: 'commitlint.template.json',
    config: '.commitlintrc.json',
  },
  {
    name: 'commitizen',
    packages: [
      { name: 'commitizen', version: 'latest' },
      { name: 'commitiquette', version: 'latest', skipPeerDependencies: true },
    ],
    template: 'commitizen.template.json',
    config: '.cz.json',
  },
  {
    name: 'lint-staged',
    packages: [{ name: 'lint-staged', version: 'latest' }],
    template: 'lint-staged.template.json',
    config: '.lintstagedrc.json',
  },
  {
    name: 'husky',
    packages: [{ name: 'husky', version: 'latest' }],
    template: 'husky.template.json',
    config: '.huskyrc.json',
  },
];

async function getToolDependencies(
  toolInfo: ToolInfo
): Promise<Array<PackageInfo>> {
  const jobs = toolInfo.packages
    .filter(item => !item.skipPeerDependencies)
    .map(getPeerDependencies);

  const dependencies = await Promise.all(jobs);

  return dependencies.reduce(
    (prev, cur) => [...prev, ...cur],
    toolInfo.packages
  );
}

async function installToolDependencies(toolInfo: ToolInfo): Promise<void> {
  const packages = await getToolDependencies(toolInfo);

  await installDependencies(packages, true);
}

async function copyConfig(configInfo: ConfigInfo): Promise<void> {
  await cpy(path.resolve(__dirname, 'configs', configInfo.template), '.', {
    rename: configInfo.config,
  });
}

export default class Init extends command.Command {
  async run(): Promise<void> {
    try {
      const configTasks: Array<ListrTask> = configs.map(item => ({
        title: `Create ${item.config}`,
        task: () => copyConfig(item),
      }));

      const toolTasks: Array<ListrTask> = tools.map<ListrTask>(item => ({
        title: `Init ${item.name}`,
        task: () =>
          new Listr([
            {
              title: 'Install dependencies',
              task: () => installToolDependencies(item),
            },
            {
              title: 'Create config',
              task: () => copyConfig(item),
            },
          ]),
      }));

      const tasks = new Listr([...configTasks, ...toolTasks]);

      this.log('init tools');

      await tasks.run();

      this.log(chalk.green('success init tools'));
    } catch (error) {
      this.error(chalk.red(error));
    }
  }
}
