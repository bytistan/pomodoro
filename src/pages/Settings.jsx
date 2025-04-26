import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import IconButton from '../components/IconButton';

import BackIcon from '../assets/icons/back.svg';

import PlusIcon from "../assets/icons/plus.svg";
import MinusIcon from "../assets/icons/minus.svg";

import ToggleSwitch from '../components/ToggleSwitch/ToggleSwitch';

import Slider from '@mui/material/Slider';

export default function Settings() {
    const [value, setValue] = useState(50);

    // JSON dosyası okuma
    const data = window.api.readJson('./src/data/settings.json');
    console.log(data);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div className="page-background d-flex flex-column vh-100">
            <main className="flex-grow-1 overflow-auto p-4 d-flex flex-column">
                <div className="gap-4 px-5 py-3 d-flex justify-content-center align-items-center flex-column bg-white flex-grow-1 rounded-4">
                    <div className="w-100 d-flex justify-content-between align-items-center pb-3 bottom-border mb-4">
                        <p className="fs-3 fw-bold">Alarm Sound</p>
                        <ToggleSwitch />
                    </div>
                    <div className="w-100 flex-column d-flex justfiy-content-start aliign-items-center">
                        <p className="fs-4">Remind Every : 25min</p>
                        <Slider
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
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
                    <div className="w-100 flex-column d-flex justfiy-content-start aliign-items-center">
                        <p className="fs-4">Break Time : 5min</p>
                        <Slider
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
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
                    <div className="w-100">
                        <div className="box-background p-3 rounded-3 d-flex justify-content-between align-items-center">
                            <p className="fs-5 fw-bold">Set Number : 4</p>
                            <div className="d-flex justify-content-center alignt-items-center gap-2">
                                <div className="sm-button">
                                    <img src={MinusIcon} alt="icon" />
                                </div>
                                <div className="sm-button">
                                    <img src={PlusIcon} alt="icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="d-flex justify-content-start align-items-center p-4" style={{ height: '100px' }}>
                <Link to="/">
                    <IconButton
                        icon={BackIcon}
                    />
                </Link>
            </footer>
        </div>
    );
}