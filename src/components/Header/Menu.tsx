import {
 Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody,
} from '@chakra-ui/react';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Menu = ({ isOpen, onClose }: MenuProps) => (
  <>
    {isOpen && (
      <Drawer onClose={onClose} placement="top" isOpen={isOpen}>
        <DrawerOverlay h="90vh" mt="10vh" />
        <DrawerContent ml="auto" mt="80px" w={['450px', '350px']}>
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    )}
  </>
);
