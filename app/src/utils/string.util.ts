import CryptoJS from "crypto-js";
import slugify from "slugify";
import ReactDOMServer from "react-dom/server";

export const shortenString = (str: string, maxLength: number) =>
  str?.length > maxLength ? `${str.slice(0, maxLength)}...` : str;

export const stringInArray = (
  stringArray: string[],
  cmpString: string
): boolean => stringArray.some((ele) => ele === cmpString);

export const isValidUrl = (url: string) => {
  const hrefRegex =
    /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/\S*)?$/;
  return hrefRegex.test(url);
};

export function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const buildSlug = (name: string, noNonce?: boolean) => {
  return `${slugify(name as string, {
    lower: true,
    strict: true,
    trim: true,
  })}${!noNonce ? `-${makeid(5)}` : ""}`;
};

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function toHex(str: string) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}

export function generateHSLColor(text: string): string {
  // Calculate a numeric value based on the text
  let numericValue = 0;
  for (let i = 0; i < text.length; i++) {
    numericValue += text.charCodeAt(i);
  }

  // Generate HSL values
  const hue = numericValue % 360; // Hue value between 0 and 359
  const saturation = 70; // Fixed saturation value of 70%
  const lightness = 50; // Fixed lightness value of 50%

  // Construct the HSL color string
  const hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  return hslColor;
}

export const voidCallback = () => {
  return;
};

export function renderTime(seconds: number) {
  const _seconds = parseInt(seconds?.toString());
  const hours = Math.floor(_seconds / 3600);
  const minutes = Math.floor((_seconds % 3600) / 60);
  const remainingSeconds = _seconds % 60;

  const timeParts: string[] = [];
  if (hours > 0) {
    timeParts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
  }
  if (minutes > 0) {
    timeParts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
  }
  if (remainingSeconds > 0 || timeParts.length === 0) {
    timeParts.push(
      `${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`
    );
  }

  const timeString = timeParts.join(" ");
  return timeString;
}

export function convertSecondsToTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const timeString = `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(
    remainingSeconds
  )}`;
  return timeString;
}

function padNumber(number: number) {
  return String(number).padStart(2, "0");
}

export const getURLOrigin = (url: string) => {
  try {
    const _url = new URL(url);
    return _url.origin;
  } catch (error) {
    return url;
  }
};

export const getURLHost = (url: string) => {
  try {
    const _url = new URL(url);
    return _url.hostname;
  } catch (error) {
    return url;
  }
};

export function encryptData<T>(obj: T, secretPass: string) {
  const data = CryptoJS.AES.encrypt(JSON.stringify(obj), secretPass).toString();
  return data;
}

export function decryptData<T>(
  encryptedMessage: string,
  secretPass: string
): T {
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, secretPass);
  const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return data as T;
}

export const isValidEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const generateRandomRgbaStr = () => {
  return `rgba(${Math.floor(Math.random() * 150) + 0}, ${
    Math.floor(Math.random() * 150) + 0
  }, ${Math.floor(Math.random() * 150) + 0})`;
};

export const bufferToUint8Array = (bufferData: any) => {
  return new Uint8Array(
    bufferData.buffer,
    bufferData.byteOffset,
    bufferData.byteLength / Uint8Array.BYTES_PER_ELEMENT
  );
};

export function range(from: number, to: number): number[] {
  const r: number[] = [];
  for (let i = from; i <= to; i++) {
    r.push(i);
  }
  return r;
}

export function getTimeStampByDate(t: Date | number | string): number {
  const d = new Date(t);

  return d.getTime();
}

export function getDateString(
  t: Date | number | string,
  format = "yyyy/MM/dd hh:mm:ss"
): string {
  const d = new Date(getTimeStampByDate(t));

  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();

  const formatedString = format
    .replace("yyyy", String(year))
    .replace("MM", String(month))
    .replace("dd", String(date))
    .replace("hh", String(hours))
    .replace("mm", String(minutes))
    .replace("ss", String(seconds));

  return formatedString;
}

export async function copyTextToClipboard(text: string) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error: unknown) {
      console.warn("Copy to clipboard failed.", error);
    }
  } else {
    console.warn("Copy to clipboard failed, methods not supports.");
  }
}

export function waitImageLoaded(image: HTMLImageElement): Promise<void> {
  image.loading = "eager";

  return new Promise((resolve, reject) => {
    image.onload = () => {
      // NOTE: There is image loading problem in Safari, fix it with some trick
      setTimeout(() => {
        resolve();
      }, 200);
    };
    image.onerror = () => {
      reject("Image load failed");
    };
  });
}

export function calcBytes(d: any): number {
  let bytes = 0;

  if (typeof d === "number") {
    bytes += 8;
  } else if (typeof d === "string") {
    bytes += d.length * 2;
  } else if (typeof d === "boolean") {
    bytes += 1;
  } else if (typeof d === "object") {
    if (Array.isArray(d)) {
      for (const i of d) {
        bytes += calcBytes(i);
      }
    } else {
      for (const k in d) {
        bytes += calcBytes(d[k]);
      }
    }
  }

  return bytes;
}

export function calcReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordAmount = content.split(" ").length;
  if (wordAmount <= 200) {
    return "less than 1 min read";
  }

  const count = Math.ceil(wordAmount / wordsPerMinute);
  return `${count} min read`;
}

export function getBase64Image(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.setAttribute("crossOrigin", "anonymous");

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject("Get canvas context failed.");
        return;
      }
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };

    img.onerror = function () {
      reject("The image could not be loaded.");
    };
  });
}

export function absolutifyLink(rel: string): string {
  const anchor = document.createElement("a");
  anchor.setAttribute("href", rel);
  return anchor.href;
}

export function encodeSvg(reactElement: any) {
  return (
    "data:image/svg+xml," +
    escape(ReactDOMServer.renderToStaticMarkup(reactElement))
  );
}
