import { BrowserRouter, Route, Routes } from 'react-router';
import './App.scss';
import { AppRoutes } from './types/routes';
import Authentication from './pages/authentication/Authentication';
import Layout from './layout/Layout';
import Home from './pages/home/Home';
import Settings from './pages/settings/Settings';
import Profile from './pages/profile/Profile';
import Lists from './pages/lists/Lists';
import Tasks from './pages/tasks/Tasks';
import Notes from './pages/notes/Notes';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoutes.AUTHENTICATION} element={<Authentication />} />
          <Route path={AppRoutes.HOME} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={AppRoutes.LISTS} element={<Lists />} />
            <Route path={AppRoutes.TASKS} element={<Tasks />} />
            <Route path={AppRoutes.NOTES} element={<Notes />} />
            <Route path={AppRoutes.SETTINGS} element={<Settings />} />
            <Route path={AppRoutes.PROFILE} element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
