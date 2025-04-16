import React, {createContext, useEffect, useRef, useState,} from 'react'
import Keycloak from 'keycloak-js'

interface KeycloakContextProps {
    keycloak: Keycloak | null
    authenticated: boolean
}

const KeycloakContext = createContext<KeycloakContextProps | undefined>(undefined,)

interface KeycloakProviderProps {
    children: React.ReactNode
}

const KeycloakProvider: React.FC<KeycloakProviderProps> = ({children}) => {
    const isRun = useRef<boolean>(false)
    const [keycloak, setKeycloak] = useState<Keycloak | null>(null)
    const [authenticated, setAuthenticated] = useState<boolean>(false)

    useEffect(() => {
        if (isRun.current) return;

        isRun.current = true;

        const initKeycloak = async () => {
            const keycloackConfig = {
                url: 'http://localhost:8090/',
                realm: 'listtick',
                clientId: 'listtick-frontend',
            }
            const keycloakInstance: Keycloak = new Keycloak(keycloackConfig);

            keycloakInstance
                .init({
                    onLoad: 'check-sso',
                })
                .then((authenticated: boolean) => {
                    setAuthenticated(authenticated);
                })
                .catch((error) => {
                    console.error('Keycloak initialization failed:', error);
                    setAuthenticated(false);
                })
                .finally(() => {
                    setKeycloak(keycloakInstance);
                    console.log('keycloak', keycloakInstance);

                    keycloakInstance.onAuthSuccess = () => {
                        console.log('Auth Success');
                        setAuthenticated(true);
                    };

                    keycloakInstance.onAuthLogout = () => {
                        console.log('Auth Logout');
                        setAuthenticated(false);
                    };

                    keycloakInstance.onTokenExpired = () => {
                        keycloakInstance.updateToken(30)
                            .then((refreshed) => {
                                if (refreshed) {
                                    console.log('Token refreshed');
                                    setAuthenticated(true);
                                } else {
                                    setAuthenticated(false);
                                }
                            })
                            .catch(() => {
                                console.error('Token refresh failed');
                                setAuthenticated(false);
                            });
                    };
                })
        }

        initKeycloak();
    }, [])

    return (
        <KeycloakContext.Provider value={{keycloak, authenticated}}>
            {children}
        </KeycloakContext.Provider>
    )
}

export {KeycloakProvider, KeycloakContext}