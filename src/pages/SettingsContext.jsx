import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
    const [settingsData, setSettingsData] = useState({});
    const fileName = 'settings.json';

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await window.api.readJson(fileName);
                if (data && data.pomodoro) {
                    setSettingsData(data.pomodoro);
                }

            } catch (error) {
                console.error('Error reading settings:', error);
            }
        };

        fetchSettings();
    }, []);


    return (
        <SettingsContext.Provider value={{ settingsData, setSettingsData }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    return useContext(SettingsContext);
}