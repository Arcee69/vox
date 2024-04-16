/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      screens: {
        xs: '300px',
        sm: '600px', 
        md: '700px',
        lg: '1024px',
        xl: '1400px'
      },

      fontFamily: {
        'inter': ['Inter'],
        'poppins': ['Poppins'],
      },

      screens: {
        xs: "300px",  //360px
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },

      colors: {
        MODAL_BACKGROUND: "rgba(0, 0, 0, 0.23)",

        BLACK: {
          _100: "#000"
        },
        
        WHITE: {
          _100: "#FFF"
        },

        RED: {
          _100: "#AF202D"
        }
        
      }
    },
  },
  plugins: [],
}