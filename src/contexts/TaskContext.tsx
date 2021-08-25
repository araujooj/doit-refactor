import { AxiosResponse } from 'axios';
import React, {
  createContext,
  ReactText,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import { api } from '../services/api';

interface Task {
  id: string;
  title: string;
  description: string;
  userId: string;
  completed: boolean;
}

interface TasksContextData {
  tasks: Task[];
  createTask: (data: Omit<Task, 'id'>, accessToken: string) => Promise<void>;
  loadTasks: (id: string, accessToken: string) => Promise<void>;
  searchTasks: (taskTitle: string, accessToken: string) => Promise<void>;
  updateTask: (taskId: string, accessToken: string, userId: string) => Promise<void>;
  deleteTask: (taskId: string, accessToken: string) => Promise<void>;
}

const TaskContext = createContext<TasksContextData>({} as TasksContextData);

const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within an TaskProvider');
  }

  return context;
};

const TaskProvider: React.FC = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  async function loadTasks(id: string, accessToken: string) {
    try {
      const response = await api.get<Task[]>(`/tasks?userId=${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setTasks(response.data);
    } catch (err) {
      setTasks([]);
    }
  }

  const createTask = useCallback(async (data: Omit<Task, 'id'>, accessToken: string) => {
    await api
      .post<Task>('/tasks', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response: AxiosResponse<Task>) => setTasks((oldTasks) => [...oldTasks, response.data]))
      .catch((err) => console.error(err));
  }, []);

  const updateTask = useCallback(
    async (taskId: string, accessToken: string, userId: string) => {
      await api
        .patch<Task>(
          `/tasks/${taskId}`,
          { completed: true, userId },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((response: AxiosResponse<Task>) => {
          const filteredTasks = tasks.filter((specificTask) => specificTask.id !== taskId);
          const task = tasks.find((specificTask) => specificTask.id === taskId);

          if (task) {
            task.completed = true;
            setTasks([...filteredTasks, task]);
          }
        })
        .catch((err) => console.error(err));
    },
    [tasks],
  );

  const deleteTask = useCallback(
    async (taskId: string, accessToken: string) => {
      await api
        .delete(`/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response: AxiosResponse<Task>) => {
          const filteredTasks = tasks.filter((specificTask) => specificTask.id !== taskId);
          setTasks([...filteredTasks]);
        })
        .catch((err) => console.error(err));
    },
    [tasks],
  );

  const searchTasks = useCallback(async (taskTitle: string, accessToken: string) => {
    const response = await api.get<Task[]>(`/tasks?title_like=${taskTitle}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setTasks(response.data);
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        loadTasks,
        updateTask,
        deleteTask,
        searchTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider, useTasks };
