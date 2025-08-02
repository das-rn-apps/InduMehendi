// src/components/ui/Button.tsx
interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit";
}

export function Button({ children, onClick, className = "", type = "button" }: ButtonProps) {
    return (
        <button type={type} onClick={onClick} className={`bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 ${className}`}>
            {children}
        </button>
    );
}
