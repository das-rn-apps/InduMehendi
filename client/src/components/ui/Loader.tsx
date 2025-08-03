// src/components/ui/Loader.tsx
interface LoaderProps {
    message?: string;
    className?: string;
}

export const Loader = ({ message = "Loading...", className = "" }: LoaderProps) => {
    return (
        <div className={`flex flex-col items-center justify-center py-10 ${className}`}>
            <div className="loader-circle mb-3" />
            <p className="text-sm text-gray-400">{message}</p>
        </div>
    );
};
