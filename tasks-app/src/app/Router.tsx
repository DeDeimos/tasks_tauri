import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/mainpage';
import { TaskPage } from '../pages/taskpage';

export const router = createBrowserRouter([
  {
    path: '/',
    // element: <MainLayout />,   
    children: [
      {
        path: '/tasks-front',
        element: <HomePage />,
        
      },
      {
        path: '/tasks-front/task/:id',
        element: <TaskPage />
      },
    ],
  },
]);
