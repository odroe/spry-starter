import * as icons from './icons';
export * from './icons';

function install(Vue) {
  for (var name in icons) {
    Vue.component('HeroIcon' + name, icons[name]);
  }
}

export default {
  install,
};
