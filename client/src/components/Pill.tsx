interface PillProps {
  children: React.ReactNode;
  variant?: "fan" | "model" | "default";
}

export default function Pill({ children, variant = "default" }: PillProps) {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium";
  
  const variantClasses = {
    fan: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    model: "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground",
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}