import {
 Flex, Heading, Text, Button, Box, Image,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import NotFoundImg from '../../assets/notfound.svg';
import { useAuth } from '../../contexts/AuthContext';

export const NotFound = () => {
  const history = useHistory();
  return (
    <Flex
      height={['auto', 'auto', '100vh', '100vh']}
      justifyContent="space-evenly"
      alignItems="center"
      flexDirection={['column-reverse', 'column-reverse', 'row', 'row']}
      padding={['10px 15px', '10px 15px', '0px', '0px']}
    >
      <Box mt="4">
        <Heading>Ooops!</Heading>
        <Text mt="4">
          Não encontramos a página que você procurou,
          <br />
          <b> vamos tentar novamente </b>
        </Text>
        <Button
          onClick={() => history.push('/')}
          bg="red.600"
          h="60px"
          color="white"
          w="100%"
          mt="4"
          _hover={{ background: 'red.700' }}
        >
          Ir para as minhas tarefas
        </Button>
      </Box>
      <Image src={NotFoundImg} />
    </Flex>
  );
};
