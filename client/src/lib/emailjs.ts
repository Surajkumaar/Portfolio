import { init } from '@emailjs/browser';

// Initialize EmailJS with your public key
export const initEmailJS = () => {
  init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '');
};
