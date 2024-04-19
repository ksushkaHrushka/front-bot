import React, { useState } from "react";
import './ServiceList.css'
import ServiceItem from "../ServiceItem/ServiceItem";
import { useTelegram } from "../../hooks/useTelegram";

const services = [
    {id: 1, title:'ИТ-консалтинг', price: 700, description: 'Мы оценим текущее состояние вашей информационной системы и составим стратегию развития'},
    {id: 2, title:'Разработка ПО', price: 1000, description: 'SoftTeco предлагает полный цикл программных услуг клиентам из различных отраслей'},
    {id: 3, title:'Разработка мобильных приложений', price: 700, description: 'Предлагаем полный цикл разработки мобильных приложений для бизнеса, создавая решения в соответствии с индивидуальными нуждами клиента'},
    {id: 4, title:'Развитие отдела продаж', price: 800, description: 'Наши мощные облачные сервисы помогут вам оптимизировать все внутренние рабочие процессы в одном месте, чтобы стимулировать продажи'},
    {id: 5, title:'Веб-разработка', price: 1000, description: 'Наши разработчики создают первоклассные веб-решения, которые являются многофункциональными, быстрыми и масштабируемыми'},
    {id: 6, title:'UI/UX дизайн', price: 900, description: 'Благодаря первоклассным услугам UI/UX-дизайна SoftTeco вы без труда воплотите свою идею в жизнь с нуля'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
} 

const ServiceList = () => {

    const [addedItems, setAddedItems] = useState([]);
    const {tg} = useTelegram();

    const onAdd = (service) => {
        const alreadyAdded = addedItems.find(item => item.id === service.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== service.id);
        } else {
            newItems = [...addedItems, service];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Заказать на смотимость ${getTotalPrice(newItems)}`
            })
        }

    }

    return (
        <div className={'list'}>
            {services.map(item => (
                <ServiceItem
                    service={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))
            }
        </div>
    );
};

export default ServiceList;