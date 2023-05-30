import { ClockIcon } from "@heroicons/react/outline";

export const getDummyPicture = (
  keyword: string,
  category: string = "initials"
) => {
  return `https://avatars.dicebear.com/api/${category}/${encodeURI(
    keyword
  )}.svg`;
};

export const getBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};