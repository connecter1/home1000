export const isValidUsername = (username) => /^[A-Za-z0-9_]{3,50}$/.test(username);
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const isValidPassword = (password) => /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password);
export const isValidTitle = (title) => /^[\w\s]{3,255}$/.test(title);
export const isValidDescription = (desc) => !desc || desc.length <= 1000;
export const isValidDate = (dateStr) => {
  const today = new Date().toISOString().slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr) && dateStr >= today;
};
export const isValidUUID = (uuid) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(uuid);
export const isBoolean = (val) => typeof val === "boolean";