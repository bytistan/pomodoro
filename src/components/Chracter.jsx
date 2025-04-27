import React from 'react';

import OmegaStand from '../assets/img/omega-stand.png';
import OmegaWork from '../assets/img/omega-run.png';
import OmegaBreak from '../assets/img/omega-sleepy.png';
import OmegaHappy from '../assets/img/omega-happy.png';

export default function IconButton({ status }) {
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
        default:
            imageSrc = OmegaStand;
    }

    return (
        <img
            id="omega-img"
            src={imageSrc}
            className="scale-omega"
            alt="Omega character"
        />
    );
}
