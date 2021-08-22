import {
 Box, Flex, Heading, Image, Input, Text,
} from '@chakra-ui/react';
import LogoSecondary from '../../assets/logo-secondary.svg';

export const Login = () => (
  <>
    <Flex align="center" justifyContent="space-between" h="100vh" color="white" bg="purple.800">
      <Box ml="32">
        <Image w="150px" mb="4" src={LogoSecondary} />
        <Heading as="h1">O jeito fácil, grátis</Heading>
        <Text>
          Flexível e atrativo de gerenciar
          <Text fontWeight="bold"> seus projetos em uma única plataforma</Text>
        </Text>
      </Box>
      <Box
        borderRadius="4"
        borderColor="#f5f5f5"
        borderWidth="2px"
        w="35%"
        h="60%"
        color="gray.800"
        bg="white"
        mr="15%"
        padding="1.875rem"
      >
        <Heading as="h3" size="lg">
          Bem vindo de volta!
        </Heading>

        <Input
          bg="gray.50"
          color="gray.800"
          _placeholder={{
            color: 'gray.100',
          }}
          placeholder="Digite seu login"
        />
        <Input
          bg="gray.50"
          color="gray.800"
          _placeholder={{
            color: 'gray.100',
          }}
          placeholder="Digite seu login"
        />
      </Box>
    </Flex>
  </>
);
