import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Progress,
  Text,
  BoxProps,
  ScaleFade,
} from '@chakra-ui/react';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useTasks } from '../../contexts/TaskContext';
import { theme } from '../../styles/theme';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface CardProps extends BoxProps {
  task: Task;
}

export const Card = ({ task, ...rest }: CardProps) => {
  const { updateTask, deleteTask } = useTasks();
  const { accessToken, user } = useAuth();

  return (
    <ScaleFade>
      <Box
        borderWidth="1px"
        borderColor="#f2f2f2"
        boxShadow="lg"
        minW="420px"
        padding="7"
        {...rest}
      >
        <Flex justify="space-between">
          <Heading as="h1" size="md">
            {task.title}
          </Heading>
          <HStack spacing="4">
            <Center
              as="button"
              w="30px"
              h="30px"
              borderWidth="1px"
              borderRadius="5px"
              borderColor="gray.200"
              onClick={() => deleteTask(task.id, accessToken)}
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
          </HStack>
        </Flex>
        <Box w="100%" mt="2">
          <Text>{task.description}</Text>
          <Progress
            colorScheme="purple"
            mt="1"
            value={task.completed ? 100 : 10}
            bgColor="gray.100"
          />
          <Text color="gray.200" mt="3">
            07 march 2021
          </Text>
        </Box>
      </Box>
    </ScaleFade>
  );
};
