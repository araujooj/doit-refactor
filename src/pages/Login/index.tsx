import {
  Box,
  Button,
  Flex,
  Grid,
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
import { useHistory } from 'react-router-dom';
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

  const handleSignIn = async (values: SignInFormData) => {
    setLoading(true);
    signIn(values)
      .then((response) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        onOpen();
      });
  };

  const history = useHistory();

  return (
    <>
      <ModalError isOpen={isOpen} onClose={onClose} error="Seu email ou senha estão incorretos!" />
      <Flex
        height={['auto', 'auto', '100vh', '100vh']}
        justifyContent="center"
        background="purple.800"
        bgGradient={[
          'linear(to-b, purple.800 65%, white 35%)',
          'linear(to-b, purple.800 65%, white 35%)',
          'linear(to-r, purple.800 65%, white 35%)',
          'linear(to-r, purple.800 65%, white 35%)',
        ]}
        alignItems="center"
        padding={['10px 15px', '10px 15px', '0px', '0px']}
        color="white"
      >
        <Flex
          w={['100%', '100%', '90%', '70%']}
          justifyContent="center"
          flexDirection={['column', 'column', 'row', 'row']}
          alignItems="center"
        >
          <Grid w={['100%', '100%', '50%', '50%']} paddingRight="100px">
            <Image
              src={LogoSecondary}
              alt="Do it"
              title="Do it"
              boxSize={['120px', '120px', '150px', '150px']}
            />
            <Heading as="h1">O jeito fácil, grátis</Heading>
            <Text>
              Flexível e atrativo de gerenciar
              <Text fontWeight="bold"> seus projetos em uma única plataforma</Text>
            </Text>
          </Grid>
          <Grid
            mt={['4', '4', '0']}
            width={['100%', '100%', '40%', '40%']}
            padding="30px 15px"
            border="3px solid"
            borderColor="gray.100"
            as="form"
            bg="white"
            color="gray.800"
            onSubmit={handleSubmit(handleSignIn)}
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
                bg="purple.500"
                color="white"
                w="100%"
                h="60px"
                borderRadius="8px"
                _hover={{
                  background: 'purple.600',
                }}
                isLoading={loading}
              >
                Entrar
              </Button>
              <Text>Ainda não possui uma conta?</Text>
              <Button
                onClick={() => history.push('/signup')}
                bg="gray.100"
                color="gray.300"
                w="100%"
                h="60px"
                borderRadius="8px"
                _hover={{
                  background: 'gray.200',
                }}
              >
                Criar conta
              </Button>
            </VStack>
          </Grid>
        </Flex>
      </Flex>
    </>
  );
};
