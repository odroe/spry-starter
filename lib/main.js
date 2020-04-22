import * as icons from './icons';
export * from './icons';

function install(Vue) {
  console.log(222);
  for (var name in icons) {
    // console.log(icons[name]);
    Vue.component('HeroIcon' + name, icons[name]);
  }
}

export default {
  install,
};
