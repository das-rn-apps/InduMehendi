// src/pages/BookingPage.tsx
import { Button } from "../components/ui/Button";
import { useState } from "react";

export default function BookingPage() {
    const [form, setForm] = useState({ name: '', date: '', contact: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form);
        alert("Booking submitted!");
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-emerald-700">Book Your Mehendi Slot</h2>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required className="input" />
            <input name="date" value={form.date} onChange={handleChange} type="date" required className="input" />
            <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact Number" required className="input" />
            <Button className="mt-4 w-full">Submit</Button>
        </form>
    );
}
