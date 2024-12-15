import { defineConfig } from 'vitepress';

// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
  lang: 'en-US',
  title: 'ReactJS - Main',
  description: 'React Based Workshop - CSA',

  themeConfig: {
    nav: [
      { text: 'ExpressJS', link: '/express' },
      { text: 'MongoDB', link: '/mongo' },
      { text: 'Vercel', link: '/vercel' },
      { text: 'Setup Node', link: '/setup' },

      // {
      //   text: 'Dropdown Menu',
      //   items: [
      //     { text: 'Item A', link: '/item-1' },
      //     { text: 'Item B', link: '/item-2' },
      //     { text: 'Item C', link: '/item-3' },
      //   ],
      // },

      // ...
    ],

    sidebar: [
      {
        // text: 'Guide',
        items: [
          { text: 'ExpressJS', link: '/express.html' },
          { text: 'MongoDB', link: '/mongo.html' },
          { text: 'Vercel', link: '/vercel.html' },
          { text: 'Setup Node', link: '/setup.html' },
          // ...
        ],
      },
    ],
  },
});
