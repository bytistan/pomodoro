// src/context/TextsContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useSettings } from "./SettingsContext";

import EnTexts from "../locales/en.jsx";
import TrTexts from "../locales/tr.jsx";

const TextsContext = createContext(null);

const languageFiles = {
    en: EnTexts,
    tr: TrTexts,
};

export function TextsProvider({ children }) {
    const { settingsData } = useSettings();
    const [texts, setTexts] = useState(null);

    useEffect(() => {
        if (!settingsData?.language?.language) return;

        const code = settingsData.language.language;

        if (languageFiles[code]) {
            setTexts(languageFiles[code]);
        } else {
            console.warn(`⚠️ No language file found for code: ${code}`);
            setTexts(languageFiles.en);
        }
    }, [settingsData?.language]);

    if (!texts) {
        return null; // veya <div>Loading...</div>
    }

    return (
        <TextsContext.Provider value={texts}>
            {children}
        </TextsContext.Provider>
    );
}

export function useTexts() {
    return useContext(TextsContext);
}
