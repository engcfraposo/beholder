import "dotenv/config";
import aes from 'aes-js';

const aesKey = process.env.AES_KEY? process.env.AES_KEY : "TextMustBe32BytesLongandExactter";
const key = aes.utils.utf8.toBytes(aesKey);

if(key.length !== 32) {
  throw new Error('Invalid key size for AES. Must be 256-bit / 32 bytes.');
}

function encrypt(text: string) {
  const bytes = aes.utils.utf8.toBytes(text);
  const aesCTR = new aes.ModeOfOperation.ctr(key);
  const encryptedBytes = aesCTR.encrypt(bytes);
  return aes.utils.hex.fromBytes(encryptedBytes);
}

function decrypt(encryptedHex: string) {
  const encryptedBytes = aes.utils.hex.toBytes(encryptedHex);
  const aesCtr = new aes.ModeOfOperation.ctr(key);
  const decryptedBytes = aesCtr.decrypt(encryptedBytes);
  return aes.utils.utf8.fromBytes(decryptedBytes);
}

export default {
  encrypt,
  decrypt,
}
