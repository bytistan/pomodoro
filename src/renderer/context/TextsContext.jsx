import { createContext, useContext, useEffect, useState } from "react";
import { useSettings } from "./SettingsContext";

const TextsContext = createContext();

export function TextsProvider({ children }) {
    const { settingsData } = useSettings();
    const [texts, setTexts] = useState({});
    
    useEffect(() => {
        const fetchTexts = async () => {
            try {
                const code = settingsData.language?.language || 'en';

                const l = await window.db.getByField('language', 'language', code);
                const language = l[0];
                
                const selectedLangTexts = await window.db.getByField('text','language_id',language.id);

                setTexts(selectedLangTexts);
            } catch (error) {
                console.error("❌ Error fetching texts from DB:", error);
            }
        };

        if (settingsData.language?.id) {
            fetchTexts();
        }
    }, [settingsData.language]);

    return (
        <TextsContext.Provider value={texts}>
            {children}
        </TextsContext.Provider>
    );
}

export function useTexts() {
    return useContext(TextsContext);
}
