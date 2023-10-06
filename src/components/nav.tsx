/* eslint-disable formatjs/no-literal-string-in-jsx */
import {
  Box,
  Button,
  HStack,
  Heading,
  Hide,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import {
  ChevronDownIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { signIn, signOut, useSession } from "next-auth/react";
import NextLink from "next/link";

const Nav = () => {
  const { data } = useSession();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleSignIn = () => {
    void signIn("google");
  };

  const handleSignOut = () => {
    void signOut();
  };

  return (
    <Box
      zIndex="overlay"
      w="full"
      bg={colorMode === "light" ? "accent.500" : "secondary.800"}
    >
      <HStack
        as={List}
        justifyContent="space-between"
        maxW="8xl"
        mx="auto"
        p="4"
      >
        {/* Left */}
        <HStack as={ListItem} alignItems="center">
          <Heading as="h1" mr="5" size="xl">
            <FormattedMessage id="APP_NAME" />
          </Heading>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="ghost"
            >
              Games
            </MenuButton>
            <MenuList>
              {/* <MenuItem>Wordel</MenuItem> */}
              <MenuItem as={NextLink} href="/games/spelling-boa">
                Spelling Boa
              </MenuItem>
              {/* <MenuItem>Letter Squared</MenuItem> */}
              {/* <MenuItem>Crossyword</MenuItem> */}
              {/* <MenuItem>Find-A-Word</MenuItem> */}
              {/* <MenuItem>Quick Mafs</MenuItem> */}
            </MenuList>
          </Menu>
        </HStack>
        {/* Right */}
        <HStack as={ListItem}>
          <Hide above="md">
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Menu"
                icon={<HamburgerIcon />}
                variant="ghost"
              />
              <MenuList>
                <MenuItem onClick={data ? handleSignOut : handleSignIn}>
                  {data ? "Sign out" : "Sign in"}
                </MenuItem>
                <MenuItem
                  icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
                  onClick={toggleColorMode}
                >
                  Toggle Mode
                </MenuItem>
              </MenuList>
            </Menu>
          </Hide>
          <Hide below="md">
            <Button
              onClick={data ? handleSignOut : handleSignIn}
              variant="ghost"
            >
              {data ? "Sign out" : "Sign in"}
            </Button>
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
              onClick={toggleColorMode}
              variant="ghost"
            />
          </Hide>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Nav;
