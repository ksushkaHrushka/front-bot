import React, { useEffect, useState } from "react";
import './Form.css'
import { useTelegram } from "../../hooks/useTelegram";

const Form = () => {


    const [fio, setFio] = useState('');
    const [company, setCompany] = useState('');
    const [country, setCountry] = useState('');
    const [subject, setSubject] = useState('phisical');
    const {tg} = useTelegram();

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if(!fio || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [fio, country])

    const onChangeFio = (e) => {
        setFio(e.target.value)
    }

    const onChangeCompany = (e) => {
        setCompany(e.target.value)
    }

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }


    return (
        <div className="form">
        <h3>Введите ваши данные</h3>

        <input 
            className="input" 
            type="text" 
            placeholder={'ФИО'}
            value={fio}
            onChange={onChangeFio}
        />

        <input 
            className="input" 
            type="text" 
            placeholder={'Компания'}
            value={company}
            onChange={onChangeCompany}
        />

        <input 
            className="input" 
            type="text" 
            placeholder={'Страна'}
            value={country}
            onChange={onChangeCountry}
        />

        <select value={subject} onChange={onChangeSubject} className={'select'}>
            <option value={'phisical'}>Физическое лицо</option>
            <option value={'legal'}>Юридическое лицо</option>
        </select>
        
        </div>
    );
};

export default Form;