import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    FaEnvelope,
    FaGraduationCap,
    FaLock,
    FaUserTie,
    FaAndroid,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Capacitor } from "@capacitor/core";
import toast from "react-hot-toast";
import logo from "../../assets/logo.jpg";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { loginUser } from "../../services/auth.service";
import { useAuth } from "../../hooks/useAuth";

function Login() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [role, setRole] = useState("student");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            return toast.error("Please fill all fields.");
        }

        try {
            setLoading(true);

            const data = await loginUser({
                ...formData,
                role,
            });

            login(data.user, data.token);

            toast.success("Login Successful");

            if (data.user.role === "teacher") {
                navigate("/teacher/dashboard", {
                    replace: true,
                });
            } else {
                navigate("/student/dashboard", {
                    replace: true,
                });
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                    "Login Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-slate-100
                p-5
                dark:bg-slate-950
            "
        >
            <motion.div
                initial={{
                    opacity: 0,
                    y: 40,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                }}
                className="w-full max-w-md"
            >
                <Card className="p-8">
                    <div className="mb-8 text-center">
                        <img
                            src={logo}
                            alt="A.K. Classes"
                            className="mx-auto mb-4 h-20 w-20 rounded-full object-cover shadow-md ring-4 ring-blue-500/20"
                        />

                        <h1 className="text-3xl font-bold">
                            A.K. Classes
                        </h1>

                        <p className="mt-2 text-slate-500">
                            Welcome Back 👋
                        </p>
                    </div>

                    {/* Role Selection */}

                    <div className="mb-6 grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => setRole("student")}
                            className={`rounded-xl border-2 p-4 font-bold transition-all duration-200 ${
                                role === "student"
                                    ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                                    : "border-slate-200 text-slate-700 hover:border-blue-500 dark:border-slate-700 dark:text-slate-200"
                            }`}
                        >
                            <FaGraduationCap className="mx-auto mb-2 text-2xl" />
                            Student
                        </button>

                        <button
                            type="button"
                            onClick={() => setRole("teacher")}
                            className={`rounded-xl border-2 p-4 font-bold transition-all duration-200 ${
                                role === "teacher"
                                    ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                                    : "border-slate-200 text-slate-700 hover:border-blue-500 dark:border-slate-700 dark:text-slate-200"
                            }`}
                        >
                            <FaUserTie className="mx-auto mb-2 text-2xl" />

                            Teacher
                        </button>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            icon={FaEnvelope}
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            icon={FaLock}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            loading={loading}
                        >
                            Login
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-semibold text-blue-600"
                        >
                            Register
                        </Link>
                    </p>
                </Card>

                {!Capacitor.isNativePlatform() && (
                    <div className="mt-6 text-center">
                        <a
                            href="/AK_Classes.apk"
                            download="AK_Classes.apk"
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                bg-emerald-600
                                px-4
                                py-2.5
                                text-sm
                                font-semibold
                                text-white
                                shadow-md
                                transition-all
                                hover:bg-emerald-700
                                hover:scale-105
                            "
                        >
                            <FaAndroid className="text-lg" />
                            Download Android App
                        </a>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export default Login;