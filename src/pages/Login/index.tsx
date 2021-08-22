import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  toast,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import LogoSecondary from '../../assets/logo-secondary.svg';
import { Input } from '../../components/Form/Input';
import { useAuth } from '../../contexts/AuthContext';
import { ModalError } from '../../components/Modal/ModalError';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    setLoading(true);
    signIn(values)
      .then((response) => setLoading(false))
      .catch((err) => {
        setLoading(false);
        onOpen();
      });
  };

  return (
    <>
      <ModalError isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Flex
        align="center"
        w="70%"
        justifyContent="space-between"
        h="100vh"
        color="white"
        bg="purple.800"
      >
        <Box ml="32">
          <Image w="150px" mb="4" src={LogoSecondary} />
          <Heading as="h1">O jeito fácil, grátis</Heading>
          <Text>
            Flexível e atrativo de gerenciar
            <Text fontWeight="bold"> seus projetos em uma única plataforma</Text>
          </Text>
        </Box>
        <Box
          as="form"
          onSubmit={handleSubmit(handleSignIn)}
          position="absolute"
          right="8"
          borderRadius="4"
          boxShadow="lg"
          w="30%"
          h="65%"
          color="gray.800"
          bg="white"
          mr="12%"
          padding="1.875rem"
        >
          <Heading as="h3" size="lg">
            Bem vindo de volta!
          </Heading>

          <VStack mt="4" spacing={5}>
            <Box w="100%">
              <Input
                placeholder="Digite seu login"
                type="email"
                label="Login"
                error={errors.email}
                icon={FaEnvelope}
                {...register('email')}
              />

              {!errors.email && (
                <Text ml="1" mt="1" color="gray.300">
                  Exemplo: nome@email.com
                </Text>
              )}
            </Box>

            <Input
              type="password"
              placeholder="Digite sua senha"
              label="Senha"
              error={errors.password}
              icon={FaLock}
              {...register('password')}
            />
            <Button
              type="submit"
              bg="purple.800"
              color="white"
              w="100%"
              h="50px"
              borderRadius="8px"
              _hover={{
                background: 'purple.900',
              }}
              isLoading={loading}
            >
              Entrar
            </Button>
            <Text>Ainda não possui uma conta?</Text>
            <Button
              type="submit"
              bg="gray.100"
              color="gray.200"
              w="100%"
              h="50px"
              borderRadius="8px"
              _hover={{
                background: 'gray.50',
              }}
            >
              Criar conta
            </Button>
          </VStack>
        </Box>
      </Flex>
    </>
  );
};
