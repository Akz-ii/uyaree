/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aerospace: {
          bg: "#070B14",
          card: "#0F172A",
          border: "#1E293B",
          hover: "#1E293B",
          cyan: "#00F0FF",
          sky: "#38BDF8",
          blue: "#2563EB",
          healthy: "#10B981",
          warning: "#F59E0B",
          critical: "#EF4444",
          text: "#F8FAFC",
          muted: "#94A3B8"
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'radar-scan': 'scan 4s linear infinite',
        'glow-pulse': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 4px rgba(0, 240, 255, 0.4))' },
          '100%': { opacity: '1', filter: 'drop-shadow(0 0 12px rgba(0, 240, 255, 0.9))' },
        }
      }
    },
  },
  plugins: [],
}
