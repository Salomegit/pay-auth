/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        ["./src/**/*.{js,ts,jsx,tsx}"],

    ],
    theme: {
      extend: {
        container: {
            center: true,
            padding: "2rem",
            screens:{
              screens: {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
                "2xl": "1400px"
              }
                  }
        },
        colors: {
          primary: {
            DEFAULT: "#FF6363",
          },
          secondary: "#353535",
        },
      },
    },
    plugins: [
      require('@tailwindcss/container-queries'),

    ],
  };
  