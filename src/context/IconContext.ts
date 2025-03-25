import { createContext, ReactNode, useContext, useState } from "react";

// Typ dla contextu
type IconContextType = {
    activeIcon: string | null;
    setActiveIcon: (icon: string | null) => void;
};

// Tworzymy context — nie namespace!
const IconContext = createContext<IconContextType | undefined>(undefined);

// Propsy dla providera
interface IconProviderProps {
    children: ReactNode;
}

export const IconProvider = ({ children }: IconProviderProps) => {
    const [activeIcon, setActiveIcon] = useState<string | null>(null);

    return (
        <IconContext.Provider value={{ activeIcon, setActiveIcon }>
            {children}
        </IconContext.Provider>
    );
};

// Hook do użycia contextu
export const useIcon = () => {
    const context = useContext(IconContext);
    if (context === undefined) {
        throw new Error("useIcon must be used within an IconProvider");
    }
    return context;
};
