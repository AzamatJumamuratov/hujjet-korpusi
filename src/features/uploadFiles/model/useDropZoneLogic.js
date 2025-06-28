import { useDropzone } from "react-dropzone";

export const useDropZoneLogic = ({
  onDrop,
  onDropRejected,
  maxSize,
  multiple = true,
  accept,
}) => {
  const dropzone = useDropzone({
    onDrop,
    multiple,
    accept,
    onDropRejected,
    maxSize,
  });
  return dropzone;
};
