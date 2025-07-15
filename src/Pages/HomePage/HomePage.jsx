import UploadedFilesList from "@/entities/file/UploadedFilesList";
import UploadFilesBlock from "@/features/uploadFiles/ui/UploadFilesBlock";
import Header from "@/widgets/Header/Header";

const HomePage = () => {
  return (
    <div className="">
      <Header />
      <main className="p-4">
        <UploadFilesBlock />
        <UploadedFilesList />
      </main>
    </div>
  );
};

export default HomePage;
