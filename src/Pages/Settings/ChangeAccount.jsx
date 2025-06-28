import { Button } from "@/components/ui/button";
import InputContainer from "@/shared/InputContainer/InputContainer";
import { Form, useActionData, useSubmit } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const ChangeAccount = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submit = useSubmit();
  const actionData = useActionData();
  const [isChanging, setIsChanging] = useState(false);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("username", data.username);
    formData.append("password", data.password);

    setIsChanging(true);

    submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  };

  useEffect(() => {
    // После ответа от action сбрасываем кнопку
    if (actionData) {
      setIsChanging(false);
      if (actionData.success) {
      }
    }
  }, [actionData]);

  const password = watch("password");

  return (
    <main className="p-4 overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-4">Изменить Аккаунт</h1>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-6">
          <InputContainer
            labelFor="first_name"
            labelText="Имя"
            id="first_name"
            name="first_name"
            type="text"
            placeholder="Введите имя"
            register={register}
            validation={{ required: "Имя обязательно" }}
            error={errors.first_name}
          />
          <InputContainer
            labelFor="last_name"
            labelText="Фамилия"
            id="last_name"
            name="last_name"
            type="text"
            placeholder="Введите фамилию"
            register={register}
            validation={{ required: "Фамилия обязательна" }}
            error={errors.last_name}
          />
          <InputContainer
            labelFor="username"
            labelText="Имя пользователя"
            id="username"
            name="username"
            type="text"
            placeholder="Введите имя пользователя"
            register={register}
            validation={{
              required: "Имя Пользователя обязателен",
            }}
            error={errors.username}
            additionalContainerClass="max-[420px]:flex-col"
          />
          <InputContainer
            labelFor="password"
            labelText="Пароль"
            id="password"
            name="password"
            type="password"
            placeholder="Введите пароль"
            register={register}
            validation={{
              required: "Пароль обязателен",
              minLength: {
                value: 8,
                message: "Минимум 8 символов",
              },
            }}
            error={errors.password}
          />
          <InputContainer
            labelFor="confirm-password"
            labelText="Подтвердите Пароль"
            id="confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="Подтвердите пароль"
            register={register}
            validation={{
              required: "Подтверждение пароля обязательно",
              validate: (value) => value === password || "Пароли не совпадают",
            }}
            error={errors.confirmPassword}
          />
        </div>

        <Button disabled={isChanging} type="submit" className={"mt-4"}>
          Отправить
        </Button>
      </Form>
    </main>
  );
};

export default ChangeAccount;
