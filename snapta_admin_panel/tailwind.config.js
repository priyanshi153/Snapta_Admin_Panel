



module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // This is important
  important: true, // <-- ADD THIS LINE
  theme: {
    extend: {
      backgroundImage: {
        'button-gradient' : 'linear-gradient(213deg, #6C47B7 -27.59%, #341F60 105.15%)',
        // 'button-gradient': 'linear-gradient(141.72deg, #239C57 -1.01%, #019FC8 103.86%)  ',  //dark purple color
        
        // opacityGradient: '#E7F5F4', //light green 
        // 'header':'linear-gradient(141.72deg, #239C57 -1.01%, #019FC8 103.86%)', 
        'header' : 'linear-gradient(213deg, #6C47B7 -27.59%, #341F60 105.15%)',
    

      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'gradient': "linear-gradient(213deg, #6C47B7 -27.59%, #341F60 105.15%)",
        primary: "var(--color-primary)",
        opacityGradient: '#6C47B740',
        secondary: "var(--color-secondary)",
        borderColor: "var(--border-color)",
        lightText: "var(--light-text)",
        darkText: "var(--dark-text)",
        tableLight:"var(--table-light-large)",
        tableDarkLarge:"var(--table-dark-large)",
        tableLightLarge:"var(--table-light-large)",
        // header:"linear-gradient(141.72deg, #239C57 -1.01%, #019FC8 103.86%)", 
        // header:'#239C57',
        header:'#452B7A',
        sidebarText:"#452B7A",
        buttonBackground:"linear-gradient(213deg, #6C47B7 -27.59%, #341F60 105.15%)",
        iconColor:"var(--icon-color)"

      },

    },
  },
  plugins: [
   
      function ({ addUtilities }) {
        addUtilities({
          '.text-icon-gradient': {
            backgroundImage: 'linear-gradient(141.72deg, #239C57 -1.01%, #019FC8 103.86%)',
            backgroundClip: 'text',
            // WebkitBackgroundClip: 'text',
            // color: 'transparent',
            // WebkitTextFillColor: 'transparent',
            display: 'inline-block',
          },
        });
      },
   
    
  ],  
};

