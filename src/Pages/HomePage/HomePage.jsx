import UploadedFilesList from "@/entities/file/UploadedFilesList";
import UploadFilesBlock from "@/features/uploadFiles/ui/UploadFilesBlock";
import Header from "@/widgets/Header/Header";
import { useState, useEffect, useCallback } from "react";
import { fetchUploadedFiles, searchFiles } from "@/shared/api/files";

const HomePage = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 12;

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    try {
      if (searchTerm.trim()) {
        const results = await searchFiles(searchTerm);
        setFiles(results.results);
        setCount(results.length);
      } else {
        const { results, count } = await fetchUploadedFiles({
          page: currentPage,
          pageSize,
        });
        setFiles(results);
        setCount(count);
      }
    } catch (err) {
      console.error("Ошибка загрузки файлов:", err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentPage]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <div>
      <Header />
      <main className="p-4">
        <UploadFilesBlock onFileUploaded={fetchFiles} />
        <UploadedFilesList
          files={files}
          count={count}
          pageSize={pageSize}
          loading={loading}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onSearch={handleSearch}
          onRefresh={fetchFiles}
          disablePagination={!!searchTerm.trim()}
        />
      </main>
    </div>
  );
};

export default HomePage;
