export function randomEmail() {
  return `user+${Date.now()}@example.com`;
}

export function randomPassword() {
  return `P@ssw0rd${Math.floor(Math.random() * 10000)}`;
}
