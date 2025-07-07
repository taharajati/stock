/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        'vazir': ['Vazir', 'tahoma', 'Arial', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'slide-in-bottom': 'slideInBottom 0.5s ease-out forwards',
        'slide-in-top': 'slideInTop 0.5s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInBottom: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInTop: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      boxShadow: {
        'blue-glow': '0 0 15px 5px rgba(59, 130, 246, 0.30)',
        'neon': '0 0 5px theme("colors.blue.400"), 0 0 20px theme("colors.blue.600")',
      },
      colors: {
        silver: {
          DEFAULT: '#D6DBDF', // نقره‌ای روشن
        },
        blue: {
          DEFAULT: '#3B82F6', // آبی روشن
        },
        green: {
          DEFAULT: '#22C55E', // سبز روشن
        },
        gold: {
          DEFAULT: '#FFD580', // طلایی روشن
          dark: '#B08D36',
        },
        navy: {
          DEFAULT: '#23406E', // سرمه‌ای روشن
          dark: '#16213E',
        },
        secondary: {
          DEFAULT: '#217A51', // سبز مالی
          dark: '#145239',   // سبز تیره‌تر
        },
        gray: {
          50: '#F5F6FA',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
} 