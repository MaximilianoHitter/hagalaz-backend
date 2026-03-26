const crypto = require('crypto');

const fingerprintRaw = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36',
  'Win32',
  'es-AR',
  1920,
  1080,
  'America/Argentina/Buenos_Aires',
].join('|');

const fingerprintHash = crypto
  .createHash('sha256')
  .update(fingerprintRaw)
  .digest('hex');

const timestamp = Date.now().toString();

const nonce = crypto.randomUUID();

console.log('Fingerprint', fingerprintHash);
console.log('Timestamp', timestamp);
console.log('Nonce', nonce);
