import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { FaTh } from 'react-icons/fa';
import Logo from '../../assets/logo-min.svg';
import { theme } from '../../styles/theme';
import { Menu } from './Menu';

export const Header = () => {
  const { onToggle, isOpen, onClose } = useDisclosure();

  const isWideVersion = useBreakpointValue({
    base: false,
    sm: true,
  });

  return (
    <>
      <Flex borderBottom="1px" borderBottomColor="#f5f5f5" paddingX="8" paddingY="2">
        <Flex align="center">
          <Image src={Logo} />
          {isWideVersion && (
            <Heading ml="4" size="lg">
              Dashboard
            </Heading>
          )}
        </Flex>

        <Center ml="auto" onClick={onToggle} as="button" fontSize="2rem">
          <FaTh color={theme.colors.gray[300]} />
        </Center>
      </Flex>
      <Menu isOpen={isOpen} onClose={onClose} />
    </>
  );
};
