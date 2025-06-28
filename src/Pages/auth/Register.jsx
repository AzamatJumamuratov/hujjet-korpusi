import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InputContainer from "@/shared/InputContainer/InputContainer";
import {
  Form,
  NavLink,
  useActionData,
  useNavigate,
  useSubmit,
} from "react-router";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submit = useSubmit();
  const actionData = useActionData();
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("username", data.username);
    formData.append("password", data.password);

    setIsRegistering(true);

    submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  };

  useEffect(() => {
    // После ответа от action сбрасываем кнопку
    if (actionData) {
      setIsRegistering(false);
      if (actionData.success) {
        navigate("/");
      }
    }
  }, [actionData]);

  const password = watch("password");

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Зарегистрируйтесь</CardTitle>
        <CardDescription>Заполните поля, чтобы создать аккаунт</CardDescription>
      </CardHeader>
      <CardContent>
        <Form id="register-form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                validate: (value) =>
                  value === password || "Пароли не совпадают",
              }}
              error={errors.confirmPassword}
            />
          </div>
        </Form>

        {/* Показ серверной ошибки */}
        {actionData?.error && (
          <p className="text-sm text-red-500 text-center mt-3">
            {actionData.error}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          form="register-form"
          disabled={isRegistering}
          className="w-full"
        >
          {isRegistering ? "Регистрация..." : "Зарегистрироваться"}
        </Button>
        <CardAction className="w-full flex max-[420px]:flex-col justify-center items-center">
          Уже есть аккаунт?
          <Button variant="link" asChild>
            <NavLink to="/auth/login">Войти</NavLink>
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
