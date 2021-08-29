import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Center,
  Flex,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { theme } from '../../styles/theme';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Menu = ({ isOpen, onClose }: MenuProps) => {
  const { user, signOut } = useAuth();
  return (
    <>
      {isOpen && (
        <Drawer onClose={onClose} placement="top" isOpen={isOpen}>
          <DrawerOverlay mt={['14vh', '10vh']} />
          <DrawerContent ml="auto" mt="80px" w={['450px', '350px']}>
            <DrawerHeader color="gray.300" borderBottomWidth="1px" borderColor="gray.50">
              {user.name}
            </DrawerHeader>
            <DrawerBody>
              <Flex align="center" onClick={signOut} _hover={{ cursor: 'pointer' }}>
                <Center w="60px" h="60px" bg="red.500" fontSize="2xl" borderRadius="md">
                  <FiLogOut color={theme.colors.white} />
                </Center>
                <Box ml="4">
                  <Heading as="h2" fontSize="lg">
                    {' '}
                    Sair da minha conta
                  </Heading>
                  <Text color="gray.200" fontSize="small">
                    {' '}
                    Sair da minha conta agora
                  </Text>
                </Box>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
