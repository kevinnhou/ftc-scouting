import { type HomeLayoutProps } from "fumadocs-ui/home-layout";
import { Binoculars } from "lucide-react";

export const baseOptions: HomeLayoutProps = {
  nav: {
    title: "Curator",
    transparentMode: "top",
  },
  githubUrl: "https://github.com/kevinnhou/ftc-scouting",
  links: [
    {
      text: "Scout",
      url: "/scout",
      icon: <Binoculars />,
      external: false,
    },
  ],
};
