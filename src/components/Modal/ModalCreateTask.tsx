import {
  Box,
  Button,
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useStyleConfig,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
 FaClipboard, FaExclamation, FaTimes, FaUser,
} from 'react-icons/fa';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { useTasks } from '../../contexts/TaskContext';
import { api } from '../../services/api';
import { theme } from '../../styles/theme';
import { Input } from '../Form/Input';
import { TextArea } from '../Form/TextArea';

interface ModalErrorProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TaskData {
  title: string;
  description: string;
}

const schema = yup.object().shape({
  title: yup.string().required('Campo obrigatório!'),
  description: yup.string().required('Campo obrigatório!'),
});

export const ModalCreateTask = ({ isOpen, onClose }: ModalErrorProps) => {
  const [loading, setLoading] = useState(false);

  const { accessToken, user } = useAuth();
  const { createTask } = useTasks();

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => () => onClose(), [onClose]);

  const handleCreateTask = async (data: TaskData) => {
    const newData = { ...data, userId: user.id, completed: false };
    setLoading(true);

    createTask(newData, accessToken).then((_) => {
      setLoading(false);
      toast({
        title: 'Tarefa criada.',
        description: `Sua tarefa "${data.title}" foi criada com sucesso`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="white" color="gray.800">
        <ModalHeader display="flex">
          <Center w="32px" h="32px" bg="purple.500" fontSize="18px" borderRadius="md">
            <FaClipboard color={theme.colors.white} />
          </Center>
          <Heading mt="1" ml="2" as="h2" size="md">
            Adicionar
          </Heading>
          <Center
            as="button"
            onClick={onClose}
            ml="auto"
            w="32px"
            h="32px"
            bg="red.500"
            fontSize="lg"
            borderRadius="md"
          >
            <FaTimes color={theme.colors.white} />
          </Center>
        </ModalHeader>

        <ModalBody as="form" onSubmit={handleSubmit(handleCreateTask)}>
          <VStack mt="4" spacing={5}>
            <Box w="100%">
              <Input
                placeholder="Digite seu título"
                label="Título"
                error={errors.title}
                {...register('title')}
              />

              {!errors.title && (
                <Text ml="1" mt="2" color="gray.200">
                  Ex: Estudar React- Chakra UI
                </Text>
              )}
            </Box>
            <Box w="100%">
              <TextArea
                placeholder="Digite sua descrição"
                label="Descrição"
                error={errors.description}
                {...register('description')}
              />

              {!errors.description && (
                <Text ml="1" mt="2" color="gray.200">
                  Máximo 100 caracteres
                </Text>
              )}
            </Box>
          </VStack>
          <Button
            mt="6"
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
            Adicionar tarefa
          </Button>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};
