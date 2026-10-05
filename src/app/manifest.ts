import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Developer Portfolio",
    short_name: "Portfolio",
    description: "Full Stack Developer Portfolio — Associate Software Engineer",
    start_url: "/",
    display: "standalone",
    background_color: "#090d16",
    theme_color: "#6366f1",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
