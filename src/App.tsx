import './App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {KeycloakProvider} from "./context/KeycloakContext";
import NavBar from "./components/NavBar";

function App() {
    return (
        <KeycloakProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NavBar />} />
                </Routes>
            </BrowserRouter>
        </KeycloakProvider>
    );
}

export default App;
