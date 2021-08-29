import {
 Box, Button, Center, Flex, useBreakpointValue, useDisclosure,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { useTasks } from '../../contexts/TaskContext';
import { theme } from '../../styles/theme';
import { ModalCreateTask } from '../Modal/ModalCreateTask';
import { Input } from './Input';

interface SearchData {
  title: string;
}

export const SearchBox = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { searchTasks } = useTasks();
  const { accessToken } = useAuth();

  const { register, handleSubmit } = useForm();

  const handleSearch = ({ title }: SearchData) => searchTasks(title, accessToken);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <>
      <ModalCreateTask isOpen={isOpen} onClose={onClose} />
      <Flex mt="6" w="100%" paddingX={['4', '8']} paddingY="2">
        <Flex as="form" onSubmit={handleSubmit(handleSearch)}>
          <Input
            placeholder="Pesquisar por tarefa"
            _focus={{
              backgroundColor: 'gray.100',
            }}
            w="35vw"
            {...register('title')}
          />
          <Center
            as="button"
            ml="2"
            w="64px"
            h="60px"
            bg="purple.600"
            fontSize="2xl"
            borderRadius="8px"
          >
            <FaSearch color={theme.colors.white} />
          </Center>
        </Flex>
        <Button
          bg="purple.500"
          color="white"
          paddingX="16"
          ml="4"
          h="60px"
          borderRadius="8px"
          _hover={{
            background: 'purple.600',
          }}
          onClick={onOpen}
        >
          {isWideVersion ? 'Adicionar uma nova tarefa' : 'Nova tarefa'}
        </Button>
      </Flex>
    </>
  );
};
