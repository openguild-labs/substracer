import html2canvas from 'html2canvas';
import { toJpeg, toPng, toSvg } from 'html-to-image';

export const useCanvasDataExport = () => {
  const convertReactComponentToImageData = async (element: HTMLDivElement) => {
    const canvas = await html2canvas(element, {
      allowTaint: true,
      useCORS: true,
    });

    const croppedCanvas = document.createElement('canvas');
    const cropWidth = canvas.width;
    const cropHeight = canvas.height;

    croppedCanvas.width = cropWidth;
    croppedCanvas.height = cropHeight;

    const data = canvas.toDataURL('image/jpeg');
    return data;
  };

  const handleDownloadImage = async (
    ref: React.MutableRefObject<any | null> | undefined,
    fileName: string,
    fileExtension: string
  ) => {
    const element = ref?.current;
    if (!element) return;

    let dataUrl = '';
    switch (fileExtension) {
      case 'jpeg':
        dataUrl = await toJpeg(ref.current, { cacheBust: true });
        break;
      case 'svg':
        dataUrl = await toSvg(ref.current, { cacheBust: true });
        break;
      case 'png':
        dataUrl = await toPng(ref.current, { cacheBust: true });
        break;
      default:
        break;
    }
    const link = document.createElement('a');
    link.download = `${fileName}.${fileExtension}`;
    link.href = dataUrl;
    link.click();
  };

  return {
    handleDownloadImage,
    convertReactComponentToImageData,
  };
};
