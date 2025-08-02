// src/pages/LoginPage.tsx
import { Button } from "../components/ui/Button";

export default function LoginPage() {
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold text-emerald-700 mb-4">Login</h2>
            <input type="email" placeholder="Email" className="input" />
            <input type="password" placeholder="Password" className="input" />
            <Button className="w-full mt-4">Login</Button>
        </div>
    );
}
