import { useDropZoneLogic } from "../model/useDropZoneLogic";
import { useState } from "react";

const DropZone = ({ onDrop }) => {
  const [errors, setErrors] = useState([]);

  const onDropAccepted = (files) => {
    setErrors([]);
    onDrop(files);
  };

  const onDropRejected = (fileRejections) => {
    const messages = [];

    fileRejections.forEach(({ file, errors }) => {
      errors.forEach((e) => {
        if (e.code === "file-too-large") {
          messages.push(`${file.name} слишком большой`);
        } else if (e.code === "file-invalid-type") {
          messages.push(`${file.name} имеет неподдерживаемый тип`);
        }
      });
    });

    setErrors(messages);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropZoneLogic({
    onDrop: onDropAccepted,
    onDropRejected,
    multiple: true,
    maxSize: 25 * 1024 * 1024,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 rounded-xl cursor-pointer transition-colors duration-200
      flex items-center justify-center text-center min-h-[80px] w-full max-w-xl mx-auto
      ${
        isDragActive
          ? "bg-blue-100 border-blue-400"
          : "bg-white border-gray-300"
      }`}
      >
        <input {...getInputProps()} />

        {/* Текст отображения */}
        <p className="relative w-full text-base text-gray-700 font-medium">
          {isDragActive
            ? "Отпустите файлы здесь..."
            : "Перетащите или кликните для выбора файлов"}

          {/* Невидимый "заполнитель", который держит ширину */}
          <span className="invisible absolute pointer-events-none">
            Перетащите или кликните для выбора файлов
          </span>
        </p>
      </div>

      {errors.length > 0 && (
        <div className="mt-2 text-sm text-red-500 space-y-1">
          {errors.map((msg, idx) => (
            <p key={idx}>{msg}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropZone;
