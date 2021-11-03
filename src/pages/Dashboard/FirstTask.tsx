import {
 Box, Center, Text, Heading, Button, useDisclosure,
} from '@chakra-ui/react';
import { FaClipboard } from 'react-icons/fa';
import { Header } from '../../components/Header';
import { ModalCreateTask } from '../../components/Modal/ModalCreateTask';

export const FirstTask = () => {
  const { onClose: onCreateClose, onOpen: onCreateOpen, isOpen: isCreateopen } = useDisclosure();

  return (
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
  );
};
