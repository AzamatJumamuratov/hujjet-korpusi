import { useEffect, useState } from "react";
import DropZone from "./DropZone";
import FilePreview from "./FilePreview";
import { useUploadFiles } from "../model/useUploadFiles";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNotification } from "@/shared/notification/NotificationProvider";
import { UploadFiles } from "@/shared/api/files"; // API-метод
import { useRevalidator } from "react-router";

const UploadFilesBlock = () => {
  const { filesList, onDrop, removeFile, clearFiles } = useUploadFiles();
  const [uploadProgress, setUploadProgress] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { notify } = useNotification();
  const validator = useRevalidator();

  const handleUpload = async () => {
    if (filesList.length === 0 || isUploading) return;

    const formData = new FormData();
    filesList.forEach((file) => {
      formData.append("file_path", file); // Используй "files[]" если бек ожидает массив
    });

    setIsUploading(true);
    setUploadProgress(0);

    try {
      await UploadFiles(formData, {
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          setUploadProgress(percent);
        },
      });

      notify?.({
        type: "success",
        title: "Успешно",
        description: `${filesList.length} файлов успешно загружено`,
      });

      setUploadProgress(null);
      clearFiles();
      validator.revalidate();
    } catch (error) {
      notify?.({
        type: "error",
        title: "Ошибка загрузки",
        description: error?.detail || "Не удалось загрузить файлы",
      });
      setUploadProgress(null);
    } finally {
      setIsUploading(false);
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
                Загружено: {uploadProgress}%
              </p>
            </div>
          )}
        </div>
      )}

      <Button
        disabled={filesList.length === 0 || isUploading}
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-700 z-0"
      >
        {isUploading ? "Загрузка..." : "Загрузить"}
      </Button>
    </div>
  );
};

export default UploadFilesBlock;
