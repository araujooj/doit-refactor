import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
  icon?: IconType;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
 name, label, icon: Icon, error = null, ...rest
},
  ref,
) => (
  <FormControl isInvalid={!!error}>
    {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

    <InputGroup flexDirection="column">
      {Icon && (
        <InputLeftElement color={error ? 'red.500' : 'gray.200'} mt="1">
          <Icon />
        </InputLeftElement>
      )}

      <ChakraInput
        id={name}
        name={name}
        focusBorderColor="purple.800"
        bg="gray.50"
        variant="outline"
        _hover={{ bgColor: 'gray.100' }}
        _placeholder={{ color: 'gray.200' }}
        size="lg"
        ref={ref}
        {...rest}
      />
      {!!error && <FormErrorMessage color="red.500">{error.message}</FormErrorMessage>}
    </InputGroup>
  </FormControl>
);

export const Input = forwardRef(InputBase);
