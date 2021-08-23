import {
 Box, Button, Center, Flex, useDisclosure,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { theme } from '../../styles/theme';
import { ModalCreateTask } from '../Modal/ModalCreateTask';
import { Input } from './Input';

export const SearchBox = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ModalCreateTask isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Flex mt="6" w="100%" paddingX="8" paddingY="2">
        <Flex>
          <Input
            placeholder="Pesquisar por tarefa"
            name="search"
            _focus={{
              backgroundColor: 'gray.100',
            }}
            w="35vw"
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
          Adicionar nova tarefa
        </Button>
      </Flex>
    </>
  );
};
