import axios from "@/shared/api/axios";

export async function fetchUploadedFiles() {
  try {
    const response = await axios.get("/files/my_files/");
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении файлов:", error);
    return [];
  }
}

export async function UploadFiles(formData, config = {}) {
  try {
    const response = await axios.post("/files/upload/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...config,
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data || { detail: "Произошла ошибка при загрузке" };
  }
}

export async function fetchTxtContent(uuid) {
  try {
    const response = await axios.get(`/files/text/${uuid}`);
    return response.data?.text || "";
  } catch (error) {
    console.error("Ошибка при получении текста .txt файла:", error);
    throw new Error("Не удалось получить текст файла");
  }
}

export async function updateTxtContent(uuid, text) {
  try {
    const response = await axios.post("/files/update/", {
      uuid,
      text,
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении файла:", error);
    throw new Error("Не удалось обновить файл");
  }
}

export const updateFileDescription = async (fileId, description) => {
  try {
    const response = await axios.post(`/files/description/${fileId}/`, {
      description,
    });
    return response.data;
  } catch (error) {
    // Обработка ошибок от сервера
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }

    // Обработка ошибок валидации или других полей
    if (error.response?.data) {
      const messages = Object.values(error.response.data).flat().join("\n");
      throw new Error(messages);
    }

    // Неизвестная ошибка
    throw new Error("Произошла ошибка при обновлении описания файла.");
  }
};

export const searchFiles = async (file_name) => {
  const res = await axios.get("/files/search/", {
    params: { args: file_name },
  });
  return res.data; // должен возвращать массив файлов
};
