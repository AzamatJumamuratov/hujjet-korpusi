import { Button } from "@/components/ui/button";

const UploadedFileCard = ({
  name = "Файл",
  size = "~1.2 MB",
  type = "DOCX",
}) => {
  return (
    <div className="flex flex-col gap-4 justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <div className="text-3xl text-blue-500">📄</div>

        <div className="flex flex-col">
          <p className="font-medium text-gray-900">{name}</p>
          <span className="text-sm text-gray-500">
            {size} • {type}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Button variant="outline" className="w-full">
          Скачать .txt
        </Button>
        <Button variant="default" className="w-full">
          Скачать оригинал
        </Button>
        <Button
          variant="secondary"
          className="w-full text-red-600 hover:bg-red-100"
        >
          Удалить
        </Button>
      </div>
    </div>
  );
};

export default UploadedFileCard;
