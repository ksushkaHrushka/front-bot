import React, { useState } from "react";
import './ServiceList.css'
import ServiceItem from "../ServiceItem/ServiceItem";
import { useTelegram } from "../../hooks/useTelegram";
import { useCallback, useEffect } from "react";
import CardIcon from '../../img/card-1.svg'
import CardIcon2 from '../../img/card-2.svg'
import CardIcon3 from '../../img/card-3.svg'
import CardIcon4 from '../../img/card-4.svg'
import CardIcon5 from '../../img/card-5.svg'
import CardIcon6 from '../../img/card-6.svg'

const services = [
    {id: 1, title:'ИТ-консалтинг', price: 700, currency: 'BYN', image: CardIcon, description: 'Мы оценим текущее состояние вашей информационной системы и составим стратегию развития'},
    {id: 2, title:'Разработка ПО', price: 1000, currency: 'BYN', image: CardIcon2, description: 'SoftTeco предлагает полный цикл программных услуг клиентам из различных отраслей'},
    {id: 3, title:'Разработка мобильных приложений', price: 700, currency: 'BYN', image: CardIcon3, description: 'Предлагаем полный цикл разработки мобильных приложений для бизнеса, создавая решения в соответствии с индивидуальными нуждами клиента'},
    {id: 4, title:'Развитие отдела продаж', price: 800, currency: 'BYN', image: CardIcon4, description: 'Наши мощные облачные сервисы помогут вам оптимизировать все внутренние рабочие процессы в одном месте, чтобы стимулировать продажи'},
    {id: 5, title:'Веб-разработка', price: 1000, currency: 'BYN', image: CardIcon5, description: 'Наши разработчики создают первоклассные веб-решения, которые являются многофункциональными, быстрыми и масштабируемыми'},
    {id: 6, title:'UI/UX дизайн', price: 900, currency: 'BYN', image: CardIcon6, description: 'Благодаря первоклассным услугам UI/UX-дизайна SoftTeco вы без труда воплотите свою идею в жизнь с нуля'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
} 


const ServiceList = () => {

    const [addedItems, setAddedItems] = useState([]);
    const {user, tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            services: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
            user
        }
        fetch('https://bot-al5zur09.b4a.run/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(data),
        })
      }, [addedItems, queryId])
    
      useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
          tg.offEvent('mainButtonClicked', onSendData)
        }
      }, [onSendData])

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
                text: `Заказать на стоимость ${getTotalPrice(newItems)}`
            })
        }

    }

    return (
        <div className={'list'}>
            {services.map(item => (
                <ServiceItem
                    key={item.id}
                    service={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ServiceList;