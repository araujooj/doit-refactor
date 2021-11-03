import {
 useDisclosure, Center, Heading, Skeleton, Stack, Box, Text,
} from '@chakra-ui/react';
import { SearchBox } from '../../components/Form/Searchbox';
import { Header } from '../../components/Header';
import { ModalTaskDetail } from '../../components/Modal/ModalTaskDetail';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface NotFoundProps {
  actualTask: Task;
  taskNotFound: string;
  onDetailClose: () => void;
  isDetailOpen: boolean;
}

export const NotFound = ({
  actualTask,
  taskNotFound,
  isDetailOpen,
  onDetailClose,
}: NotFoundProps) => (
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
