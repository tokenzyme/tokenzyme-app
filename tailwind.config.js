const primaryColor = '#6366f1';
const successColor = '#22c55e';
const dangerColor = '#ef4444';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx,html}'],
  darkMode: 'selector',
  theme: {
    extend: {
      backgroundColor: {
        primary: primaryColor,
        success: successColor,
        danger: dangerColor,
      },
      stroke: {
        primary: primaryColor,
        success: successColor,
        danger: dangerColor,
      },
      strokeWidth: {
        3: '3px',
        4: '4px',
      },
      textColor: {
        primary: primaryColor,
        success: successColor,
        danger: dangerColor,
        secondary: 'var(--text-color-secondary)',
      },
    },
  },
  plugins: [],
};
