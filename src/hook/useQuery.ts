import { useQuery } from 'react-query';

export const useReactQuery = ( func: any, key: any ) => {
  return useQuery({
    queryFn: () => func(),
    queryKey: [key],
  });
};

