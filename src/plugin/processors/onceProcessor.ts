import { promises as fs } from 'fs';
import Package from 'package-json-helper';
import path from 'path';
import { Helpers, Root } from 'postcss';
import { fileURLToPath } from 'url';

import { IPluginProcessors } from '../types';

const processor: IPluginProcessors['Once'] = ({ plugin }) => {
  const dirname = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../');
  const pkg = new Package(path.resolve(dirname, '../package.json'));

  return async (root: Root, { postcss }: Helpers): Promise<void> => {
    await pkg.read();

    const comment = `! ${plugin} v${pkg.version ?? ''} | ${pkg.license ?? ''} License | ${pkg.homepage ?? ''}`;
    const styles = await fs.readFile(path.join(dirname, 'theme/preflight/preflight.css'), 'utf-8');
    const nodes = [
      postcss.comment({ text: comment }),
      postcss.comment({ text: '! purgecss start ignore' }),
      ...postcss.parse(styles).nodes,
      postcss.comment({ text: '! purgecss end ignore' }),
    ];

    if (root.first) {
      root.insertBefore(root.first, nodes);
    } else {
      root.append(...nodes);
    }
  };
};

export default processor;
