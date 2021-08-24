import {
 Box, Flex, Grid, Skeleton, Text, useStyleConfig,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import { SearchBox } from '../../components/Form/Searchbox';
import { useTasks } from '../../contexts/TaskContext';
import { useAuth } from '../../contexts/AuthContext';
import { CardSkeleton } from '../../components/Skeleton/CardSkeleton';

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { tasks, loadTasks } = useTasks();

  const { user, accessToken } = useAuth();

  useEffect(() => {
    loadTasks(user.id, accessToken).then((res) => setLoading(false));
  }, []);

  return (
    <Box>
      <Header />
      <SearchBox />
      <Grid w="100%" templateColumns="repeat(3,1fr)" gap={10} paddingX="8" mt="8">
        {loading ? (
          <CardSkeleton repeatCount={9} />
        ) : (
          tasks.map((task) => <Card task={task} key={task.id} />)
        )}
      </Grid>
    </Box>
  );
};
