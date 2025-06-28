import { useEffect, useState } from "react";
import DropZone from "./DropZone";
import FilePreview from "./FilePreview";
import { useUploadFiles } from "../model/useUploadFiles";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import axios from "@/shared/api/axios";
import { useNotification } from "@/shared/notification/NotificationProvider";

const UploadFilesBlock = () => {
  const { filesList, onDrop, removeFile, clearFiles } = useUploadFiles();
  const [uploadProgress, setUploadProgress] = useState(null);
  const { notify } = useNotification();

  const handleUpload = async () => {
    if (filesList.length === 0) return;

    const formData = new FormData();
    filesList.forEach((file) => {
      formData.append("files", file); // Или formData.append("files[]", file) — зависит от бэкенда
    });

    try {
      await axios.post("/files/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          setUploadProgress(percent);
        },
      });

      notify?.({
        type: "success",
        title: "Файлы загружены",
        description: `${filesList.length} файлов успешно отправлено`,
      });

      setUploadProgress(null);
      clearFiles();
    } catch (error) {
      setUploadProgress(0);
      notify?.({
        type: "error",
        title: "Ошибка загрузки",
        description:
          error?.response?.data?.detail || "Не удалось загрузить файлы",
      });
    }
  };

  useEffect(() => {
    return () => {
      setUploadProgress(null);
      clearFiles?.();
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center p-4">
      <DropZone onDrop={onDrop} />

      {filesList.length > 0 && (
        <div className="w-full max-w-md space-y-2">
          {filesList.map((file, index) => (
            <FilePreview
              key={file.name + index}
              file={file}
              index={index}
              onRemove={removeFile}
            />
          ))}

          {uploadProgress !== null && (
            <div className="mt-2">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-sm text-gray-500 text-center mt-1">
                Общий прогресс: {uploadProgress}%
              </p>
            </div>
          )}
        </div>
      )}

      <Button
        disabled={filesList.length === 0 || uploadProgress !== null}
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-700 z-0"
      >
        Загрузить
      </Button>
    </div>
  );
};

export default UploadFilesBlock;
