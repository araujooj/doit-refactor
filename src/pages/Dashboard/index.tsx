import { Box, Text } from '@chakra-ui/react';
import { SearchBox } from '../../components/Form/Searchbox';
import { Header } from '../../components/Header';

export const Dashboard = () => (
  <Box>
    <Header />
    <SearchBox />
    <Text>Dashboard</Text>
  </Box>
);
