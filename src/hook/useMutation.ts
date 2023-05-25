import { useMutation, useQueryClient } from 'react-query';

export const useReactMutation = (func: any, key: string) => {
	const client = useQueryClient();
	return useMutation({
		mutationFn: () => func(),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: [key] });
		},
	});
};
