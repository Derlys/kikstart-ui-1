import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { addDepsToPackageJson, getProjectConfig } from '@nrwl/workspace';
import { existsSync } from 'fs';
import { join } from 'path';
import { Schema } from './schema';

function addStyles(options: Schema, config: any) {
  return (host: Tree, context: SchematicContext) => {
    const styles = config?.architect?.build?.options?.styles;
    if (!styles.length) {
      context.logger.error(`Can not read styles`);
      throw new Error();
    }
    const stylePath = join(styles[0]);

    if (!existsSync(stylePath)) {
      context.logger.error(`Can not find ${stylePath}`);
      throw new Error();
    }
    const content = host.read(stylePath);
    const styleImport = stylePath.endsWith('.scss')
      ? `@import "~@kikstart-playground/themes/scss/${options.theme}";`
      : `@import "~@kikstart-playground/themes/css/${options.theme}.css";`;

    if (!content.includes(styleImport)) {
      context.logger.info(`Updating stylesheet`);
      host.overwrite(stylePath, [content, styleImport].join('\n'));
    }
  };
}

function tweakPackage(host: Tree) {
  const appComponent = `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`<router-outlet></router-outlet>\`,
})
export class AppComponent {}
`;

  const deleteFiles = [
    'src/app/app.component.html',
    'src/app/app.component.css',
    'src/app/app.component.scss',
  ];

  deleteFiles.forEach((file) => {
    if (host.exists(file)) {
      host.delete(file);
    }
  });
  host.overwrite('src/app/app.component.ts', appComponent);
  return host;
}

export default function (options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    if (!host.get('angular.json')) {
      throw new Error(`Cannot find angular.json`);
    }
    const workspace = JSON.parse(host.read('angular.json')?.toString());

    if (!options.project) {
      options.project = workspace.defaultProject;
    }

    const config = getProjectConfig(host, options.project);

    return chain([
      addDepsToPackageJson(
        {
          '@kikstart-playground/themes': '^1.4.1',
        },
        {},
        true
      ),
      addStyles(options, config),
      tweakPackage,
    ]);
  };
}
