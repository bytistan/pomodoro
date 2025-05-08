import React from 'react';

import OmegaStand from '../assets/img/omega-stand.png';
import OmegaWork from '../assets/img/omega-run.png';
import OmegaBreak from '../assets/img/omega-sleepy.png';
import OmegaHappy from '../assets/img/omega-happy.png';

import TextBubble from './TextBubble.jsx';

export default function Character({ status }) {
    let imageSrc;

    switch (status) {
        case 'welcome':
            imageSrc = OmegaStand;
            break;
        case 'angry':
            imageSrc = OmegaStand;
            break;
        case 'work':
            imageSrc = OmegaWork;
            break;
        case 'break':
            imageSrc = OmegaBreak;
            break;
        case 'complete':
            imageSrc = OmegaHappy;
            break;
        case 'empty-page':
            imageSrc = OmegaStand;
            break;
        default:
            imageSrc = OmegaStand;
            break;
    }

    return (
        <div className="position-relative d-flex justify-content-start align-items-center flex-grow-1">
            <div className="position-relative">
                <img
                    id="omega-img"
                    src={imageSrc}
                    className="scale-omega"
                    alt="Omega character"
                />
                <div className="position-absolute top-0 start-100 w-250px">
                    <TextBubble status={status}/>
                </div>
            </div>
        </div>

    );
}
