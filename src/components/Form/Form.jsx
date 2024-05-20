import React, { useCallback, useEffect } from "react";
import "./Form.css";
import { useTelegram } from "../../hooks/useTelegram";
import { useForm } from "react-hook-form";

const Form = () => {
  const { tg } = useTelegram();
  const { 
    register,
    handleSubmit,
    formState: { isValid, isDirty, errors }
  } = useForm({
    defaultValues: {
      name: '',
      company: '',
      country: '',
      subject: 'phisical'
    }
  });

  const onSubmit = useCallback((data) => {
    if (isValid) {
      tg.sendData(JSON.stringify(data));
    }
  }, [isValid]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Отправить данные",
    });
    tg.MainButton.isVisible = isDirty;

    tg.onEvent('mainButtonClicked', handleSubmit(onSubmit))
    return () => {
      tg.offEvent('mainButtonClicked', handleSubmit(onSubmit))
    }
  }, [handleSubmit, onSubmit, isDirty])

  return (
    <form 
      className={'form'}
    >
      <h3>Введите ваши данные</h3>

      <input
        className={'input'}
        type="text"
        placeholder={"ФИО"}
        {...register("name", { 
          required: 'Поле является обязательным',
          minLength: {
            value: 13,
            message: 'Минимальная длина 13'
          },
          maxLength: {
            value: 283,
            message: 'Максимальная длина 283'
          }
        })}
      />
      {errors.name && <span>{errors.name.message}</span>}

      <input
        className={'input'}
        type="text"
        placeholder={"Компания"}
        {...register("company", { 
          required: 'Поле является обязательным',
          minLength: {
            value: 2,
            message: 'Минимальная длина 2'
          },
          maxLength: {
            value: 100,
            message: 'Максимальная длина 100'
          }
        })}
      />
      {errors.company && <span>{errors.company.message}</span>}

      <input
        className={'input'}
        type="text"
        placeholder={"Страна"}
        {...register("country", { 
          required: 'Поле является обязательным',
          minLength: {
            value: 3,
            message: 'Минимальная длина 3'
          },
          maxLength: {
            value: 100,
            message: 'Максимальная длина 100'
          }
        })}
      />
      {errors.country && <span>{errors.country.message}</span>}

      <select
        className={'select'}
        {...register("subject", { 
          required: 'Поле является обязательным'
        })}
      >
        <option value={"phisical"}>Физическое лицо</option>
        <option value={"legal"}>Юридическое лицо</option>
      </select>
    </form>
  );
};

export default Form;
