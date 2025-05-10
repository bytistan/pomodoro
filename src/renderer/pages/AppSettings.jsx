import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import IconButton from '../components/IconButton';

import BackIcon from '../assets/icons/back.svg';
import SaveIcon from '../assets/icons/save.svg';

import ToggleSwitch from '../components/ToggleSwitch/ToggleSwitch';

import Slider from '@mui/material/Slider';
import { useSettings } from './SettingsContext';
import PageLayout from '../components/PageLayout';

import CustomDropdown from '../components/CustomDropdown';

export default function AppSettings() {
    const navigate = useNavigate();
    const fileName = 'settings.json';

    const { settingsData, setSettingsData } = useSettings();

    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    const languageOptions = [
        { value: 'en', label: 'en' },
        { value: 'tr', label: 'tr' }
    ];

    const updateSetting = async (key, value) => {
        await setSettingsData(prev => ({
            ...prev,
            [key]: value
        }));

        setIsSaveDisabled(false);
    };

    const handleSaveButton = () => {
        const success = window.api.writeJson(fileName, { pomodoro: settingsData });

        if (success) {
            window.electron.showNotification(
                "Settings",
                "Settings saved successfully!",
                settingsData.is_sound
            );

            navigate("/");
        } else {
            alert('An error occurred, settings could not be saved.');
        }
    }

    return (
        <PageLayout>

            <main className='flex-grow-1 overflow-auto p-4 d-flex flex-column'>
                <div className='gap-4 px-5 py-3 d-flex justify-content-center align-items-center flex-column bg-white flex-grow-1 rounded-4'>
                    <div className='w-100 d-flex justify-content-between align-items-center pb-3 bottom-border'>
                        <p className='fs-4 fw-bold'>Dark mode</p>
                        <ToggleSwitch
                        />
                    </div>
                    <div className="w-100 position-relative">
                        <CustomDropdown
                            options={languageOptions}
                            value={languageOptions.find(opt => opt.value === settingsData.language)}
                            onChange={(selected) => updateSetting('language', selected.value)}
                            labelPrefix="Language :"
                            defaultValue={languageOptions[0]}
                        />

                    </div>
                    <div className='w-100 d-flex justify-content-between align-items-center pb-3 bottom-border mb-4'>
                        <p className='fs-4 fw-bold'>Character appear</p>
                        <ToggleSwitch
                        />
                    </div>
                    <div className='w-100 flex-column d-flex justfiy-content-start aliign-items-center'>
                        <p className='fs-4'>Chacarter funny level : 0</p>
                        <Slider
                            valueLabelDisplay='auto'
                            max={2}
                            min={0}
                            sx={{
                                color: '#212529',
                                '& .MuiSlider-track': {
                                    backgroundColor: '#212529',
                                },
                                '& .MuiSlider-rail': {
                                    backgroundColor: '#ADB5BD',
                                },
                                '& .MuiSlider-thumb': {
                                    backgroundColor: '#212529',
                                    width: 28,
                                    height: 28,
                                    border: '2px solid white',
                                },
                            }}
                        />
                    </div>
                </div>
            </main>

            <footer className='position-relative d-flex justify-content-start align-items-center p-4 gap-4' style={{ height: '100px' }}>
                <Link to='/clock-settings'>
                    <IconButton
                        icon={BackIcon}
                    />
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