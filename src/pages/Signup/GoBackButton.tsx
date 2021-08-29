import { Center, CenterProps } from '@chakra-ui/react';
import { History } from 'history';
import { FaArrowLeft } from 'react-icons/fa';
import { theme } from '../../styles/theme';

interface GoBackButtonProps extends CenterProps {
  top: string;
  left: string;
  history: History;
}
export const GoBackButton = ({
 top, left, history, ...rest
}: GoBackButtonProps) => (
  <Center
    as="button"
    onClick={() => history.push('/')}
    position="absolute"
    top={top}
    left={left}
    w="60px"
    h="60px"
    bg="purple.500"
    fontSize="2xl"
    borderRadius="md"
    _hover={{
      bg: 'purple.600',
    }}
    {...rest}
  >
    <FaArrowLeft color={theme.colors.white} />
  </Center>
);
