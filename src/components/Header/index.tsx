import {
 Box, Center, Flex, Heading, Image,
} from '@chakra-ui/react';
import { FaTh } from 'react-icons/fa';
import Logo from '../../assets/logo-min.svg';
import { theme } from '../../styles/theme';

export const Header = () => (
  <Flex
    w="100%"
    borderBottom="1px"
    borderBottomColor="#f5f5f5"
    justify="space-between"
    paddingX="8"
    paddingY="2"
  >
    <Flex align="center">
      <Image src={Logo} />
      <Heading ml="4" size="lg">
        Dashboard
      </Heading>
    </Flex>

    <Center as="button" fontSize="2rem">
      <FaTh color={theme.colors.gray[300]} />
    </Center>
  </Flex>
);
