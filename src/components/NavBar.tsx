import React from 'react';
import useKeycloak from '../hooks/useKeycloak';
import Button from "./button/Button";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
    const { keycloak, authenticated } = useKeycloak();

    const handleLogin = () => {
        keycloak?.login();
    };

    const handleLogout = () => {
        keycloak?.logout();
    };

    const dummy = () => {
        // redirect and hit the categories endpoint
    }

    return (
        <div>
            {authenticated ? (
                <>
                    <Button onClickFunction={dummy} buttonText={"Categories"}></Button>
                    <Button onClickFunction={handleLogout} buttonText={"Logout"}></Button>
                </>
            ) : (
                <Button onClickFunction={handleLogin} buttonText={"Login"}></Button>
            )}
        </div>
    );
};

export default NavBar;