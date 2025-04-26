import React from 'react';

import OmegaStand from '../assets/img/omega-stand.png';
import OmegaWork from '../assets/img/omega-run.png';

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
            break;
        case 'complete':
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
