export type FileImageItem = {
  id: number;
  url: string;
  extension: string;
  name: string;
  data: ArrayBuffer;
  uploadToken?: string;
};
