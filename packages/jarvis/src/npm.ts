import exec from './exec';

export type PackageInfo = {
  name: string;
  version: string;
};

function getPackageString(packageInfo: PackageInfo): string {
  return `${packageInfo.name}@${packageInfo.version}`;
}

export async function getPeerDependencies(
  packageInfo: PackageInfo
): Promise<Array<PackageInfo>> {
  const npm = await exec('npm', [
    'info',
    getPackageString(packageInfo),
    'peerDependencies',
    '--json',
  ]);

  const out = npm.stdout.trim();

  if (out.length === 0) {
    return [];
  }

  const peerDependencies = JSON.parse(npm.stdout) as Record<string, string>;

  return Object.entries(peerDependencies).map<PackageInfo>(
    ([packageName, packageVersion]) => ({
      name: packageName,
      version: packageVersion,
    })
  );
}

export async function installDependencies(
  packages: Array<PackageInfo>,
  isDev = false
): Promise<void> {
  await exec('npm', [
    'install',
    isDev ? '--save-dev' : '--save',
    ...packages.map(getPackageString),
  ]);
}
