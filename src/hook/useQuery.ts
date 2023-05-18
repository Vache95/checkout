import { useQuery } from "react-query";


export const useReactQuery = (func: any, key: string) => {
  return useQuery({
    queryFn: () => func(),
    queryKey: [key],
    onError: (err) => {
      if (err instanceof Error) {
        throw Error;
      }
    },
  });
};
