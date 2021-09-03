import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  Text,
  useDisclosure,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaClipboard } from 'react-icons/fa';
import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import { SearchBox } from '../../components/Form/Searchbox';
import { useTasks } from '../../contexts/TaskContext';
import { useAuth } from '../../contexts/AuthContext';
import { CardSkeleton } from '../../components/Skeleton/CardSkeleton';
import { ModalTaskDetail } from '../../components/Modal/ModalTaskDetail';
import { ModalCreateTask } from '../../components/Modal/ModalCreateTask';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [actualTask, setActualTask] = useState({} as Task);

  const {
 tasks, loadTasks, notFound, taskNotFound,
} = useTasks();

  const { user, accessToken } = useAuth();

  useEffect(() => {
    loadTasks(user.id, accessToken).then((res) => setLoading(false));
  }, []);

  const { onClose: onDetailClose, onOpen: onDetailOpen, isOpen: isDetailOpen } = useDisclosure();
  const { onClose: onCreateClose, onOpen: onCreateOpen, isOpen: isCreateopen } = useDisclosure();

  const handleClick = (task: Task) => {
    setActualTask(task);
    onDetailOpen();
  };

  if (notFound) {
    return (
      <>
        <ModalTaskDetail task={actualTask} onClose={onDetailClose} isOpen={isDetailOpen} />
        <Header />

        <SearchBox />

        <Center mt="4" textAlign="center" display="flex" flexDir="column">
          <Heading size="lg"> Não encontramos resultados para:</Heading>
          <Text fontSize="xl" color="gray.300" fontWeight="bold">
            {taskNotFound}
          </Text>
          <Box mt="6" w={['80%', '40%']} padding="6" boxShadow="lg" bg="white">
            <Stack maxW="80%">
              <Skeleton startColor="gray.100" endColor="gray.200" height="20px" />
              <Skeleton startColor="gray.100" endColor="gray.200" height="20px" w="75%" />
            </Stack>
            <Stack mt="8">
              <Skeleton startColor="gray.100" endColor="gray.200" height="20px" />
              <Skeleton startColor="gray.100" endColor="gray.200" height="20px" />
            </Stack>
          </Box>
        </Center>
      </>
    );
  }

  return (
    <>
      <ModalTaskDetail task={actualTask} onClose={onDetailClose} isOpen={isDetailOpen} />

      {tasks.length === 0 && !loading ? (
        <>
          <ModalCreateTask isOpen={isCreateopen} onClose={onCreateClose} />
          <Header />
          <Box
            mt="4"
            w="90vw"
            paddingY="16"
            ml="5vw"
            justifyContent="center"
            textAlign="center"
            borderWidth="2px"
            borderColor="gray.200"
            borderStyle="dashed"
          >
            <Center fontSize="5xl">
              <FaClipboard color="#bdbdbd" />
            </Center>
            <Heading mt="4" as="h1" fontSize="2xl">
              Vamos criar sua primeira tarefa
            </Heading>
            <Text mt="6">
              Insira sua meta e mostre a você mesmo sua
              <br />
              capacidade em cumprir
              <b> suas atividades </b>
            </Text>

            <Button
              padding="6"
              mt="6"
              bgColor="purple.800"
              color="white"
              _hover={{ bg: 'purple.900' }}
              onClick={onCreateOpen}
            >
              Criar sua primeira tarefa
            </Button>
          </Box>
        </>
      ) : (
        <Box>
          <Header />

          <SearchBox />
          <Grid
            w="100%"
            templateColumns="repeat(auto-fill, minmax(420px, 1fr))"
            gap={10}
            paddingX={['6', '6', '8']}
            mt="8"
          >
            {loading ? (
              <CardSkeleton repeatCount={6} />
            ) : (
              tasks.map((task) => (
                <Card onClick={() => handleClick(task)} task={task} key={task.id} />
              ))
            )}
          </Grid>
        </Box>
      )}
    </>
  );
};
