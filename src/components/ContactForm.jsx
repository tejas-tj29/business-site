import {useState} from 'react';

export default function ContactForm() {
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        companyName: '',
        message: ''
    });

    const [statusMessage, setStatusMessage] = useState({
        text : '',
        isError : false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setIsSubmitting(true);
        setStatusMessage({ text: '', isError: false });

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/inquiries`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData) 
            });

            const result = await response.json();

            if (!response.ok) {
            // Check if backend sent specific errors
            if (result.errors) {
                // Combine all errors into one string to show in UI
                const errorText = Object.values(result.errors).flat().join(' | ');
                throw new Error(errorText);
            }
            throw new Error(result.message || "Failed to submit.");
        }

            setStatusMessage({ text: "Success! Your inquiry has been transmitted directly into the cloud database.", isError: false });

            setFormData({ name: '', email: '', phone: '', companyName: '', message: '' });
        }
        catch (error) {
            console.error("🚨 Frontend Request Execution Catch Block:", error);
            setStatusMessage({ text: error.message || "Network Error: Unable to reach processing servers.", isError: true });
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="max-w-xl mx-auto p-6 bg-slate-900 text-white rounded-2xl shadow-xl my-10">
            <h2 className="text-2xl font-bold mb-6 text-slate-100">B2B Enterprise Inquiry Portal</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Full Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange}
                        className="w-full p-2.5 bg-slate-800 rounded-lg border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Business Email *</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleChange}
                            className="w-full p-2.5 bg-slate-800 rounded-lg border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Contact Number *</label>
                        <input type="text" name="phone" required value={formData.phone} onChange={handleChange}
                            className="w-full p-2.5 bg-slate-800 rounded-lg border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Company Name</label>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange}
                        className="w-full p-2.5 bg-slate-800 rounded-lg border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Project Details / Message *</label>
                    <textarea name="message" required rows="4" value={formData.message} onChange={handleChange}
                        className="w-full p-2.5 bg-slate-800 rounded-lg border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"></textarea>
                </div>

                <button type="submit" disabled={isSubmitting}
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:cursor-not-allowed font-medium rounded-lg text-white transition duration-200 shadow-md">
                    {isSubmitting ? 'Transmitting Over Data Streams...' : 'Submit Commercial Inquiry'}
                </button>
            </form>

            {/* 🚦 Feedback Notification Status Badges */}
            {statusMessage.text && (
                <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${statusMessage.isError ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                    {statusMessage.text}
                </div>
            )}
        </div>
    );
}