import { UploadFiles } from "@/shared/api/home";

export default async function homeAction({ request }) {
  try {
    const formData = await request.formData();

    // Отправка формы на сервер
    const result = await UploadFiles(formData);

    return { success: true, data: result };
  } catch (error) {
    console.error("Ошибка в homeAction:", error);

    return {
      success: false,
      error: error?.detail || "Произошла ошибка при отправке данных",
    };
  }
}
