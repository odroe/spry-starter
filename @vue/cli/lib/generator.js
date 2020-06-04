const path = require('path');
const fs = require('fs-extra');

function getIconBasename(filename) {
  return path.basename(filename, '.svg')
    .replace('_', '-');
}

function getIconName(filename) {
  return 'Heroicons' + getIconBasename(filename).split('-').map(value => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }).join('');
}

const vueTemplate = (svg, name) => `
<template>
${svg} 
</template>
<script>
export default {
  name: '${name}'
}
</script>
`;

module.exports = context => () => {
  const lib = (...p) => path.resolve(context, 'lib', ...p);
  const source = (...p) => path.resolve(context, 'node_modules', 'heroicons', ...p);

  const outline = fs.readdirSync(source('outline')).map(p => source('outline', p));
  const solid = fs.readdirSync(source('solid')).map(p => source('solid', p));

  fs.removeSync(lib('icons'));
  fs.mkdirSync(lib('icons'));

  function generator(files, type) {
    files.forEach(file => {
      const template = fs.readFileSync(file).toString().trim();
      const iconName = getIconName(file) + type;
      fs.writeFileSync(
        lib('icons', `${iconName}.vue`),
        vueTemplate(template, iconName).trim(),
      );
    });
  }

  generator(outline, 'Outline');
  generator(solid, 'Solid');

  const names = [...new Set([
    ...outline.map(p => getIconName(p) + 'Outline'),
    ...solid.map(p => getIconName(p) + 'Solid'),
  ])];

  const iconsIndexFile = names.map(name => {
    return `import ${name} from './${name}.vue';`;
  }).join('\r\n')
    + `\r\nexport {\r\n`
    + names.map(name => '  ' + name).join(',\r\n')
    + '\r\n};\r\n'
    + '\r\nexport default {\r\n'
    + names.map(name => '  ' + name).join(',\r\n')
    + '\r\n};\r\n\r\n'
  ;

  fs.writeFileSync(
    lib('icons', 'index.js'),
    iconsIndexFile
  );

  const types = (...p) => path.resolve(context, 'types', ...p);

  (() => {
    const components = names.map(name => {
      return `export declare const ${name}: Component;`
    }).join('\r\n');
    const heroiconsComponentsItems = names.map(name => {
      return `  ${name}: Component;`;
    }).join('\r\n');
    const indexTypeFile = `import { PluginFunction, Component } from 'vue';
import { HeroiconsPluginOptions } from './lib';

export { HeroiconsPluginOptions } from './lib';

${components}

export interface HeroiconsComponents {
${heroiconsComponentsItems}
  [key: string]: Component;
}

type VueHeroiconsInstaller = PluginFunction<HeroiconsPluginOptions>;

export interface Heroicons {
  install: VueHeroiconsInstaller;
  icons: HeroiconsComponents;
}

export declare const icons: HeroiconsComponents;

export declare const Heroicons: Heroicons;

export default Heroicons;
    `;
    fs.writeFileSync(
      types('index.d.ts'),
      indexTypeFile
    );
  })();
};
