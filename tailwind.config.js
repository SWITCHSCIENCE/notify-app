import { join } from "path";

import forms from "@tailwindcss/forms";
import { skeleton } from "@skeletonlabs/tw-plugin";
import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";

export default {
  darkMode: "class",
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    join(
      require.resolve("@skeletonlabs/skeleton"),
      "../**/*.{html,js,svelte,ts}"
    ),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    forms,
    skeleton({
      themes: {
        preset: [
          {
            name: "skeleton",
            enhancements: true,
          },
        ],
      },
    }),
    iconsPlugin({
      collections: getIconCollections(["pajamas:archive"]),
    }),
  ],
};
