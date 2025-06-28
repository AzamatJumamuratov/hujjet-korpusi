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
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 rounded-xl text-center cursor-pointer
          ${
            isDragActive
              ? "bg-blue-100 border-blue-400"
              : "bg-white border-gray-300"
          }`}
      >
        <input {...getInputProps()} />
        <p>
          {isDragActive
            ? "Отпустите файлы здесь..."
            : "Перетащите или кликните для выбора файлов"}
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
