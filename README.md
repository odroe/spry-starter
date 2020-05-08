# Heroicons for Vue.js - Free, Open source icons

<img src=".github/social.png" width="100%" />

A set of free MIT-licensed high-quality SVG icons for Vue.js development.

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

```es6
import Vue from 'vue';
import Heroicons from '@bytegem/vue-heroicons';

Vue.use(Heroicons)
```

### Options

| Key | Desc |
|----|----|
| `compomnents` | Vue Components. You can only register part of the Heroicons icon component globally or a custom Vue component. |
| `removePrefix` | Used to remove the `Heroicons` prefix from the component name. |
| `onlySolid` | Register only **solid** style icon components. |
| `onlyOutline` | Register only **outline** style icon components. |

> Only one of them can be set for `onlysolid` and `onlyoutline` selection, otherwise unexpected registration will occur

## Example

```vue
<HeroiconsAnnotationOutline />
```

Or

```vue
<<heroicons-annotation-outline /> />
```

## Package sizes

| name | size | gzip |
|:----|:----:|:----:|
| `heroicons.umd.min.js` | 163.23 KiB | **32.35 KiB** |
| `heroicons.umd.js` | 713.77 KiB | **55.38 KiB** |
| `heroicons.umd.min.js` | 713.38 KiB | **55.29 KiB** |
