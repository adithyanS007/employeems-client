import React, { useState } from "react";
import axios from "axios";

const SendEmail = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        from: "",
        to_email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        try {
            await axios.post("https://employeems-server-eta.vercel.app/api/notify/send-email", formData);
            alert("Email sent successfully");
            console.log(formData)
        } catch (error) {
            console.error("Error sending email", error);
            alert("Failed to send email");
        }
        setLoading(false); // Set loading back to false after the request
    };

    return (
        <div className="pt-16">
            <h2 className="text-center text-3xl font-bold pb-5">Notify Employees</h2>

            <div>
                <form onSubmit={handleSubmit} className="max-w-[400px] w-full mx-auto mb-12 bg-white p-4 rounded-md">
                    <h2 className="text-center text-2xl font-serif text-[#00df9a] pb-2">Send Email</h2>

                    <div className="flex flex-col py-3">
                        <input
                            className="border p-2 border-[#00df9a] rounded-md"
                            type="text"
                            name="from"
                            required
                            placeholder="From Name"
                            value={formData.from}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col py-2">
                        <input
                            className="border border-[#00df9a] rounded-md p-2"
                            type="email"
                            name="to_email"
                            required
                            placeholder="To Email"
                            value={formData.to_email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col py-3">
                        <input
                            className="border border-[#00df9a] rounded-md p-2"
                            type="text"
                            name="subject"
                            required
                            placeholder="Enter Subject"
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col py-2">
                        <textarea
                            name="message"
                            cols={48}
                            rows={5}
                            className="border border-[#00df9a] rounded p-2"
                            placeholder="Leave a message...."
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="border w-full my-5 py-2 bg-[#03a874] hover:bg-[#3a9778] text-white rounded-md"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SendEmail;
