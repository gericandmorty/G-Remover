"use client";

// A secret key used to XOR/obfuscate the stored token, ensuring the plain text JWT is not directly readable in cookies
const SECRET_KEY = "g-remover-secure-salt-token-key";

/**
 * Obfuscates a plaintext string using an XOR cipher and base64 encoding
 */
function obfuscate(text: string): string {
  try {
    const xorred = text.split("").map((char, idx) => {
      const keyChar = SECRET_KEY.charCodeAt(idx % SECRET_KEY.length);
      return String.fromCharCode(char.charCodeAt(0) ^ keyChar);
    }).join("");
    // Convert to Base64 to ensure it contains only safe ASCII characters for cookie values
    return btoa(unescape(encodeURIComponent(xorred)));
  } catch (error) {
    return text;
  }
}

/**
 * Deobfuscates a cipher string back to plaintext
 */
function deobfuscate(cipher: string): string {
  try {
    const decoded = decodeURIComponent(escape(atob(cipher)));
    return decoded.split("").map((char, idx) => {
      const keyChar = SECRET_KEY.charCodeAt(idx % SECRET_KEY.length);
      return String.fromCharCode(char.charCodeAt(0) ^ keyChar);
    }).join("");
  } catch (error) {
    return cipher;
  }
}

/**
 * Sets an obfuscated cookie value
 */
export function setCookie(name: string, value: string, days: number = 7) {
  if (typeof window === "undefined") return;

  const encodedValue = obfuscate(value);
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "; expires=" + date.toUTCString();
  const secure = window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie = `${name}=${encodedValue}${expires}; path=/${secure}; SameSite=Strict`;
}

/**
 * Retrieves and deobfuscates a cookie value
 */
export function getCookie(name: string): string | null {
  if (typeof window === "undefined") return null;

  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      const encodedValue = c.substring(nameEQ.length, c.length);
      return deobfuscate(encodedValue);
    }
  }
  return null;
}

/**
 * Removes a cookie
 */
export function removeCookie(name: string) {
  if (typeof window === "undefined") return;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict`;
}
