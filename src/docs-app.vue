<template>
  <div id="app" class="h-full">
    <div class="w-full py-24 flex flex-row justify-center min-h-full bg-gray-100 dark:bg-gray-900 transition duration-150">
      <div class="px-6 w-full max-w-screen-lg">

        <!-- title -->
        <div class="flex flex-row justify-center">
          <h1 class="relative font-dm-sans font-bold text-5xl tracking-tighter leading-none text-black dark:text-white transition duration-150">
            Heroicons
            <div class="-mb-8 absolute left-full bottom-full">
              <button class="focus:outline-none" @click="onToggleTheme">
                <icon-render v-if="darkMode && hasSolid" name="HeroIconMoonSolid" class="p-px w-8 h-8" />
                <icon-render v-else-if="darkMode" name="HeroIconMoonOutline" class="p-px w-8 h-8" />
                <icon-render v-else-if="hasSolid" name="HeroIconSunSolid" class="p-px w-8 h-8" />
                <icon-render v-else name="HeroIconSunOutline" class="p-px w-8 h-8" />
              </button>
            </div>
          </h1>
        </div>

        <div class="h-6"></div>

        <!-- Slogn -->
        <h2 class="-mx-px text-center font-medium text-xl text-gray-800 dark:text-gray-100 leading-relaxed transition duration-150">
          A set of free MIT-licensed high-quality SVG icons for Vue.js development.
        </h2>

        <div class="h-6"></div>

        <!-- install -->
        <div class="text-center">
          <div
            class="inline-block rounded bg-gray-900 text-gray-300 px-4 py-2 inline-flex flex-row justify-start items-center focus:outline-none dark:bg-black"
            id="clipboard-copy-action"
            data-clipboard-text="npm i @bytegem/vue-heroicons -S"
          >
            <HeroIconCheveronRightOutline class="w-4 h-4 mr-1" />
            <span class=" font-medium text-sm">npm i @bytegem/vue-heroicons -S</span>
            <HeroIconDocumentDuplicateOutline class="w-4 h-4 ml-6 text-gray-400 cursor-pointer" />
          </div>
        </div>

        <div class="h-6"></div>

        <!-- Using codes -->
        <div class="text-center">
          <pre class="rounded inline-block bg-gray-900 text-gray-300 px-4 whitespace-pre-line text-left dark:bg-black">
            <code class="hljs language-js">
              import Vue from 'vue';
              import Heroicons from '@bytegem/vue-heroicons';

              Vue.use(Heroicons);
            </code>
          </pre>
        </div>

        <div class="h-12"></div>

        <!-- Buttons -->
        <div class="flex flex-col xs:flex-row justify-center">
          <!-- Icon repo -->
          <a href="https://github.com/refactoringui/heroicons" target="_blank" rel="noopener noreferrer" class="px-6 py-4 flex flex-row justify-center items-center text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-lg-xl focus:outline-none shadow focus:shadow-outline transition duration-150">
            <p class="font-medium text-lg">Design Icons</p>
            <icon-render name="HeroIconChartPieSolid" class="ml-3 -mt-1 w-6 h-6 text-black dark:text-white transition duration-150" />
          </a>

          <div class="w-3"></div>

          <!-- The package repo -->
          <a href="https://github.com/bytegem/vue-heroicons" target="_blank" rel="noopener noreferrer" class="px-6 py-4 flex flex-row justify-center items-center text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-lg-xl focus:outline-none shadow focus:shadow-outline transition duration-150">
            <p class="font-medium text-lg">Star on GitHub</p>
            <svg viewBox="0 0 16 16" fill="currentColor" class="ml-3 -mt-1 w-6 h-6 text-black dark:text-white transition duration-150"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
          </a>
        </div>

        <div class="h-6"></div>

        <!-- Searchable -->
        <div class="sticky top-0 z-40">
          <div class="-mx-2 -mb-8 px-2 bg-gray-100 dark:bg-gray-900 transition duration-150" style="height: calc(3.5rem);"></div>
          <div class="relative flex flex-row justify-between h-16 text-xl">
            <div class="-mx-2 px-6 pr-2 flex flex-row items-center rounded-l-lg-xl focus:outline-none z-10 pointer-events-none">
              <div class="px-2">
                <icon-render class="w-6 h-6 text-gray-400 dark:text-gray-600 transition duration-150" name="HeroIconSearchOutline" />
              </div>
            </div>
            <div class="absolute inset-0">
              <div class="h-full rounded-lg-xl dark:shadow-md transition duration-150">
                <input class="w-full h-full text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-lg-xl outline-none shadow dark:shadow-md focus:shadow-outline transition duration-150" type="text" placeholder="Search 150 icons (Press &quot;/&quot; to focus)" style="padding: 0px 8rem 0px 4.5rem;" v-model.trim="keywords">
              </div>
            </div>
            <div class="-mx-2 px-6 flex flex-row rounded-r-lg-xl focus:outline-none focus:shadow-outline z-10 transition duration-150">
              <!-- Has solid -->
              <button class="px-2 focus:outline-none" @click="onToggleSolid">
                <icon-render v-if="hasSolid" name="HeroIconCursorClickSolid" class="w-6 h-6 text-gray-800 dark:text-gray-200 transition duration-150" />
                <icon-render v-else name="HeroIconCursorClickOutline" class="w-6 h-6 text-gray-800 dark:text-gray-200 transition duration-150" />
              </button>

              <!-- Theme Toggle -->
              <button class="px-2 focus:outline-none" @click="onToggleTheme">
                <icon-render v-if="darkMode && hasSolid" name="HeroIconMoonSolid" class="w-6 h-6 text-gray-800 dark:text-gray-200 transition duration-150" />
                <icon-render v-else-if="darkMode" name="HeroIconMoonOutline" class="w-6 h-6 text-gray-800 dark:text-gray-200 transition duration-150" />
                <icon-render v-else-if="hasSolid" name="HeroIconSunSolid" class="w-6 h-6 text-gray-800 dark:text-gray-200 transition duration-150" />
                <icon-render v-else name="HeroIconSunOutline" class="w-6 h-6 text-gray-800 dark:text-gray-200 transition duration-150" />
              </button>
            </div>
          </div>
        </div>

        <div class="h-6"></div>

        <!-- Icons Grid -->
        <div class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          <div class="pb-1/1 relative" v-for="icon in selectedIcons" :key="icon">
            <div class="absolute inset-0">
              <button
                class="p-3 flex flex-row justify-center items-center w-full h-full text-gray-800 dark:text-gray-100 hover:text-gray-100 bg-white dark:bg-gray-800 hover:bg-indigo-500 rounded-lg-xl focus:outline-none shadow focus:shadow-outline transition duration-150"
                id="clipboard-copy-action"
                :data-clipboard-text="`<${icon} />`"
              >
                <icon-render class="w-8 h-8" :name="icon" />
                <div class="p-2 absolute inset-0 flex flex-row justify-center items-end">
                  <p id="clipboard-tip" class="text-center font-ibm-plex-mono font-semibold text-sm leading-snug">
                    {{ icon | formatIconName }}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import 'highlight.js/styles/github.css';
import hljs from 'highlight.js';
import ClipboardJS from 'clipboard';
import { IconRender, IconsNamesMinix } from './icon-render';

function getIconName(name) {
  return name.replace('HeroIcon', '').replace(/(Outline|Solid)$/, '');
}

export default {
  filters: {
    formatIconName: getIconName,
  },
  mixins: [ IconsNamesMinix ],
  components: { IconRender },
  data() {
    return {
      darkMode: false,
      hasSolid: false,
      keywords: '',
    };
  },
  computed: {
    solidIcons() {
      return this.icons.filter(name => new RegExp(/^HeroIcon(\w+)(Solid)$/).test(name));
    },
    outlineIcons() {
      return this.icons.filter(name => new RegExp(/^HeroIcon(\w+)(Outline)$/).test(name));
    },
    selectedIcons() {
      let icons = this.hasSolid ? this.solidIcons : this.outlineIcons;
      if (!!this.keywords) {
        return icons.filter(name => {
          return getIconName(name).toLowerCase().search(this.keywords.toLowerCase()) >= 0;
        });
      }

      return icons;
    }
  },
  mounted() {
    const clipboard = new ClipboardJS('#clipboard-copy-action');
    clipboard.on('success', function (e) {
      e.clearSelection();
      const tip = e.trigger.querySelector('#clipboard-tip');
      if (!tip) {
        return;
      }
      const value = tip.textContent;
      tip.textContent = "Copied!";
      setTimeout(() => {
        tip.textContent = value;
      }, 1500);
    });
    hljs.initHighlightingOnLoad();
  },
  methods: {
    onToggleTheme() {
      if (this.darkMode) {
        this.darkMode = false;
        document.body.classList.remove('dark-mode');
        return;
      }
      this.darkMode = true;
      document.body.classList.add('dark-mode');
    },
    onToggleSolid() {
      if (this.hasSolid) {
        this.hasSolid = false;
        return;
      }
      this.hasSolid = true;
    }
  }
}
</script>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

.-text-px { font-size: 0.9375rem; } /* 15px */
.text-px  { font-size: 1.0625rem; } /* 17px */

.hljs {
  /* background-color: transparent; */
  @apply bg-transparent;
  @apply text-gray-300;
}
.hljs-keyword {
  @apply text-red-500;
}
.hljs-string {
  @apply text-yellow-800;
}
</style>