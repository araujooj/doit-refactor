import { Box, Skeleton } from '@chakra-ui/react';

interface CardSkeletonProps {
  repeatCount: number;
}

export const CardSkeleton = ({ repeatCount = 1 }: CardSkeletonProps) => {
  const howMany = Array.from(Array(repeatCount).keys());

  return (
    <>
      {howMany.map((i) => (
        <Skeleton speed={1}>
          <Box w="300px" h="150px" padding="7" />
        </Skeleton>
      ))}
    </>
  );
};
