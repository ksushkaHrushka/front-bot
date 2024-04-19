import React from 'react';
import Button from '../button/button';
import { useTelegram } from '../../hooks/useTelegram';
import './header.css';

const Header = () => {

    const {user, onClose} = useTelegram(); 

    return (
        <div className={'header'}>
            <span className={'username'}>
                {user?.username}
            </span>
            <Button onClick={onClose}>Закрыть</Button>
        </div>
    );
};

export default Header;