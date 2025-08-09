import { useEffect, useState } from 'react';
import Clock from '@/components/task/clock/Clock';
import TaskList from '@/components/task/taskList/TaskList';

import { Task } from '@/types/task';
import Options from '@/components/task/options/Options';
import TagListClickable from '@/components/task/tagListClickable/TagListClickable';
import ArchivedTaskList from '@/components/task/archivedTaskList/ArchivedTaskList';
import './Tasks.scss';
import { Tag } from '@/types/tag.ts';
import { useQueryClient } from '@tanstack/react-query';

const Tasks = () => {
  const [isClockDisplayed, setIsClockDisplayed] = useState(false);
  const [selectedTask, setSelectedTask] = useState({} as Task);
  const [isArchivedTasksDisplayed, setIsArchivedTasksDisplayed] = useState<boolean>(false);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (isArchivedTasksDisplayed) {
      void queryClient.invalidateQueries({ queryKey: ['archived-tasks'] });
    } else {
      void queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  }, [selectedTagId]);

  const handlePomodoroClick = (task: Task) => {
    setSelectedTask(task);
    setIsClockDisplayed(true);
  };

  const displayArchivedTasks = () => {
    setIsArchivedTasksDisplayed((prev) => !prev);
  };

  const handleTagClick = (tag: Tag) => {
    setSelectedTagId(tag.id ?? null);
  }

  return (
    <>
      <Clock
        pomodoroDuration={selectedTask.pomodoroDuration ?? 25}
        breakDuration={selectedTask.breakDuration ?? 5}
        isDisplayed={isClockDisplayed}
        taskId={selectedTask.id}
      />
      <div className="tasks">
        <section className="tasks__tags">
          <TagListClickable handleTagClick={handleTagClick} selectedTagId={selectedTagId} />
        </section>
        <section className='tasks__tasks'>
          <div className='tasks__tasks--header'>
            <h2>{isArchivedTasksDisplayed ? 'Archived Tasks' : 'Tasks'}</h2>
            <Options
              toggleShowArchivedTasks={displayArchivedTasks}
              isArchivedTasksDisplayed={isArchivedTasksDisplayed}
            />
          </div>
          {isArchivedTasksDisplayed ? (
            <ArchivedTaskList onPomodoroClick={handlePomodoroClick} filterByTagId={selectedTagId} />
          ) : (
            <TaskList onPomodoroClick={handlePomodoroClick} filterByTagId={selectedTagId} />
          )}
        </section>
      </div>
      </>
  );
};

export default Tasks;
