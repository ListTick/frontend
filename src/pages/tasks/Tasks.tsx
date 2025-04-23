import { useState } from 'react';
import Clock from '@/components/task/clock/Clock';
import TaskList from '@/components/task/taskList/TaskList';

import { Task } from '@/types/task';
import { Button, Divider } from '@mui/material';
import Options from '@/components/task/options/Options';
import TagListClickable from '@/components/task/tagListClickable/TagListClickable';
import ArchivedTaskList from '@/components/task/archivedTaskList/ArchivedTaskList';

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
  };

  return (
    <div className='home'>
      <Clock
        pomodoroDuration={selectedTask.pomodoroDuration ?? 25}
        breakDuration={selectedTask.breakDuration ?? 5}
        isDisplayed={isClockDisplayed}
        taskId={selectedTask.id}
      />
      <div className='home__header'>
        <Options />
      </div>
      <div className='home__divider'>
        <Divider />
      </div>
      <h2>Tags</h2>
      <TagListClickable />
      <div className='home__divider'>
        <Divider />
      </div>
      <div className='home__tasks'>
        <h2>Tasks</h2>
        <Button variant='contained' size='large' onClick={displayArchivedTasks}>
          Show archived tasks
        </Button>
      </div>
      {isArchivedTasksDisplayed ? (
        <ArchivedTaskList onPomodoroClick={handlePomodoroClick} />
      ) : (
        <TaskList onPomodoroClick={handlePomodoroClick} />
      )}
    </div>
  );
};

export default Tasks;
