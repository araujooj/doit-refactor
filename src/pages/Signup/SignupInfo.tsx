import {
 Grid, Image, VStack, Flex, Center, Box, Heading, Text,
} from '@chakra-ui/react';
import { FaForward } from 'react-icons/fa';
import LogoSecondary from '../../assets/logo-secondary.svg';
import { theme } from '../../styles/theme';
import SimpleIcon from '../../assets/simple-icon.svg';

export const SignupInfo = () => (
  <Grid w={['100%', '100%', '50%', '50%']} paddingLeft={['0', '100px']}>
    <Image
      src={LogoSecondary}
      alt="Do it"
      title="Do it"
      mb="8"
      boxSize={['120px', '120px', '150px', '150px']}
    />
    <VStack spacing="14">
      <Flex w="100%">
        <Center borderRadius="5px" bg="white" w="40px" h="40px">
          <FaForward color={theme.colors.purple['800']} size={25} />
        </Center>
        <Box ml="4">
          <Heading size="lg"> Agilidade </Heading>
          <Text>
            Agilize seus projetos com rapidez e
            <br />
            muita performance
          </Text>
        </Box>
      </Flex>
      <Flex w="100%">
        <Center borderRadius="5px" bg="white" w="40px" h="40px">
          <Image src={SimpleIcon} w="25px" />
        </Center>
        <Box ml="4">
          <Heading size="lg"> Simplicidade </Heading>
          <Text>
            Armazene seus projetos em uma
            {' '}
            <br />
            {' '}
            interface altamente usual
          </Text>
        </Box>
      </Flex>
    </VStack>
  </Grid>
);
