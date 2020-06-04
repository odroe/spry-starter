const path = require('path');
const fs = require('fs-extra');

const root = path.resolve(__dirname, '..');
const lib = (...p) => path.resolve(root, 'lib', ...p);

// clean output
try {
  fs.unlinkSync(lib());
} catch(e) {}

// Copy template
const template = path.resolve(__dirname, '.vue-2-components-generator', 'template');
fs.copySync(template, lib());

// built SVGs to vue components
const camelcase = require('camelcase');
const SVGsSource = (...p) => path.resolve(root, 'node_modules', 'heroicons', ...p);

function builder(type) {
  // make icons dir
  if (!fs.existsSync(lib('icons'))) {
    fs.mkdirSync(lib('icons'));
  }
  if (!fs.existsSync(lib('icons', type))) {
    fs.mkdirSync(lib('icons', type));
  }

  let index = [];

  fs.readdirSync(SVGsSource(type))
    .map(p => SVGsSource(type, p))
    .forEach(file => {
      const basename = camelcase(path.basename(file, 'svg'), { pascalCase: true });
      const fullname = `Heroicons${basename}${camelcase(type, { pascalCase: true })}`;
      
      const output = name => lib('icons', type, name);

      fs.writeFileSync(output(fullname + '.vue'), `
<template>
${fs.readFileSync(file)}
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "${fullname}"
})
</script>
      `);

      index.push(fullname);
    });

    fs.writeFileSync(
      lib('icons', type, 'index.ts'),
      index.map(name => `export { default as ${name} } from "./${name}.vue";`)
           .join("\r\n")
    );
}

builder('solid');
builder('outline');
