# Heroicons for Vue.js - Free, Open source icons

A set of free MIT-licensed high-quality SVG icons for Vue.js development.

<img src=".github/social.png" width="100%" />

[Live Demos](https://bytegem.github.io/vue-heroicons/) | [Heroicons SVG source](https://github.com/refactoringui/heroicons)

## Install

- npm
    ```bash
    npm i @bytegem/vue-heroicons -S
    ```
- yarn
    ```bash
    yarn add @bytegem/vue-heroicons
    ```

## Using

Global register components：

```es6
import Vue from 'vue';
import Heroicons from '@bytegem/vue-heroicons';

Vue.use(Heroicons /* , options */);
```

### Options

| Key | Desc |
|----|----|
| `compomnents` | Vue Components. You can only register part of the Heroicons icon component globally or a custom Vue component. |
| `removePrefix` | Used to remove the `Heroicons` prefix from the component name. |
| `onlySolid` | Register only **solid** style icon components. |
| `onlyOutline` | Register only **outline** style icon components. |

> Only one of them can be set for `onlysolid` and `onlyoutline` selection, otherwise unexpected registration will occur

### Only using single Icon to Vue Component

```es6
import { HeroiconsAnnotationOutline } from '@bytegem/vue-heroicons';

export default {
    components: { HeroiconsAnnotationOutline }
};
```

## Example

```vue
<HeroiconsAnnotationOutline />
```

Or

```vue
<heroicons-annotation-outline />
```

## Package sizes

| size | gzip |
|:----:|:----:|
| 219.3 kB | 39.9 kB |

## LICENSE

The [MIT](LICENSE) license
