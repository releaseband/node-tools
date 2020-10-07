import execa from 'execa';
import * as path from 'path';

export default async function exec(
  command: string,
  options?: Array<string>,
  stdio?: 'pipe' | 'ignore' | 'inherit'
): Promise<execa.ExecaReturnValue> {
  const bin = await execa('npm', ['bin']);

  const env = {
    PATH: `${process.env.PATH || ''}${path.delimiter}${bin.stdout}`,
  };

  return execa(command, options, { env, stdio });
}
