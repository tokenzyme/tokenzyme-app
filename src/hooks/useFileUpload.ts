interface UseFileUploadHook {
  uploadFile: (blob: Blob, signedUrl: string) => Promise<void>;
}

export const useFileUpload = (): UseFileUploadHook => {
  const uploadFile = async (blob: Blob, signedUrl: string): Promise<void> => {
    await fetch(signedUrl, {
      method: 'PUT',
      headers: { 'x-amz-acl': 'public-read' },
      body: blob,
    });
  };

  return { uploadFile };
};
