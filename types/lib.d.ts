import { AsyncComponent, Component } from "vue";

export interface HeroiconsPluginOptions {
  components?: { [key: string]: Component | AsyncComponent };
  removePrefix?: boolean;
  onlySolid?: boolean;
  onlyOutline?: boolean
}
