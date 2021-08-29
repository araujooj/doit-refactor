import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  toast,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import {
 FaArrowLeft, FaEnvelope, FaForward, FaLock, FaUser,
} from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import LogoSecondary from '../../assets/logo-secondary.svg';
import { Input } from '../../components/Form/Input';
import { useAuth } from '../../contexts/AuthContext';
import { ModalError } from '../../components/Modal/ModalError';
import { theme } from '../../styles/theme';
import { api } from '../../services/api';
import { ModalSuccess } from '../../components/Modal/ModalSuccess';
import { SignupInfo } from './SignupInfo';
import { SignupForm } from './SignupForm';
import { GoBackButton } from './GoBackButton';

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

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <>
      <ModalError
        isOpen={isErrorModalOpen}
        onClose={onErrorModalClose}
        error="Seu email já está em uso"
      />
      <ModalSuccess
        isOpen={isSuccessModalOpen}
        onClose={onSuccessModalClose}
        onClick={() => history.push('/')}
        message="Seu cadastro deu super certo, vamos lá!"
        buttonMessage="Ir para o login agora"
        secondaryText="Você já pode começar criando <b> suas listas </b> agora mesmo... "
      />

      {isWideVersion ? (
        <Flex
          height={['auto', 'auto', '100vh', '100vh']}
          justifyContent="center"
          background="purple.800"
          bgGradient={[
            'linear(to-b, purple.800 65%, white 35%)',
            'linear(to-b, purple.800 65%, white 35%)',
            'linear(to-r, white 30%, purple.800 30%)',
            'linear(to-r, white 30%, purple.800 30%)',
          ]}
          alignItems="center"
          padding={['10px 15px', '10px 15px', '0px', '0px']}
          color="white"
        >
          <GoBackButton history={history} top="90" left="25" />

          <Flex
            w={['100%', '100%', '90%', '70%']}
            justifyContent="center"
            flexDirection={['column', 'column', 'row', 'row']}
            alignItems="center"
          >
            <SignupForm
              loading={loading}
              errors={errors}
              handleSignup={handleSubmit(handleSignup)}
              register={register}
            />
            <SignupInfo />
          </Flex>
        </Flex>
      ) : (
        <Flex
          height={['auto', 'auto', '100vh', '100vh']}
          justifyContent="center"
          background="purple.800"
          bgGradient={[
            'linear(to-b, purple.800 65%, white 35%)',
            'linear(to-b, purple.800 65%, white 35%)',
            'linear(to-r, white 30%, purple.800 30%)',
            'linear(to-r, white 30%, purple.800 30%)',
          ]}
          alignItems="center"
          padding={['10px 15px', '10px 15px', '0px', '0px']}
          color="white"
        >
          <GoBackButton history={history} top="10" left="75vw" />
          <Flex
            w={['100%', '100%', '90%', '70%']}
            justifyContent="center"
            flexDirection={['column', 'column', 'row', 'row']}
            alignItems="center"
          >
            <SignupInfo />
            <SignupForm
              loading={loading}
              errors={errors}
              handleSignup={handleSubmit(handleSignup)}
              register={register}
            />
          </Flex>
        </Flex>
      )}
    </>
  );
};
