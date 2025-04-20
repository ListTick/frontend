import { useAxios } from '../../config/axios.ts';
import { useQuery } from '@tanstack/react-query';

const Tasks = () => {
  const api = useAxios();

  const { data, error, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => api.get('/account/get').then((res) => res.data)
  });
  return <div>{data}</div>;
};

export default Tasks;
