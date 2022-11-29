/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
        extend: {
            colors: {
                // yellow
                primary: {
                    light:'#FFF8ED',
                    medium: '#FFD496',
                    dark:'#FFBC59'
                },
                //purple
                secondary:{
                    light:'#E3CEEC',
                    medium:'#A16AE8',
                }
            },
            fontFamily: {
                alt: ['"Roboto Condensed"', 'Helvetica', 'Arial', 'sans-serif'],
            },
        },
    },

    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/aspect-ratio'),
    ],
}
