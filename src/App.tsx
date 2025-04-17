import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoutes} from './types/routes';
import LandingPage from './pages/landingPage/LandingPage.tsx';
import Layout from './layout/Layout';
import Home from './pages/home/Home';
import Settings from './pages/settings/Settings';
import Profile from './pages/profile/Profile';
import Lists from './pages/lists/Lists';
import Tasks from './pages/tasks/Tasks';
import Notes from './pages/notes/Notes';
import Notifications from './pages/notifications/Notifications';
import './App.scss';
import {KeycloakProvider} from "./security/KeycloakContext";

function App() {
    return (
        <KeycloakProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={AppRoutes.LANDING_PAGE} element={<LandingPage/>}/>
                    <Route path={AppRoutes.HOME} element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path={AppRoutes.LISTS} element={<Lists/>}/>
                        <Route path={AppRoutes.TASKS} element={<Tasks/>}/>
                        <Route path={AppRoutes.NOTES} element={<Notes/>}/>
                        <Route path={AppRoutes.NOTIFICATIONS} element={<Notifications/>}/>
                        <Route path={AppRoutes.PROFILE} element={<Profile/>}/>
                        <Route path={AppRoutes.SETTINGS} element={<Settings/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </KeycloakProvider>
    );
}

export default App;
