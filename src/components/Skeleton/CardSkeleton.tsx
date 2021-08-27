import { Box, Skeleton, SkeletonProps } from '@chakra-ui/react';

interface CardSkeletonProps extends SkeletonProps {
  repeatCount: number;
}

export const CardSkeleton = ({ repeatCount = 1, ...rest }: CardSkeletonProps) => {
  const howMany = Array.from(Array(repeatCount).keys());

  return (
    <>
      {howMany.map((i) => (
        <Skeleton {...rest} speed={1}>
          <Box w="300px" h="150px" padding="7" />
        </Skeleton>
      ))}
    </>
  );
};
