import * as icons from '@bytegem/vue-heroicons';

export const IconsNamesMinix = {
  computed: {
    icons() {
      let _icons = [];
      for (const key in icons) {
        if (icons.hasOwnProperty(key)) {
          const element = icons[key];
          if (typeof element.name === 'string') {
            _icons.push(element);
          }
        }
      }
      return _icons.filter(component => {
        return new RegExp(/^(HeroIcon)(\w+)(Solid|Outline)$/).test(component.name);
      }).map(component => component.name);
    },
  }
};

export const IconRender = {
  mixins: [IconsNamesMinix],
  props: {
    name: {
      required: true,
      type: String,
    },
  },
  render(h) {
    const { name, ...props } = this.$props;
    return h(name, { props });
  },
};
