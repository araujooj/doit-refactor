import { Box, Grid } from '@chakra-ui/react';
import { Card } from '../../components/Card';
import { SearchBox } from '../../components/Form/Searchbox';
import { Header } from '../../components/Header';
import { CardSkeleton } from '../../components/Skeleton/CardSkeleton';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  handleClick: (task: Task) => void;
}

export const TaskList = ({ tasks, loading, handleClick }: TaskListProps) => (
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
        tasks.map((task) => <Card onClick={() => handleClick(task)} task={task} key={task.id} />)
      )}
    </Grid>
  </Box>
);
