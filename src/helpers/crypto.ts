import {AES_CTR, convertHex, convertUtf8, Counter} from "@/helpers/aes";

function stringToCodesArray(data: string){
  return data.split('').map((_, index) => data.charCodeAt(index));
}

export function encryptText(key: string, text: string): string {
  const keySerialized = stringToCodesArray(key);
  const textBytes = convertUtf8.toBytes(text);

  const aesCtr = new AES_CTR(keySerialized, new Counter(5));
  const encryptedBytes = aesCtr.encrypt(textBytes);
  return convertHex.fromBytes(encryptedBytes);
}

export function decryptText(key: string, encryptedHex: string): string {
  const keySerialized = stringToCodesArray(key);
  const aesCtr = new AES_CTR(keySerialized, new Counter(5));
  const encryptedBytes = convertHex.toBytes(encryptedHex);
  const decryptedBytes = aesCtr.decrypt(encryptedBytes);
  return convertUtf8.fromBytes(decryptedBytes);
}
