import { fetchProfileInfo } from "@/shared/api/auth";
import { fetchUploadedFiles } from "@/shared/api/files";

export async function HomeLoader() {
  try {
    const profile = await fetchProfileInfo();
    try {
      const files = await fetchUploadedFiles();
      return { success: true, profile, files };
    } catch (fileError) {
      console.error("Ошибка при получении файлов:", fileError);
      return {
        success: false,
        profile,
        error:
          fileError?.response?.data?.detail || "Не удалось загрузить файлы",
      };
    }
  } catch (profileError) {
    console.error("Ошибка при получении профиля:", profileError);
    return {
      error:
        profileError?.response?.data?.detail || "Не удалось загрузить профиль",
    };
  }
}
