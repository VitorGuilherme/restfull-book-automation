export function getEnv(key, fallback = undefined) {
  return process.env[key] ?? fallback;
}

export function getBaseUrl() {
  return getEnv('BASE_URL', 'http://localhost:3000');
}
