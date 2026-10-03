export default function Button({ children, onClick, variant = 'primary', className = '', icon: Icon, disabled }) {
  const baseStyles = "inline-flex items-center justify-center px-4 py-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-sm";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-blue-600 focus:ring-primary/50 shadow-primary/20",
    secondary: "bg-dark-700 text-white hover:bg-dark-600 focus:ring-dark-500 border border-dark-600",
    danger: "bg-danger text-white hover:bg-red-600 focus:ring-danger/50 shadow-danger/20",
    outline: "border border-primary text-primary hover:bg-primary/10 focus:ring-primary/50"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
}
