/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./resources/**/*.blade.php', './resources/**/*.js', './resources/**/*.vue', './resources/**/*.tsx'],
    theme: {
        extend: {
            colors: {
                'custom-blue': '#1DA1F2', // Añade un color personalizado
                'custom-yellow': '#FFD700', // Añade otro color personalizado
            },
        },
    },
    plugins: [require('tailwind-scrollbar')],
};
