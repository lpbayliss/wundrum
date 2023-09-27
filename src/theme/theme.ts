import {
  extendTheme,
  type Theme,
  type ThemeOverride,
} from "@chakra-ui/react";

const overrides: ThemeOverride = {
  styles: {
    global: (_props) => ({
      body: {
        bg: "canvas",
      },
      div: {
        "&::-webkit-scrollbar": {
          display: "none",
        },
      },
    }),
  },
  semanticTokens: {
    colors: {
      canvas: {
        default: "gray.100",
        _dark: "gray.800",
      },
      surface: { default: "white", _dark: "gray.900" },
      subtext: {
        default: "blackAlpha.500",
        _dark: "whiteAlpha.500",
      },
    },
  },
  components: {
    Card: {
      variants: {
        glass: {
          container: {
            bg: "rgba(255,255,255,0.65)",
            backdropFilter: "blur(5px)",
            boxShadow: "sm",
          },
        },
      },
    },
  },
  config: { initialColorMode: "system" }
};

export default extendTheme(overrides) as Theme;
