import {
    FaBars,
    FaMoon,
    FaSun,
    FaUserCircle,
    FaAndroid,
    FaDownload,
    FaClipboardList,
} from "react-icons/fa";


import { Link } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import logo from "../../assets/logo.jpg";



function Navbar({
    toggleDrawer,
    darkMode,
    toggleTheme,
    user,
}) {


    const dashboardTitle =
        user?.role === "teacher"
        ?
        "Teacher Dashboard"
        :
        "Student Dashboard";



    return (

        <header

            className="
                sticky
                top-0
                z-40

                border-b
                border-slate-200

                bg-white

                shadow-md

                transition-all
                duration-300

                dark:border-slate-700
                dark:bg-slate-900
                dark:shadow-xl
            "

        >



            <div

                className="
                    flex
                    h-20

                    items-center
                    justify-between

                    gap-2

                    px-3
                    sm:px-4
                    lg:px-8
                "

            >





                {/* LEFT SECTION */}

                <div

                    className="
                        flex
                        min-w-0
                        items-center
                        gap-3
                        sm:gap-4
                    "

                >





                    {/* Hamburger */}

                    <button

                        onClick={toggleDrawer}

                        className="
                            flex
                            h-11
                            w-11
                            shrink-0

                            items-center
                            justify-center

                            rounded-xl

                            text-slate-600

                            transition-all

                            hover:scale-105
                            hover:bg-slate-100

                            dark:text-slate-300
                            dark:hover:bg-slate-800
                        "

                    >

                        <FaBars size={20}/>

                    </button>








                    {/* Logo */}

                    <Link

                        to={user?.role === "teacher" ? "/teacher/dashboard" : "/student/dashboard"}

                        className="
                            flex
                            items-center
                            gap-2

                            hover:opacity-90
                            transition-opacity
                            cursor-pointer
                        "

                    >

                        <img

                            src={logo}

                            alt="A.K. Classes"

                            className="
                                h-10
                                w-10

                                rounded-xl

                                object-cover

                                shadow-sm
                            "

                        />



                        <span

                            className="
                                text-lg
                                font-bold

                                text-blue-600

                                dark:text-blue-400
                            "

                        >

                            A.K. Classes

                        </span>


                    </Link>










                    {/* Dashboard title */}

                    <div className="hidden md:block min-w-0">


                        <h1

                            className="
                                truncate

                                text-base

                                font-bold

                                sm:text-xl

                                text-slate-900

                                dark:text-white
                            "

                        >

                            {dashboardTitle}

                        </h1>



                        <p

                            className="
                                mt-1

                                text-xs

                                text-slate-500

                                dark:text-slate-400
                            "

                        >

                            Welcome back 👋

                        </p>


                    </div>



                </div>









                {/* RIGHT SECTION */}


                <div

                    className="
                        flex
                        shrink-0
                        items-center
                        gap-2
                        sm:gap-3
                    "

                >







                    {/* Download App Button (Only on web browser, hidden in mobile APK) */}
                    {!Capacitor.isNativePlatform() && (
                        <a
                            href="/AK_Classes.apk"
                            download="AK_Classes.apk"
                            title="Download Android APK"
                            className="
                                flex
                                h-11
                                items-center
                                gap-2
                                rounded-xl
                                bg-gradient-to-r
                                from-emerald-500
                                to-teal-600
                                px-3
                                text-xs
                                font-bold
                                text-white
                                shadow-md
                                transition-all
                                hover:scale-105
                                hover:shadow-emerald-500/25
                                sm:px-4
                                sm:text-sm
                            "
                        >
                            <FaAndroid className="text-lg" />
                            <span className="hidden sm:inline">Download App</span>
                        </a>
                    )}

                    {/* Theme Button */}

                    <button

                        onClick={toggleTheme}

                        className="
                            flex
                            h-11
                            w-11

                            items-center
                            justify-center

                            rounded-xl

                            border
                            border-slate-200

                            bg-slate-50

                            text-slate-700

                            transition-all

                            hover:scale-105
                            hover:bg-slate-100


                            dark:border-slate-700
                            dark:bg-slate-800
                            dark:text-yellow-400
                            dark:hover:bg-slate-700
                        "

                    >

                        {
                            darkMode
                            ?
                            <FaSun size={18}/>
                            :
                            <FaMoon size={18}/>
                        }

                    </button>









                    {/* Open DPP Button */}
                    <Link
                        to={user?.role === "teacher" ? "/teacher/dpp" : "/student/dpp"}
                        title="Open DPP"
                        className="
                            flex
                            h-11
                            items-center
                            gap-2
                            rounded-xl
                            bg-emerald-600
                            px-3.5
                            py-2
                            text-xs
                            font-bold
                            text-white
                            shadow-md
                            transition-all
                            hover:bg-emerald-700
                            hover:scale-105
                            active:scale-95
                            sm:px-4
                            sm:text-sm
                        "
                    >
                        <FaClipboardList className="text-base sm:text-lg" />
                        <span>DPP</span>
                    </Link>





                </div>





            </div>


        </header>

    );

}


export default Navbar;