import UploadedFileCard from "./UploadedFileCard";
import SearchBar from "@/shared/SearchBar/ui/SearchBar";
import Pagination from "@/shared/Pagination/Pagination";

const UploadedFilesList = ({
  files,
  count,
  loading,
  pageSize,
  currentPage,
  onSearch,
  onPageChange,
  onRefresh,
}) => {
  const totalPages = Math.ceil(count / pageSize);

  const verifiedFiles = files.filter((file) => file.is_verified);
  const unverifiedFiles = files.filter((file) => !file.is_verified);

  return (
    <div>
      <h1 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
        Ваши Загруженные Файлы
      </h1>

      <SearchBar title="Поиск по имени файла" onType={onSearch} />

      {loading ? (
        <p className="text-gray-500 text-center mt-6">Поиск файлов...</p>
      ) : files.length === 0 ? (
        <p className="text-gray-500 text-center mt-6">
          Нет файлов или ничего не найдено
        </p>
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
                    {...file}
                    onRefresh={onRefresh}
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
                    {...file}
                    onRefresh={onRefresh}
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
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default UploadedFilesList;
