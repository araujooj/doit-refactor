import {
  Box,
  Button,
  Center,
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
import {
 FaEnvelope, FaForward, FaLock, FaUser,
} from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import LogoSecondary from '../../assets/logo-secondary.svg';
import { Input } from '../../components/Form/Input';
import { useAuth } from '../../contexts/AuthContext';
import { ModalError } from '../../components/Modal/ModalError';
import { theme } from '../../styles/theme';
import SimpleIcon from '../../assets/simple-icon.svg';
import { api } from '../../services/api';
import { ModalSuccess } from '../../components/Modal/ModalSuccess';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Campo obrigatório!'),
  email: yup.string().email('Email inválido').required('Campo obrigatório!'),
  password: yup.string().min(8, 'Mínimo de 8 dígitos').required('Campo obrigatório'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Senhas diferentes')
    .required('Campo obrigatório'),
});

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const {
    isOpen: isSuccessModalOpen,
    onOpen: onSuccessModalOpen,
    onClose: onSuccessModalClose,
  } = useDisclosure();
  const {
    isOpen: isErrorModalOpen,
    onOpen: onErrorModalOpen,
    onClose: onErrorModalClose,
  } = useDisclosure();

  const handleSignup = ({ name, email, password }: SignUpFormData) => {
    api
      .post('/register', { name, email, password })
      .then((response) => {
        setLoading(false);
        onSuccessModalOpen();
      })
      .catch((err) => onErrorModalOpen());
  };

  const history = useHistory();

  return (
    <>
      <ModalError
        isOpen={isErrorModalOpen}
        onOpen={onErrorModalOpen}
        onClose={onErrorModalClose}
        error="Seu email já está em uso"
      />
      <ModalSuccess
        isOpen={isSuccessModalOpen}
        onOpen={onSuccessModalOpen}
        onClose={onSuccessModalClose}
        onClick={() => history.push('/')}
        message="Seu cadastro deu super certo, vamos lá!"
        buttonMessage="Ir para o login agora"
        secondaryText="Você já pode começar criando <b> suas listas </b> agora mesmo... "
      />

      <Flex
        w="100%"
        h="100vh"
        color="white"
        bgGradient="linear(to-l, purple.800 70%, white 30%)"
        paddingX="10rem"
      >
        <Box
          w="500px"
          as="form"
          onSubmit={handleSubmit(handleSignup)}
          borderRadius="4"
          boxShadow="lg"
          color="gray.800"
          bg="white"
          paddingY="10"
          paddingX="8"
          position="absolute"
          left="12vw"
          mt="12"
        >
          <Heading as="h3" size="lg">
            Crie sua conta
          </Heading>

          <VStack mt="4" spacing={5}>
            <Input
              placeholder="Digite seu nome"
              label="Nome"
              error={errors.name}
              icon={FaUser}
              {...register('name')}
            />
            <Box w="100%">
              <Input
                placeholder="Digite seu email"
                type="email"
                label="Email"
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
            <Input
              type="password"
              placeholder="Confirme sua senha"
              label="Confirmação de senha"
              error={errors.confirm_password}
              icon={FaLock}
              {...register('confirm_password')}
            />
          </VStack>
          <Button
            mt="6"
            type="submit"
            bg="purple.800"
            color="white"
            w="100%"
            h="60px"
            borderRadius="8px"
            _hover={{
              background: 'purple.600',
            }}
            isLoading={loading}
          >
            Finalizar cadastro
          </Button>
        </Box>
        <Box mt="16" ml="65%">
          <Image w="150px" mb="16" src={LogoSecondary} />
          <VStack spacing="14">
            <Flex>
              <Center borderRadius="5px" bg="white" w="40px" h="40px">
                <FaForward color={theme.colors.purple['800']} size={25} />
              </Center>
              <Box ml="4">
                <Heading size="lg"> Agilidade </Heading>
                <Text w="350px">
                  Agilize seus projetos com rapidez e
                  <br />
                  muita performance
                </Text>
              </Box>
            </Flex>
            <Flex>
              <Center borderRadius="5px" bg="white" w="40px" h="40px">
                <Image src={SimpleIcon} w="25px" />
              </Center>
              <Box ml="4">
                <Heading size="lg"> Simplicidade </Heading>
                <Text w="350px">
                  Armazene seus projetos em uma
                  {' '}
                  <br />
                  {' '}
                  interface altamente usual
                </Text>
              </Box>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </>
  );
};
