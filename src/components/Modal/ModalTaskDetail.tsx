import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text,
} from '@chakra-ui/react';
import {
 FaCheck, FaCube, FaTimes, FaTrash, FaUser,
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useTasks } from '../../contexts/TaskContext';
import { theme } from '../../styles/theme';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface ModalErrorProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

export const ModalTaskDetail = ({ isOpen, onClose, task }: ModalErrorProps) => {
  const { updateTask, deleteTask } = useTasks();
  const { accessToken, user } = useAuth();

  const handleDeleteTask = () => {
    deleteTask(task.id, accessToken);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="white" color="gray.800">
        <ModalHeader display="flex" justifyContent="space-between">
          <HStack>
            <Center w="32px" h="32px" bg="purple.500" fontSize="18px" borderRadius="md">
              <FaCube color={theme.colors.white} />
            </Center>
            <Heading mt="1" ml="2" as="h2" size="md">
              Visualizar
            </Heading>
          </HStack>
          <HStack spacing="2">
            <Center
              as="button"
              w="30px"
              h="30px"
              borderWidth="1px"
              borderRadius="5px"
              borderColor="gray.200"
              onClick={handleDeleteTask}
            >
              <FaTrash color={theme.colors.gray[200]} />
            </Center>
            <Center
              as="button"
              w="30px"
              h="30px"
              borderWidth="1px"
              borderRadius="5px"
              borderColor="gray.200"
              onClick={() => updateTask(task.id, accessToken, user.id)}
              bgColor={task.completed ? theme.colors.purple[800] : theme.colors.white}
            >
              <FaCheck color={task.completed ? theme.colors.white : theme.colors.gray[200]} />
            </Center>
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
          </HStack>
        </ModalHeader>

        <ModalBody as="form">
          <Heading as="h1" fontSize="2xl">
            {task.title}
          </Heading>
          <Box mt="4" maxH="240px" overflow="scroll">
            <Text whiteSpace="pre-line">{task.description}</Text>
          </Box>
        </ModalBody>
        <Box padding="6">
          <Progress colorScheme="purple" value={task.completed ? 100 : 10} bgColor="gray.100" />
          <Text color="gray.200" mt="3">
            07 march 2021
          </Text>
        </Box>
      </ModalContent>
    </Modal>
  );
};
