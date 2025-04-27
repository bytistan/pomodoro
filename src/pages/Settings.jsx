import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import IconButton from '../components/IconButton';

import BackIcon from '../assets/icons/back.svg';
import SaveIcon from '../assets/icons/save.svg';

import PlusIcon from '../assets/icons/plus.svg';
import MinusIcon from '../assets/icons/minus.svg';

import ToggleSwitch from '../components/ToggleSwitch/ToggleSwitch';

import Slider from '@mui/material/Slider';

export default function Settings() {
    const navigate = useNavigate();
    const settingsJsonFilePath = './src/data/settings.json';

    const [settingsData, setSettingsData] = useState(
        window.api.readJson(settingsJsonFilePath).pomodoro
    );

    const updateSetting = (key, value) => {
        setSettingsData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleChangeWorkTime = (event, newValue) => {
        updateSetting('work_time', newValue);
    };

    const handleChangeBreakTime = (event, newValue) => {
        updateSetting('break_time', newValue);
    };

    const handleToggleSwitchChange = () => {
        updateSetting('is_sound', !isSound);
    }

    const increaseSetNumber = () => {
        updateSetting('set_number', Math.min(12, settingsData.set_number + 1));
    };

    const decreaseSetNumber = () => {
        updateSetting('set_number', Math.max(4, settingsData.set_number - 1));
    };

    const handleSaveButton = () => {
        const success = window.api.writeJson('./src/data/settings.json', { pomodoro: settingsData });

        if (success) {
            new window.Notification('Settings', {
                body: 'Settings saved successfully!'
            });

            navigate("/");
        } else {
            alert('An error occurred, settings could not be saved.');
        }
    }

    return (
        <div className='page-background d-flex flex-column vh-100'>
            <main className='flex-grow-1 overflow-auto p-4 d-flex flex-column'>
                <div className='gap-4 px-5 py-3 d-flex justify-content-center align-items-center flex-column bg-white flex-grow-1 rounded-4'>
                    <div className='w-100 d-flex justify-content-between align-items-center pb-3 bottom-border mb-4'>
                        <p className='fs-3 fw-bold'>Alarm Sound</p>
                        <ToggleSwitch
                            isChecked={!settingsData.is_sound}
                            onChange={handleToggleSwitchChange}
                        />
                    </div>
                    <div className='w-100 flex-column d-flex justfiy-content-start aliign-items-center'>
                        <p className='fs-4'>Remind Every : {settingsData.work_time}min</p>
                        <Slider
                            value={settingsData.work_time}
                            onChange={handleChangeWorkTime}
                            valueLabelDisplay='auto'
                            max={100}
                            min={25}
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
                    <div className='w-100 flex-column d-flex justfiy-content-start aliign-items-center'>
                        <p className='fs-4'>Break Time : {settingsData.break_time}min</p>
                        <Slider
                            value={settingsData.break_time}
                            onChange={handleChangeBreakTime}
                            valueLabelDisplay='auto'
                            max={25}
                            min={5}
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
                    <div className='w-100'>
                        <div className='box-background p-3 rounded-3 d-flex justify-content-between align-items-center'>
                            <p className='fs-5 fw-bold'>Set Number : {settingsData.set_number}</p>
                            <div className='d-flex justify-content-center alignt-items-center gap-2'>
                                <div className='sm-button' onClick={decreaseSetNumber}>
                                    <img src={MinusIcon} alt='icon' />
                                </div>
                                <div className='sm-button' onClick={increaseSetNumber}>
                                    <img src={PlusIcon} alt='icon' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className='position-relative d-flex justify-content-start align-items-center p-4 gap-4' style={{ height: '100px' }}>
                <Link to='/'>
                    <IconButton
                        icon={BackIcon}
                    />
                </Link>
                <div className='position-absolute start-50 top-50 translate-middle'>
                    <IconButton
                        icon={SaveIcon}
                        onClick={handleSaveButton}
                    />
                </div>
            </footer>
        </div>
    );
}