import { useState } from 'react';
import Clock from '@/components/task/clock/Clock';
import TaskList from '@/components/task/taskList/TaskList';

import { Task } from '@/types/task';
import Options from '@/components/task/options/Options';
import TagListClickable from '@/components/task/tagListClickable/TagListClickable';
import ArchivedTaskList from '@/components/task/archivedTaskList/ArchivedTaskList';
import './Tasks.scss';

const Tasks = () => {
  const [isClockDisplayed, setIsClockDisplayed] = useState(false);
  const [selectedTask, setSelectedTask] = useState({} as Task);
  const [isArchivedTasksDisplayed, setIsArchivedTasksDisplayed] = useState<boolean>(false);

  const handlePomodoroClick = (task: Task) => {
    setSelectedTask(task);
    setIsClockDisplayed(true);
  };

  const displayArchivedTasks = () => {
    setIsArchivedTasksDisplayed((prev) => !prev);
    console.log(isArchivedTasksDisplayed);
  };

  return (
    <>
      <Clock
        pomodoroDuration={selectedTask.pomodoroDuration ?? 25}
        breakDuration={selectedTask.breakDuration ?? 5}
        isDisplayed={isClockDisplayed}
        taskId={selectedTask.id}
      />
      <div className='tasks'>
        <section className='tasks__tasks'>
          <div className='tasks__tasks--header'>
            <h2>Tasks</h2>
            <Options
              toggleShowArchivedTasks={displayArchivedTasks}
              isArchivedTasksDisplayed={isArchivedTasksDisplayed}
            />
          </div>
          {isArchivedTasksDisplayed ? (
            <ArchivedTaskList onPomodoroClick={handlePomodoroClick} />
          ) : (
            <TaskList onPomodoroClick={handlePomodoroClick} />
          )}
        </section>
        <section className='tasks__tags'>
          <h2>Tags</h2>
          <TagListClickable />
        </section>
      </div>
    </>
  );
};

export default Tasks;
