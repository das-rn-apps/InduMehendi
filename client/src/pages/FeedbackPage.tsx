// src/pages/FeedbackPage.tsx
import { useState } from "react";
import { Button } from "../components/ui/Button";

export default function FeedbackPage() {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(message);
        alert("Feedback submitted!");
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold text-emerald-700 mb-4">Give Us Feedback</h2>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your feedback..."
                className="w-full border border-gray-300 p-3 rounded resize-none"
                rows={5}
                required
            />
            <Button className="mt-4 w-full">Submit</Button>
        </form>
    );
}
