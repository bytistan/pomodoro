import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
    const [settingsData, setSettingsData] = useState({
        settings: null,
        clock: null,
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const allSettings = await window.db.getAll('settings');
                const settings = allSettings[0];
                
                if (settings) {
                    const clock = await window.db.getByField('clock_settings', 'id', settings.clock_id);
                    const language = await window.db.getByField('language', 'id', settings.language_id);
                    
                    setSettingsData({
                        "settings": settings,
                        "clock": clock[0],
                        "language": language[0],
                    });
                }
            } catch (error) {
                console.error('❌ Error fetching settings from DB:', error);
            }
        };

        fetchSettings();
    }, []);    

    const commitSettings = async (updatedFields) => {
        if (!settingsData.settings?.id) return;

        const updated = {
            ...settingsData.settings,
            ...updatedFields,
            updated_date: new Date().toISOString(),
        };

        try {
            await window.db.update('settings', settingsData.settings.id, updatedFields);;
            setSettingsData(prev => ({ ...prev, settings: updated }));
        } catch (error) {
            console.error('❌ Failed to update settings in DB:', error);
        }
    };

    const commitClock = async (updatedFields) => {
        if (!settingsData.clock?.id) return;

        const updated = {
            ...settingsData.clock,
            ...updatedFields,
            updated_date: new Date().toISOString(),
        };

        try {
            await window.db.update('clock_settings', settingsData.clock.id, updatedFields);
            setSettingsData(prev => ({ ...prev, clock: updated }));
        } catch (error) {
            console.error('❌ Failed to update clock settings in DB:', error);
        }
    };

    return (
        <SettingsContext.Provider value={{
            settingsData,
            commitSettings,
            commitClock,
            setSettingsData
        }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    return useContext(SettingsContext);
}