import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import IconButton from '../components/IconButton';
import ToggleSwitch from '../components/ToggleSwitch/ToggleSwitch';
import CustomDropdown from '../components/CustomDropdown';
import PageLayout from '../components/PageLayout';

import BackIcon from '../assets/icons/back.svg';
import SaveIcon from '../assets/icons/save.svg';

import Slider from '@mui/material/Slider';
import { useSettings } from '../context/SettingsContext';

export default function AppSettings() {
    const navigate = useNavigate();
    const { settingsData, commitSettings, setSettingsData } = useSettings(); 
    const [localSettings, setLocalSettings] = useState(null);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [allLanguage, setAllLanguage] = useState([]);

 
    useEffect(() => {
        if (settingsData.settings) {
            setLocalSettings({
                is_dark_mode: settingsData.settings.is_dark_mode,
                is_character: settingsData.settings.is_character,
                character_funny_level: settingsData.settings.character_funny_level,
                language: settingsData.language.language, 
            });
        }
    }, [settingsData.settings, settingsData.language]);

    useEffect(() => {
        window.db.getAll("language")
            .then((languages) => setAllLanguage(languages))
            .catch((error) => console.error("Error fetching languages:", error));
    }, []);

    const languageOptions = useMemo(() => {
        return allLanguage.map(lang => ({
            value: lang.language,
            label: lang.language
        }));
    }, [allLanguage]);

    const updateLocal = (key, value) => {
        setLocalSettings(prev => ({
            ...prev,
            [key]: value
        }));
        setIsSaveDisabled(false);
    };

    const handleSaveButton = async () => {
        try {
            const lang = allLanguage.find(lang => lang.language === localSettings.language);

            await commitSettings({
                is_dark_mode: localSettings.is_dark_mode,
                is_character: localSettings.is_character,
                character_funny_level: localSettings.character_funny_level,
                language_id: lang.id
            });

            setSettingsData(prev => ({
                ...prev,
                language: lang
            }));

            window.electron.showNotification(
                "Settings",
                "Settings saved successfully!",
                true
            );

            navigate("/");
        } catch (error) {
            alert('An error occurred while saving settings.');
            console.error(error);
        }
    };
    

    if (!settingsData || !localSettings) return <div>Loading...</div>;

    return (
        <PageLayout>
            <main className='flex-grow-1 overflow-auto p-4 d-flex flex-column'>
                <div className='gap-4 px-5 py-3 d-flex justify-content-center align-items-center flex-column bg-white flex-grow-1 rounded-4'>

                    <div className='w-100 d-flex justify-content-between align-items-center pb-3 bottom-border'>
                        <p className='fs-4 fw-bold'>Dark mode</p>
                        <ToggleSwitch
                            isChecked={localSettings.is_dark_mode}
                            onChange={() => updateLocal('is_dark_mode', !localSettings.is_dark_mode)}
                        />
                    </div>

                    <div className="w-100 position-relative">
                        <CustomDropdown
                            options={languageOptions}
                            value={languageOptions.find(opt => opt.value === localSettings.language)}
                            onChange={(selected) => updateLocal('language', selected.value)}
                            labelPrefix="Language :"
                            defaultValue={languageOptions}
                        />
                    </div>

                    <div className='w-100 d-flex justify-content-between align-items-center pb-3 bottom-border mb-4'>
                        <p className='fs-4 fw-bold'>Character appear</p>
                        <ToggleSwitch
                            isChecked={localSettings.is_character}
                            onChange={() => updateLocal('is_character', !localSettings.is_character)}
                        />
                    </div>

                    <div className='w-100 flex-column d-flex justify-content-start align-items-center'>
                        <p className='fs-4'>Character funny level: {localSettings.character_funny_level}</p>
                        <Slider
                            value={localSettings.character_funny_level}
                            onChangeCommitted={(_, newValue) => updateLocal('character_funny_level', newValue)}
                            valueLabelDisplay='auto'
                            max={2}
                            min={0}
                            sx={sliderStyles}
                        />
                    </div>
                </div>
            </main>

            <footer className='position-relative d-flex justify-content-start align-items-center p-4 gap-4' style={{ height: '100px' }}>
                <Link to='/clock-settings'>
                    <IconButton icon={BackIcon} />
                </Link>
                <div className='position-absolute start-50 top-50 translate-middle'>
                    <IconButton
                        icon={SaveIcon}
                        onClick={handleSaveButton}
                        isDisabled={isSaveDisabled}
                    />
                </div>
            </footer>
        </PageLayout>
    );
}

const sliderStyles = {
    color: '#212529',
    '& .MuiSlider-track': { backgroundColor: '#212529' },
    '& .MuiSlider-rail': { backgroundColor: '#ADB5BD' },
    '& .MuiSlider-thumb': {
        backgroundColor: '#212529',
        width: 28,
        height: 28,
        border: '2px solid white',
    },
};
