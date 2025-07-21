import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNotification } from "@/shared/notification/NotificationProvider";
import axios from "@/shared/api/axios";
import { useRevalidator } from "react-router";
import Spinner from "@/shared/spinner/Spinner";
import {
  fetchTxtContent,
  updateTxtContent,
  updateFileDescription,
} from "@/shared/api/files";
import ByteToReadable from "@/lib/ByteToReadable";

const UploadedFileCard = ({
  uuid,
  title = "Файл Без Имени",
  file_size = "нет размера",
  file_type = "неизвестный тип файла",
  file_path = "",
  download_url = "",
  description = "",
  onRefresh,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [currentDescription, setCurrentDescription] = useState(
    description || ""
  );
  const [editedDescription, setEditedDescription] = useState(description || "");
  const [isSavingDescription, setIsSavingDescription] = useState(false);
  const [isSavingText, setIsSavingText] = useState(false);
  const [loadingText, setLoadingText] = useState(false);

  const { notify } = useNotification();
  const validator = useRevalidator();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/files/delete/${uuid}`);
      notify({
        type: "success",
        title: "Успешно!",
        description: "Файл удален успешно!",
      });
      onRefresh?.(); // ✅ вызов обновления после удаления
    } catch (error) {
      notify({
        type: "error",
        title: "Ошибка",
        description: "Не удалось удалить файл",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditClick = async () => {
    setIsEditing(true);
    setLoadingText(true);
    try {
      const content = await fetchTxtContent(uuid);
      setEditContent(content);
    } catch (e) {
      notify({
        type: "error",
        title: "Ошибка загрузки текста",
        description: e.message,
      });
      setIsEditing(false);
    } finally {
      setLoadingText(false);
    }
  };

  const handleSaveText = async () => {
    setIsSavingText(true);
    try {
      await updateTxtContent(uuid, editContent);
      notify({
        type: "success",
        title: "Успешно",
        description: "Файл обновлен",
      });
      setIsEditing(false);
      validator.revalidate();
    } catch (error) {
      notify({
        type: "error",
        title: "Ошибка",
        description: error.message,
      });
    } finally {
      setIsSavingText(false);
    }
  };

  const handleCancelEdit = () => {
    setEditContent("");
    setIsEditing(false);
  };

  const handleSaveDescription = async () => {
    setIsSavingDescription(true);
    try {
      await updateFileDescription(uuid, editedDescription);
      setCurrentDescription(editedDescription);
      notify({
        type: "success",
        title: "Сохранено",
        description: "Описание обновлено",
      });
      setIsEditingDescription(false);
      validator.revalidate();
    } catch (error) {
      notify({
        type: "error",
        title: "Ошибка",
        description:
          error?.response?.data?.detail || "Не удалось обновить описание",
      });
    } finally {
      setIsSavingDescription(false);
    }
  };

  const handleCancelDescriptionEdit = () => {
    setEditedDescription(currentDescription);
    setIsEditingDescription(false);
  };

  const downloadTxtFile = async () => {
    try {
      const response = await axios.get(`/files/download_txt/${uuid}/`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "text/plain" });

      // Переопределяем имя файла, убираем расширение из title
      const originalName = title.split(".")[0]; // убираем .docx и т.п.
      const filename = `${originalName} text file.txt`;

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    } catch (err) {
      notify({
        type: "error",
        title: "Ошибка загрузки .txt",
        description: "Не удалось скачать .txt файл",
      });
      console.error("Ошибка при скачивании .txt файла", err);
    }
  };

  const downloadOriginalFile = async () => {
    try {
      const response = await axios.get(`/files/download_base/${uuid}/`, {
        responseType: "blob",
      });
      const blob = new Blob([response.data]);
      const filename = file_path.split("/").pop() || "original_file";
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    } catch (err) {
      notify({
        type: "error",
        title: "Ошибка загрузки файла",
        description: "Не удалось скачать оригинальный файл",
      });
      console.error("Ошибка при скачивании оригинала файла", err);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <div className="text-3xl text-blue-500">📄</div>
        <div className="flex flex-col">
          <p className="font-medium text-gray-900">{title}</p>
          <span className="text-sm text-gray-500">
            {ByteToReadable(file_size)} • {file_type}
          </span>
        </div>
      </div>

      {/* Описание */}
      <div className="flex flex-col gap-2 mt-2">
        {isEditingDescription ? (
          <>
            <textarea
              className="w-full p-2 border rounded-md text-sm text-gray-800"
              rows={3}
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <Button
              className="w-full bg-green-600 text-white hover:bg-green-700"
              onClick={handleSaveDescription}
              disabled={isSavingDescription}
            >
              {isSavingDescription ? "Сохранение..." : "Сохранить описание"}
            </Button>
            <Button
              className="w-full bg-red-100 text-red-600 hover:bg-red-200"
              variant="outline"
              onClick={handleCancelDescriptionEdit}
            >
              Отменить
            </Button>
          </>
        ) : (
          <>
            <p
              className={`text-sm whitespace-pre-line ${
                currentDescription ? "text-gray-700" : "text-gray-400 italic"
              }`}
            >
              {currentDescription ? currentDescription : "нет описания"}
            </p>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => setIsEditingDescription(true)}
            >
              ✏️ Изменить описание
            </Button>
          </>
        )}
      </div>

      {/* Редактирование текста и скачивание */}
      <div className="flex flex-col gap-2 mt-2">
        {download_url ? (
          <Button
            variant="outline"
            className="w-full"
            onClick={downloadTxtFile}
          >
            Скачать .txt
          </Button>
        ) : (
          <p className="text-sm text-gray-500 text-center">
            Конвертация в процессе...
          </p>
        )}

        <Button
          variant="default"
          className="w-full"
          onClick={downloadOriginalFile}
        >
          Скачать оригинал
        </Button>

        {isEditing && (
          <textarea
            className="w-full p-2 border rounded-md text-sm text-gray-800"
            rows={8}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            disabled={loadingText}
          />
        )}

        {!isEditing ? (
          <Button
            variant="secondary"
            onClick={handleEditClick}
            className="w-full"
            disabled={!download_url || loadingText}
          >
            {loadingText ? "Загрузка..." : "Редактировать .txt"}
          </Button>
        ) : (
          <div className="flex flex-col gap-2">
            <Button
              variant="secondary"
              onClick={handleSaveText}
              className="w-full bg-green-600 text-white hover:bg-green-700"
              disabled={isSavingText}
            >
              {isSavingText ? "Сохранение..." : "Сохранить"}
            </Button>
            <Button
              variant="outline"
              onClick={handleCancelEdit}
              className="w-full text-red-600 hover:bg-red-100"
            >
              Отменить
            </Button>
          </div>
        )}

        <Button
          onClick={handleDelete}
          disabled={isDeleting}
          variant="secondary"
          className="w-full text-red-600 hover:bg-red-100"
        >
          {isDeleting ? <Spinner /> : "Удалить"}
        </Button>
      </div>
    </div>
  );
};

export default UploadedFileCard;
