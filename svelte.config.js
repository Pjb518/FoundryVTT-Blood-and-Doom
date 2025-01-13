import { sveltePreprocess } from 'svelte-preprocess';

const config = {
  compilerOptions: {
    runes: true
  },
  preprocess: sveltePreprocess({
    scss: {
      prependData: '@use "src/scss/base/_variables.scss";'
    },
    typescript: {
      tsconfigFile: './tsconfig.json'
    }
  })
};

export default config;
