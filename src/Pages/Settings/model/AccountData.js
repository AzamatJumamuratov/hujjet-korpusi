import { fetchChangeAccount } from "@/Pages/Settings/model/settings";
import { fetchProfileInfo } from "@/shared/api/auth";

export async function changeAction({ request }) {
  try {
    const formData = await request.formData();
    const data = await fetchChangeAccount(formData); // POST-запрос
    return { success: true, data };
  } catch (error) {
    console.error("Ошибка при change Account Action POST:", error);

    const message =
      error.response?.data?.error ||
      error.response?.data?.detail ||
      error.message;

    return { error: message };
  }
}

export async function ProfileLoader() {
  try {
    const profile = await fetchProfileInfo();
    return { success: true, profile };
  } catch (profileError) {
    console.error("Ошибка при получении профиля:", profileError);
    return {
      error:
        profileError?.response?.data?.detail || "Не удалось загрузить профиль",
    };
  }
}
