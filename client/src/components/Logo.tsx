export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`${className} bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
      AT
    </div>
  );
}