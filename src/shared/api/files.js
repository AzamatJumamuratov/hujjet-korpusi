import axios from "@/shared/api/axios";

export async function fetchUploadedFiles() {
  try {
    const response = await axios.get("/files/my_files/");
    return response.data; // ожидается массив файлов
  } catch (error) {
    console.error("Ошибка при получении файлов:", error);
    return []; // Возвращаем пустой список при ошибке
  }
}

export async function UploadFiles(formData, config = {}) {
  try {
    const response = await axios.post("/files/upload/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...config, // 👈 добавим поддержку onUploadProgress
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data || { detail: "Произошла ошибка при загрузке" };
  }
}
