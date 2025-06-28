import axios from "@/shared/api/axios"; // твой instance с baseURL и токеном

export async function UploadFiles(formData) {
  try {
    const response = await axios.post("/files/upload/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке файлов:", error);
    throw error.response?.data || { detail: "Произошла ошибка при загрузке" };
  }
}
