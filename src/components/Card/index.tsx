import {
 Box, Center, Flex, Heading, HStack, Progress, Text, BoxProps,
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
  onClick: () => void;
}

export const Card = ({ task, onClick, ...rest }: CardProps) => {
  const { updateTask, deleteTask } = useTasks();
  const { accessToken, user } = useAuth();

  return (
    <Box
      cursor="pointer"
      _hover={{
        transform: 'translateY(-7px)',
        borderColor: 'gray.100',
      }}
      transition="border 0.2s, ease 0s, transform 0.2s"
      borderWidth="1px"
      borderColor="gray.50"
      boxShadow="lg"
      padding="7"
      w={['330px', 'auto']}
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
      <Box w="100%" mt="4" onClick={onClick}>
        <Text noOfLines={3}>{task.description}</Text>
        <Progress
          colorScheme="purple"
          mt="2.5"
          value={task.completed ? 100 : 10}
          bgColor="gray.100"
        />
        <Text color="gray.200" mt="3">
          07 march 2021
        </Text>
      </Box>
    </Box>
  );
};
