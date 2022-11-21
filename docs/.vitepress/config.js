import { defineConfig } from "vitepress";

export default defineConfig({
  base: "/docs/",
  title: "Netflix Clone",
  lang: "en-US",
  description:
    "Documentation explaining my design decisions and algorithms I used in building the Spotify clone.",
  themeConfig: {
    nav: [
      { text: "General", link: "/" },
      {
        text: "Open Application",
        link: "https://netflix-clone-alvarogfn.vercel.app/",
      },
    ],
    sidebar: [
      {
        text: "Project and Requirements",
        items: [
          { text: "Requirements", link: "/requirements/" },
          { text: "Dependencies", link: "/requirements/dependencies" },
          { text: "Deploying", link: "/requirements/deploying" },
        ],
      },
      {
        text: "Architecture",
        items: [
          { text: "Pain points", link: "/architecture/" },
          { text: "Metrics algorithm", link: "/architecture/metrics" },
          { text: "Indexedb Database", link: "/architecture/database" },
          { text: "Authentication", link: "/architecture/authentication" },
          { text: "Routes", link: "/architecture/routing" },
        ],
      },
      {
        text: "Others",
        items: [],
      },
    ],
  },
});
