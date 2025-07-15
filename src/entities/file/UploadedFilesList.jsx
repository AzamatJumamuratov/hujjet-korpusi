import { useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router";
import UploadedFileCard from "./UploadedFileCard";
import SearchBar from "@/shared/SearchBar/ui/SearchBar";
import axios from "@/shared/api/axios";
import Pagination from "@/shared/Pagination/Pagination";

const UploadedFilesList = () => {
  const loaderData = useLoaderData();

  const initialFiles = useMemo(() => {
    return Array.isArray(loaderData?.files?.results)
      ? loaderData.files.results
      : [];
  }, [loaderData]);

  const initialCount = loaderData?.files?.count || 0;

  const [files, setFiles] = useState(initialFiles);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;
  const totalPages = Math.ceil(count / pageSize);

  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const params = { page: currentPage };
      if (searchQuery.trim()) {
        params.file_name = searchQuery.trim();
      }

      const response = await axios.get("/files/my_files/", { params });
      const results = Array.isArray(response.data?.results)
        ? response.data.results
        : [];

      setFiles(results);
      setCount(response.data?.count || 0);
    } catch (error) {
      console.error("Ошибка при получении файлов:", error);
      setFiles([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [searchQuery, currentPage]);

  useEffect(() => {
    setFiles(initialFiles);
    setCount(initialCount);
  }, [initialFiles, initialCount]);

  const verifiedFiles = files.filter((file) => file.is_verified);
  const unverifiedFiles = files.filter((file) => !file.is_verified);

  return (
    <div>
      <h1 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
        Ваши Загруженные Файлы
      </h1>

      {count > 0 && (
        <SearchBar title="Поиск по имени файла" onType={handleSearch} />
      )}

      {loading ? (
        <p className="text-gray-500 text-center mt-6">Поиск файлов...</p>
      ) : files.length === 0 ? (
        <p className="text-gray-500 text-center mt-6">Нет загруженных файлов</p>
      ) : (
        <div className="flex flex-col gap-8 mt-4">
          {verifiedFiles.length > 0 && (
            <section>
              <h2 className="text-lg font-medium mb-2 text-green-700">
                ✅ Верифицированные файлы
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {verifiedFiles.map((file) => (
                  <UploadedFileCard
                    key={file.uuid}
                    id={file.uuid}
                    title={file.title}
                    size={file.file_size}
                    type={file.file_type}
                    download_url={file.download_url}
                    original_url={file.file_path}
                    readOnly
                  />
                ))}
              </div>
            </section>
          )}

          {unverifiedFiles.length > 0 && (
            <section>
              <h2 className="text-lg font-medium mb-2 text-yellow-600">
                ⏳ Неверифицированные файлы
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {unverifiedFiles.map((file) => (
                  <UploadedFileCard
                    key={file.uuid}
                    id={file.uuid}
                    title={file.title}
                    size={file.file_size}
                    type={file.file_type}
                    download_url={file.download_url}
                    original_url={file.file_path}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default UploadedFilesList;
