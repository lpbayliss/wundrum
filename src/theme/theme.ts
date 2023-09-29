import { extendTheme, type ThemeOverride } from "@chakra-ui/react";
import colors from "./colors";
import semanticTokens from "./semantic-tokens";
import styles from "./styles";
import fonts from "./fonts";
import components from "./components";
import config from "./config";

const overrides: ThemeOverride = {
  colors,
  styles,
  semanticTokens,
  fonts,
  components,
  config,
};

export default extendTheme(overrides);
