import React from 'react';
import AvatarComponent from './Avatar_Component';

const avatars = [
    { image: 'tesla.svg', name: 'Tesla' },
    { image: 'volta.svg', name: 'Volta' },
    { image: 'meitner.svg', name: 'Meitner' },
    { image: 'johnson.svg', name: 'Johnson' },
    { image: 'fermi.svg', name: 'Fermi' },
];

const AvatarTabPanel = () => {
    return (
        <>
            {avatars.map((avatar, index) => {
                return <AvatarComponent key={index} avatar={avatar} />
            })}
        </>
    );
};

export default AvatarTabPanel;