module.exports = {
  darkMode: "class",
  theme: {
    
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',  
      '3xl': { 'raw': '(min-width: 1920px) and (min-height: 638px)' },  // ✅ custom breakpoint for 1080p+
      '4k': '2560px',   // ✅ optional for 4K
    },
    extend: {},
  },
};
