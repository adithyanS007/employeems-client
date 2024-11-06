import React,{ useState} from "react";
import axios from 'axios'
import LoginImg from "../assets/loginPageImg.jpg";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const {login} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login", 
                { email, password }
            );
            console.log("Response: ", response.data); // Log the response
    
            if (response.data.success) {
            
                login(response.data.user);
                localStorage.setItem("token", response.data.token);
                if (response.data.user.role === "admin") {
                    navigate('/admin-dashboard');
                } else {
                    navigate("/employee-dashboard");
                }
            }
        } catch (error) {
            console.log("Error: ", error.response || error); // Log any errors
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError("Server Error");
            }
        }
    };
    

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
            <div className="hidden sm:block">
                <img className="w-full h-full object-cover" src={LoginImg} alt="" />
            </div>

            <div className="bg-gray-100 flex flex-col justify-center">

                {/* <h2 className="mb-20 text-3xl font-bold text-[#00df9a] ml-5">ePulse.</h2> */}
                <h1 className="text-[#00df9a] md:text-5xl sm:text-4xl text-3xl font-slab font-bold md:py-6 mb-10 flex justify-center">
                    Welcome back
                </h1>

                <form onSubmit={handleSubmit} action="" className="max-w-[400px] w-full mx-auto mb-12 bg-white p-4 rounded-md ">
                    <h2 className="text-4xl font-bold text-center py-6">LOGIN</h2>

                    {error && <p className="text-red-500">{error}</p>}

                    <div className="flex flex-col py-2">
                        <label htmlFor="email">Email</label>
                        <input className="border p-2" type="email" onChange={(e) =>setEmail(e.target.value)} required />
                    </div>
                    <div className="flex flex-col py-2">
                        <label htmlFor="password">Password</label>
                        <input className="border p-2" type="password" onChange={(e) =>setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="border w-full my-5 py-2 bg-[#00df9a] hover:bg-[#78e7c4] text-white rounded-md ">Sign In</button>
                    <div className="flex justify-between">
                        <p className="flex items-center">
                            <input className="mr-2" type="checkbox" />
                            Remember me
                        </p>
                        <a href="#">Forgot password?</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
