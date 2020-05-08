const path = require('path');
const fs = require('fs-extra');

function getIconBasename(filename) {
  return path.basename(filename, '.svg')
    .replace('md-', '')
    .replace('sm-', '')
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
  const source = (...p) => path.resolve(context, 'source', 'dist', ...p);

  const outline = fs.readdirSync(source('outline-md')).map(p => source('outline-md', p));
  const solid = fs.readdirSync(source('solid-sm')).map(p => source('solid-sm', p));

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
    + `\r\n\rexport default {\r\n`
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
      return `export type ${name} = Component;`;
    }).join('\r\n');
    const heroiconsComponentsItems = names.map(name => {
      return `  ${name}: ${name};`;
    }).join('\r\n');
    const indexTypeFile = `import { PluginFunction, Component } from 'vue';
import { HeroiconsPluginOptions } from './lib';

export { HeroiconsPluginOptions } from './lib';

${components}

export interface HeroiconsComponents {
${heroiconsComponentsItems}
  [key: string]: Component;
}

type install = PluginFunction<HeroiconsPluginOptions>;

export interface Heroicons {
  install: install;
  icons: HeroiconsComponents;
}

export default Heroicons;
    `;
    fs.writeFileSync(
      types('index.d.ts'),
      indexTypeFile
    );
  })();

  (() => {
    const umdTypeFile = `declare module 'vue-heroicons' {

}
    `;
  })();
};

// module.exports = function() {
  // console.log('📦 Fetching Heroicons...');
  // let cachePath = path.resolve(__dirname, 'cache');
  // let zipPath = path.resolve(cachePath, 'heroicons-master.zip');
  // let unzipPath = path.resolve(cachePath, 'heroicons-master');
  // if (!fs.existsSync(cachePath)) {
  //   fs.mkdirSync(cachePath);
  // }

  // let iconRootPath = path.resolve(__dirname, '../../../lib/icons');
  // if (fs.existsSync(iconRootPath)) {
  //   fs.rmdirSync(iconRootPath, { recursive: true });
  //   fs.mkdirSync(iconRootPath);
  // }

  // if (fs.existsSync(zipPath)) {
  //   fs.unlinkSync(zipPath);
  // }
  // if (fs.existsSync(unzipPath)) {
  //   fs.rmdirSync(unzipPath, { recursive: true });
  // }

  // let writeStream = fs.createWriteStream(zipPath);
  // fetchZip(url, async (chunk) => {
  //   writeStream.write(chunk);
  // }, async () => {
  //   writeStream.close();
  //   console.log('Unzip...');
  //   await extract(zipPath, { dir: cachePath });

  //   // outline
  //   iconPath = path.resolve(iconRootPath, 'outline');
  //   if (!fs.existsSync(iconPath)) {
  //     fs.mkdirSync(iconPath);
  //   }
  //   let _path = path.resolve(unzipPath, 'dist/outline-md');
  //   let _strArr = [];
  //   fs.readdirSync(_path).forEach(name => {
  //     let str = fs.readFileSync(path.resolve(_path, name));
  //     fs.writeFileSync(path.resolve(iconPath, getfilenameBasename(name) + '.vue'), `<template>\r\n${str}</template>`);
  //     _strArr.push(`export { default as ${getClassname(name)}Outline } from './${getfilenameBasename(name)}.vue';`);
  //   });
  //   fs.writeFileSync(path.resolve(iconPath, 'index.js'), _strArr.join("\r\n"));

  //   // solid
  //   iconPath = path.resolve(iconRootPath, 'solid');
  //   if (!fs.existsSync(iconPath)) {
  //     fs.mkdirSync(iconPath);
  //   }
  //   _path = path.resolve(unzipPath, 'dist/solid-sm');
  //   _strArr = [];
  //   fs.readdirSync(_path).forEach(name => {
  //     let str = fs.readFileSync(path.resolve(_path, name));
  //     fs.writeFileSync(path.resolve(iconPath, getfilenameBasename(name) + '.vue'), `<template>\r\n${str}</template>`);
  //     _strArr.push(`export { default as ${getClassname(name)}Solid } from './${getfilenameBasename(name)}.vue';`);
  //   });
  //   fs.writeFileSync(path.resolve(iconPath, 'index.js'), _strArr.join("\r\n"));
  // });
// };
