import { fetchLoginInfo } from "@/shared/api/auth";

export default async function loginAction({ request }) {
  try {
    const formData = await request.formData();
    const query = Object.fromEntries(formData.entries());

    const data = await fetchLoginInfo(query); // POST-запрос
    localStorage.setItem("token", data.token);
    return { success: true, data };
  } catch (error) {
    console.error("Ошибка при login POST:", error);

    const message =
      error.response?.data?.error ||
      error.response?.data?.detail ||
      error.message;

    return { error: message };
  }
}
