import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import IconButton from '../components/IconButton';
import ToggleSwitch from '../components/ToggleSwitch/ToggleSwitch';
import PageLayout from '../components/PageLayout';

import BackIcon from '../assets/icons/back.svg';
import NextIcon from '../assets/icons/next.svg';
import SaveIcon from '../assets/icons/save.svg';
import PlusIcon from '../assets/icons/plus.svg';
import MinusIcon from '../assets/icons/minus.svg';

import Slider from '@mui/material/Slider';
import { useSettings } from '../context/SettingsContext';

export default function ClockSettings() {
    const navigate = useNavigate();
    const { settingsData, commitClock } = useSettings();
    const [localClock, setLocalClock] = useState(null);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    useEffect(() => {
        if (settingsData.clock) {
            setLocalClock(settingsData.clock);
        }
    }, [settingsData.clock]);

    const updateLocalSetting = (key, value) => {
        setLocalClock(prev => {
            const updated = { ...prev, [key]: value };
            setIsSaveDisabled(false);
            return updated;
        });
    };

    const handleChangeWorkTime = (_, newValue) => {
        updateLocalSetting('work_time', newValue);
    };

    const handleChangeBreakTime = (_, newValue) => {
        updateLocalSetting('break_time', newValue);
    };

    const handleToggleSwitchChange = () => {
        updateLocalSetting('is_sound', !localClock.is_sound);
    };

    const increaseSetNumber = () => {
        updateLocalSetting('set_number', Math.min(12, localClock.set_number + 1));
    };

    const decreaseSetNumber = () => {
        updateLocalSetting('set_number', Math.max(2, localClock.set_number - 1));
    };

    const handleSaveButton = async () => {
        await commitClock(localClock);

        window.electron.showNotification(
            "Settings",
            "Clock settings saved successfully!",
            localClock.is_sound
        );

        navigate("/");
    };

    const controlButtonDisabled = () => {
        const decreaseBtn = document.getElementById("decrease-btn");
        const increaseBtn = document.getElementById("increase-btn");

        if (!decreaseBtn || !increaseBtn || !localClock) return;

        decreaseBtn.classList.toggle("sm-button-disabled", localClock.set_number <= 2);
        decreaseBtn.classList.toggle("sm-button", localClock.set_number > 2);

        increaseBtn.classList.toggle("sm-button-disabled", localClock.set_number >= 12);
        increaseBtn.classList.toggle("sm-button", localClock.set_number < 12);
    };

    useEffect(() => {
        controlButtonDisabled();
    }, [localClock?.set_number]);

    if (!localClock) return null;

    return (
        <PageLayout>
            <main className='flex-grow-1 overflow-auto p-4 d-flex flex-column'>
                <div className='gap-4 px-5 py-3 d-flex justify-content-center align-items-center flex-column bg-white flex-grow-1 rounded-4'>
                    <div className='w-100 d-flex justify-content-between align-items-center pb-3 bottom-border mb-4'>
                        <p className='fs-3 fw-bold'>Alarm Sound</p>
                        <ToggleSwitch
                            isChecked={!localClock.is_sound}
                            onChange={handleToggleSwitchChange}
                        />
                    </div>

                    <div className='w-100 flex-column d-flex justfiy-content-start aliign-items-center'>
                        <p className='fs-4'>Remind Every : {localClock.work_time}min</p>
                        <Slider
                            value={localClock.work_time}
                            onChange={handleChangeWorkTime}
                            valueLabelDisplay='auto'
                            max={100}
                            min={25}
                            sx={sliderStyles}
                        />
                    </div>

                    <div className='w-100 flex-column d-flex justfiy-content-start aliign-items-center'>
                        <p className='fs-4'>Break Time : {localClock.break_time}min</p>
                        <Slider
                            value={localClock.break_time}
                            onChange={handleChangeBreakTime}
                            valueLabelDisplay='auto'
                            max={25}
                            min={5}
                            sx={sliderStyles}
                        />
                    </div>

                    <div className='w-100'>
                        <div className='box-background p-3 rounded-3 d-flex justify-content-between align-items-center'>
                            <p className='fs-5 fw-bold'>Set Number : {localClock.set_number}</p>
                            <div className='d-flex justify-content-center alignt-items-center gap-2'>
                                <div className='sm-button' onClick={decreaseSetNumber} id="decrease-btn">
                                    <img src={MinusIcon} alt='icon' className='sm-button-icon' />
                                </div>
                                <div className='sm-button' onClick={increaseSetNumber} id="increase-btn">
                                    <img src={PlusIcon} alt='icon' className='sm-button-icon' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className='d-flex justify-content-between align-items-center p-4 gap-4' style={{ height: '100px' }}>
                <Link to='/'>
                    <IconButton icon={BackIcon} />
                </Link>
                <div>
                    <IconButton
                        icon={SaveIcon}
                        onClick={handleSaveButton}
                        isDisabled={isSaveDisabled}
                    />
                </div>
                <Link to='/app-settings'>
                    <IconButton icon={NextIcon} />
                </Link>
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
