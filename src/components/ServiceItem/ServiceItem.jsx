import React from "react";
import './ServiceItem.css'
import Button from "../button/button";

const ServiceItem = ({service, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(service);
    }

    return (
        <div className={'service' + className}>
            <div className={'img'}/>
            <div className={'title'}>{service.title}</div>
            <div className={'description'}>{service.description}</div>
            <div className={'price'}>
                <span>
                    Приблизительная стоимость: <b>{service.price}</b>
                </span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Добавить услугу
            </Button>
        </div>
    );
};

export default ServiceItem;