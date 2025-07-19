export const effects = {
  blur: {
    sm: 'blur(4px)',
    md: 'blur(8px)',
    lg: 'blur(16px)',
    xl: 'blur(24px)',
  },
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    glass: '0 25px 50px rgba(0, 0, 0, 0.5)',
  },
  gradient: {
    primary: 'linear-gradient(45deg, #a855f7, #ec4899)',
    primaryHover: 'linear-gradient(45deg, #7c3aed, #db2777)',
    text: 'linear-gradient(45deg, #c084fc, #f472b6, #a855f7)',
  },
} as const;
