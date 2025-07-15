import { Button } from "@/components/ui/button";
import { useNotification } from "@/shared/notification/NotificationProvider";
import axios from "@/shared/api/axios";
import { useRevalidator } from "react-router";
import { useState } from "react";
import Spinner from "@/shared/spinner/Spinner";

const UploadedFileCard = ({
  id,
  title = "Файл",
  size = "~1.2 MB",
  type = "DOCX",
  original_url = "",
  download_url = "",
  readOnly = false, // 👈 новый проп
}) => {
  // ... другие хуки
  const [isDeleting, setIsDeleting] = useState(false);
  const { notify } = useNotification();
  const validator = useRevalidator();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`/files/delete/${id}`);
      notify({
        type: "success",
        title: "Успешно!",
        description: "Файл удален успешно!",
      });
      validator.revalidate();
    } catch (error) {
      notify({
        type: "error",
        title: "Ошибка",
        description: "Не удалось удалить файл",
      });
    }
  };

  const downloadFile = async (url, filename) => {
    try {
      const response = await axios.get(url, { responseType: "blob" });
      const blob = new Blob([response.data]);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    } catch (err) {
      console.error("Ошибка при скачивании .txt файла", err);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <div className="text-3xl text-blue-500">📄</div>
        <div className="flex flex-col">
          <p className="font-medium text-gray-900">{title}</p>
          <span className="text-sm text-gray-500">
            {size} • {type}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {download_url ? (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              const filename = decodeURIComponent(
                download_url.split("/").pop() || `${title}.txt`
              );
              downloadFile(download_url, filename);
            }}
          >
            Скачать .txt
          </Button>
        ) : (
          <p className="text-sm text-gray-500 text-center">
            Конвертация в процессе...
          </p>
        )}

        {!readOnly && (
          <>
            <Button variant="default" className="w-full" asChild>
              <a href={original_url} download>
                Скачать оригинал
              </a>
            </Button>

            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              variant="secondary"
              className="w-full text-red-600 hover:bg-red-100"
            >
              {isDeleting ? <Spinner /> : "Удалить"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadedFileCard;
