/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./resources/**/*.blade.php', './resources/**/*.js', './resources/**/*.vue', './resources/**/*.tsx'],
    theme: {
        extend: {
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            animation: {
                fadeIn: 'fadeIn 1s ease-in-out',
            },
            colors: {
                'custom-blue': '#1DA1F2', // Añade un color personalizado
                'custom-yellow': '#FFD700', // Añade otro color personalizado
            },
        },
    },
    plugins: [],
};
