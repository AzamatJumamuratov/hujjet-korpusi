import { useCallback, useState } from "react";

export const useUploadFiles = () => {
  const [filesList, setFilesList] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFilesList((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const removeFile = (index) => {
    setFilesList((prev) => prev.filter((_, i) => i !== index));
  };

  const clearFiles = () => {
    setFilesList([]);
  };

  return { filesList, onDrop, removeFile, clearFiles };
};
