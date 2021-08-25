import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { FaExclamation } from 'react-icons/fa';
import { theme } from '../../styles/theme';

interface ModalErrorProps {
  isOpen: boolean;
  onClose: () => void;
  error: string;
}

export const ModalError = ({ isOpen, onClose, error }: ModalErrorProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent bg="white" color="gray.800">
      <ModalHeader display="flex">
        <FaExclamation color={theme.colors.red['500']} />
        <Heading as="h2" size="md">
          Oops!
        </Heading>
      </ModalHeader>
      <ModalCloseButton background="red.500" color="white" _hover={{ background: 'red.600' }} />
      <ModalBody textAlign="center">
        <Text>{error}</Text>
      </ModalBody>
      <ModalFooter>
        <Button
          bg="red.500"
          color="white"
          w="100%"
          onClick={onClose}
          _hover={{ background: 'red.600' }}
        >
          Tentar novamente
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
