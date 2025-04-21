import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../../api/tasks.ts';
import { Task } from '../../types/task.ts';

const Tasks = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasks()
  });

  if (isLoading) {
    return <div className='tasks'>Loading...</div>;
  }

  if (isError) {
    return <div className='tasks'>Error loading tasks</div>;
  }

  return (
    <div className='tasks'>
      <h1>Tasks</h1>
      <div className='tasks__list'>
        {data?.map((task: Task) => (
          <div key={task.id} className='tasks__item'>
            <h2>{task.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
