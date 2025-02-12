import type {Config} from "tailwindcss";
import colors from 'tailwindcss/colors';

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: '#3B82F6',      // Corresponds to blue-500
                primaryDark: '#1E3A8A',  // Corresponds to blue-900
                textLight: '#F3F4F6',    // Corresponds to gray-100
                textMuted: '#D1D5DB',    // Corresponds to gray-300
                borderDark: '#374151',   // Corresponds to gray-700
                blackOpacity: 'rgba(0, 0, 0, 0.3)', // For opacity
                gray: {
                    ...colors.gray,
                    850: '#1a1a1a',
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
