import { useState } from 'react';
import Clock from '@/components/task/clock/Clock';
import TaskList from '@/components/task/taskList/TaskList';

import { Task } from '@/types/task';
import Options from '@/components/task/options/Options';
import TagListClickable from '@/components/task/tagListClickable/TagListClickable';
import ArchivedTaskList from '@/components/task/archivedTaskList/ArchivedTaskList';
import './Tasks.scss';
import { Tag } from '@/types/tag';

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
    <>
      <Clock
        pomodoroDuration={selectedTask.pomodoroDuration ?? 25}
        breakDuration={selectedTask.breakDuration ?? 5}
        isDisplayed={isClockDisplayed}
        taskId={selectedTask.id}
      />
      <div className="tasks">
        <section className="tasks__tags">
          {/*
          TODO: Implement filtering tasks by tags
          */}
          <TagListClickable handleTagClick={function(tag: Tag): void {
                      throw new Error('Function not implemented: ' + tag);
                  } } />
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
            <ArchivedTaskList onPomodoroClick={handlePomodoroClick} />
          ) : (
            <TaskList onPomodoroClick={handlePomodoroClick} />
          )}
        </section>

      </div>
    </>
  );
};

export default Tasks;
