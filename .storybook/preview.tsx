import React from "react";
import type { Preview, Decorator } from "@storybook/react";
import "../src/styles/global.css";

/** Wraps every story in a surface that honours the dark/light global. */
const withSurface: Decorator = (Story, context) => {
  const isDark = context.globals["theme"] === "dark";
  return (
    <div
      className={isDark ? "dark" : ""}
      style={{
        minHeight: "100vh",
        background: isDark ? "#111111" : "#fbfbfb",
        color: isDark ? "#e8e8e8" : "#0f172a",
      }}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withSurface],

  globalTypes: {
    theme: {
      description: "Global theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark",  title: "Dark",  icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        popup: {
          name: "Extension Popup (360)",
          styles: { width: "360px", height: "600px" },
        },
        options: {
          name: "Options Page (1280)",
          styles: { width: "1280px", height: "900px" },
        },
        mobile: {
          name: "Mobile (375)",
          styles: { width: "375px", height: "812px" },
        },
      },
    },
  },
};

export default preview;
