import { push } from "notivue";

export const useOnFileUpload = () => {
  let controller: ReturnType<typeof push.info> | null = null;
  
  const onProgress = (progress: number) => {
    // Destroy previous notification
    if (controller) {
      controller.destroy?.();
    }
    
    // Create new notification with updated progress
    controller = push.info({
      title: "Uploading file...",
      message: `${progress}% uploaded`,
      duration: Infinity, // Keep visible until manually destroyed
    });
  };
  
  const onSuccess = (message = "File uploaded successfully!") => {
    if (controller) {
      controller.destroy?.();
    }
    push.success({
      title: "Success",
      message,
    });
  };
  
  const onError = (message = "Upload failed") => {
    if (controller) {
      controller.destroy?.();
    }
    push.error({
      title: "Error",
      message,
    });
  };
  
  const cleanup = () => {
    if (controller) {
      controller.destroy?.();
      controller = null;
    }
  };
  
  return {
    onProgress,
    onSuccess,
    onError,
    cleanup,
  };
};