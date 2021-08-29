import {
 Box, Button, Heading, Text, VStack,
} from '@chakra-ui/react';
import {
 DeepMap, FieldError, FieldValues, UseFormRegister,
} from 'react-hook-form';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { Input } from '../../components/Form/Input';

interface FormProps {
  handleSignup: () => void;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<FieldValues>;
  loading: boolean;
}

export const SignupForm = ({
 handleSignup, errors, register, loading,
}: FormProps) => (
  <Box
    mt={['4', '4', '0']}
    width={['100%', '100%', '40%', '40%']}
    padding="30px 15px"
    border="3px solid"
    borderColor="gray.100"
    as="form"
    bg="white"
    color="gray.800"
    onSubmit={handleSignup}
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
        background: 'purple.900',
      }}
      isLoading={loading}
    >
      Finalizar cadastro
    </Button>
  </Box>
);
