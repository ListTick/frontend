import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import './Clock.scss';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { updateCompletedPomodoros } from '@/api/task';
import { useMutation, useQueryClient } from '@tanstack/react-query';

dayjs.extend(duration);

interface ClockProps {
  pomodoroDuration: number;
  breakDuration: number;
  isDisplayed: boolean;
  taskName?: string;
  taskId?: string;
}

const Clock = ({ pomodoroDuration, breakDuration, isDisplayed, taskId, taskName }: ClockProps) => {
  const useQuery = useQueryClient();
  const [time, setTime] = useState(dayjs.duration(25, 'minutes'));
  const [isRunning, setIsRunning] = useState(false);
  const [isPomodoro, setIsPomodoro] = useState(true);

  useEffect(() => {
    setTime(dayjs.duration(pomodoroDuration, 'minutes'));
  }, [pomodoroDuration]);

  useEffect(() => {
    if (isDisplayed) {
      document.title = time.format('mm:ss');
    } else {
      document.title = "ListTick";
    }
    return () => {
      document.title = "ListTick";
    };
  }, [isDisplayed, time, isPomodoro]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime.asSeconds() <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          switchSession();
          updateMutation.mutate();
          return dayjs.duration(isPomodoro ? breakDuration : pomodoroDuration, 'minutes');
        }
        return prevTime.subtract(1, 'second');
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isPomodoro, pomodoroDuration, breakDuration]);

  const updateMutation = useMutation({
    mutationFn: () => {
      if (taskId) {
        return updateCompletedPomodoros(taskId, 1);
      }
      return Promise.resolve();
    },
    onSuccess: () => {
      void useQuery.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const switchSession = () => {
    setIsPomodoro((prev) => !prev);
    setTime(dayjs.duration(isPomodoro ? breakDuration : pomodoroDuration, 'minutes'));
  };

  const handleSkip = () => {
    setIsRunning(false);
    switchSession();
    if (isPomodoro) {
      updateMutation.mutate();
    }
  };

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  return (
    isDisplayed && (
      <div className='clock'>
        <div className='clock__time'>
          <h6>{taskName}</h6>
          <h5>{isPomodoro? "Time to get things done" : "Time to take a break"}</h5>
          <h1>{time.format('mm:ss')}</h1>
          <div className='clock__time--buttons'>
            <Button variant='contained' size='large' onClick={handleStartStop}>
              {isRunning ? 'Pause' : 'Start'}
            </Button>
            <Button variant='contained' size='large' onClick={handleSkip}>
              Skip
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default Clock;
