import icons from './icons';
export * from './icons';

function install(Vue, options = {}) {
  const components = options.components || icons;
  for (const name in components) {
    if (options.onlySolid && name.substr(name.length - 7) === 'Outline') {
      continue;
    } else if (options.onlyOutline && name.substr(name.length - 5) === 'Solid') {
      continue;
    }

    if (options.removePrefix) {
      Vue.component(name.replace('Heroicons', ''), components[name]);
      continue;
    }

    Vue.component(name, components[name]);
  }
}

export { icons };

export const Heroicons = {
  install,
  icons,
};

export default Heroicons;
