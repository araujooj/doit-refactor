import { FieldError } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea as ChakraTextArea,
  TextareaProps as ChakraTextAreaProps,
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react';
import { IconType } from 'react-icons/lib';
import {
 useRef, useState, useCallback, useEffect,
} from 'react';

interface TextareaProps extends ChakraTextAreaProps {
  name: string;
  label?: string;
  error?: FieldError | null;
  icon?: IconType;
}

type inputVariationOptions = {
  [key: string]: string;
};

const inputVariation: inputVariationOptions = {
  error: 'red.500',
  default: 'gray.200',
  focus: 'purple.800',
  filled: 'green.500',
};

export const TextArea = ({
 name, label, icon: Icon, error = null, ...rest
}: TextareaProps) => {
  const [variation, setVariation] = useState('default');

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (error) {
      return setVariation('error');
    }
  }, [error]);

  const handleInputFocus = useCallback(() => {
    if (!error) {
      setVariation('focus');
    }
  }, [error]);

  const handleInputBlur = useCallback(() => {
    if (inputRef.current?.value && !error) {
      return setVariation('filled');
    }
  }, [error]);

  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <InputGroup flexDirection="column">
        {Icon && (
          <InputLeftElement color={inputVariation[variation]} mt="2.5">
            <Icon />
          </InputLeftElement>
        )}

        <ChakraTextArea
          id={name}
          name={name}
          onBlurCapture={handleInputBlur}
          onFocus={handleInputFocus}
          borderColor={inputVariation[variation]}
          color={inputVariation[variation]}
          bg="gray.50"
          variant="outline"
          _hover={{ bgColor: 'gray.100' }}
          _placeholder={{ color: 'gray.200' }}
          size="lg"
          h="60px"
          ref={inputRef}
          {...rest}
        />

        {!!error && <FormErrorMessage color="red.500">{error.message}</FormErrorMessage>}
      </InputGroup>
    </FormControl>
  );
};
