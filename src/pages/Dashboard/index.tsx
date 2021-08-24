import {
 Box, Flex, Grid, Text,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import { SearchBox } from '../../components/Form/Searchbox';
import { useTasks } from '../../contexts/TaskContext';
import { useAuth } from '../../contexts/AuthContext';

export const Dashboard = () => {
  const { tasks, loadTasks } = useTasks();

  const { user, accessToken } = useAuth();

  useEffect(() => {
    loadTasks(user.id, accessToken);
  }, []);

  return (
    <Box>
      <Header />
      <SearchBox />
      <Grid w="100%" templateColumns="repeat(3,1fr)" gap={10} paddingX="8" mt="8">
        {tasks.map((task) => (
          <Card task={task} key={task.id} />
        ))}
      </Grid>
    </Box>
  );
};
