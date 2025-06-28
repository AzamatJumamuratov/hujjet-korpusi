import UploadedFilesList from "@/entities/file/UploadedFilesList";
import UploadFilesBlock from "@/features/uploadFiles/ui/UploadFilesBlock";
import Header from "@/widgets/Header/Header";

const HomePage = () => {
  const files = new Array(6).fill({
    id: 1,
    name: "Добавленный файл",
  });
  return (
    <div className="">
      <Header />
      <main className="p-4">
        <UploadFilesBlock />
        <UploadedFilesList files={files} />
      </main>
    </div>
  );
};

export default HomePage;
