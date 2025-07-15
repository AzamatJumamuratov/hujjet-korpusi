import { fetchRegisterInfo } from "@/shared/api/auth";

export default async function registerAction({ request }) {
  try {
    const formData = await request.formData();
    const payload = Object.fromEntries(formData.entries());

    const data = await fetchRegisterInfo(payload);

    localStorage.setItem("token", data.token);
    return { success: true, data };
  } catch (error) {
    console.error("Ошибка при регистрации:", error);

    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.detail ||
      "Ошибка регистрации";

    return { error: errorMessage };
  }
}
