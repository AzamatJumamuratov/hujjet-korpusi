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

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLogging, setIsLogging] = useState(false);
  const submit = useSubmit();
  const actionData = useActionData(); // <-- данные от action
  const navigate = useNavigate();

  useEffect(() => {
    // После ответа от action сбрасываем кнопку
    if (actionData) {
      setIsLogging(false);

      if (actionData.success) {
        navigate("/");
      }
    }
  }, [actionData]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    setIsLogging(true);

    submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Войдите в Аккаунт</CardTitle>
        <CardDescription>
          Введите свой email для входа в Аккаунт
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form id="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-6">
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

            {/* Отображение ошибки от сервера */}
            {actionData?.error && (
              <p className="text-sm text-red-500 text-center mt-2">
                {actionData.error}
              </p>
            )}
          </div>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          disabled={isLogging}
          type="submit"
          form="login-form"
          className="w-full"
        >
          {isLogging ? "Вход..." : "Войти"}
        </Button>
        <CardAction className="w-full flex max-[420px]:flex-col justify-center items-center">
          Или
          <Button variant="link" asChild>
            <NavLink to="/auth/register">Зарегистрируйтесь</NavLink>
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
