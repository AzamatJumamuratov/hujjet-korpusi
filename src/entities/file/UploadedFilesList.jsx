import { useState } from "react";
import UploadedFileCard from "./UploadedFileCard";
import { Input } from "@/components/ui/input";
import SearchBar from "@/shared/SearchBar/ui/SearchBar";

const UploadedFilesList = ({ files = [] }) => {
  const [search, setSearch] = useState("");
  if (!files.length) {
    return <p className="text-gray-500">Нет загруженных файлов</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
        Ваши Загруженные Файлы
      </h1>
      <SearchBar title="поиск файлов" onType={(value) => setSearch(value)} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {files.map((file, index) => (
          <UploadedFileCard
            key={index}
            name={file.name}
            size={file.size || "~1.2 MB"}
            type={file.type || "DOCX"}
          />
        ))}
      </div>
    </div>
  );
};

export default UploadedFilesList;
