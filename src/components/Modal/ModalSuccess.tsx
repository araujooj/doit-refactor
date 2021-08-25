import {
  Button,
  Box,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Center,
} from '@chakra-ui/react';
import { FaExclamation, FaTimes } from 'react-icons/fa';
import { theme } from '../../styles/theme';

interface ModalSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  buttonMessage: string;
  secondaryText: string;
  onClick: () => void;
}

export const ModalSuccess = ({
  isOpen,
  onClose,
  message,
  buttonMessage,
  secondaryText,
  onClick,
}: ModalSuccessProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent padding="2" bg="white" color="gray.800">
      <ModalHeader display="flex">
        <Center w="32px" h="32px" bg="purple.500" fontSize="18px" borderRadius="md">
          <FaExclamation color={theme.colors.white} />
        </Center>
        <Heading mt="1" ml="1.5" as="h2" size="md">
          Yeess...
        </Heading>
        <Center
          as="button"
          onClick={onClose}
          ml="auto"
          w="32px"
          h="32px"
          bg="red.500"
          fontSize="lg"
          borderRadius="md"
        >
          <FaTimes color={theme.colors.white} />
        </Center>
      </ModalHeader>

      <ModalBody textAlign="center">
        <Text>{message}</Text>
      </ModalBody>
      <ModalFooter flexDirection="column">
        <Button
          bg="purple.500"
          color="white"
          w="100%"
          onClick={onClick}
          _hover={{ background: 'purple.600' }}
        >
          {buttonMessage}
        </Button>
        <Text align="center">
          <Box mt="3" color="gray.300" dangerouslySetInnerHTML={{ __html: secondaryText }} />
        </Text>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
