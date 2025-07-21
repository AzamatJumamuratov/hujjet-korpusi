import UploadedFilesList from "@/entities/file/UploadedFilesList";
import UploadFilesBlock from "@/features/uploadFiles/ui/UploadFilesBlock";
import Header from "@/widgets/Header/Header";
import { useState, useEffect } from "react";
import { fetchUploadedFiles } from "@/shared/api/files";

const HomePage = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const { results, count } = await fetchUploadedFiles({
        page: currentPage,
        pageSize,
      });
      setFiles(results);
      setCount(count);
    } catch (err) {
      console.error("Ошибка загрузки файлов:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [currentPage]);

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
          onRefresh={fetchFiles}
        />
      </main>
    </div>
  );
};

export default HomePage;
