import { Button } from "@/components/ui/button";

const FilePreview = ({ file, index, onRemove, disableRemove }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-blue-500 text-2xl">📄</div>
        <div className="flex flex-col">
          <p className="font-medium text-gray-900">{file.name}</p>
          <span className="text-sm text-gray-500">
            {(file.size / 1024).toFixed(1)} KB
          </span>
        </div>
      </div>

      <Button
        variant="destructive"
        size="sm"
        onClick={() => onRemove(index)}
        disabled={disableRemove}
      >
        Убрать
      </Button>
    </div>
  );
};

export default FilePreview;
