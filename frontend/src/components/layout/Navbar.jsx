import {
    FaBars,
    FaMoon,
    FaSun,
    FaUserCircle,
} from "react-icons/fa";


import { Link } from "react-router-dom";
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
                            hidden
                            items-center
                            gap-2

                            md:flex
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

                    <div className="min-w-0">


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









                    {/* Profile */}


                    <div

                        className="
                            flex
                            items-center
                            gap-2

                            rounded-2xl

                            border
                            border-slate-200

                            bg-slate-50

                            px-2
                            py-2

                            shadow-sm

                            dark:border-slate-700

                            dark:bg-slate-800
                        "

                    >



                        <div

                            className="
                                flex
                                h-10
                                w-10

                                items-center
                                justify-center

                                rounded-full

                                bg-blue-100

                                dark:bg-blue-900/40
                            "

                        >

                            <FaUserCircle

                                className="
                                    text-3xl
                                    text-blue-600

                                    dark:text-blue-400
                                "

                            />

                        </div>







                        <div

                            className="
                                hidden
                                sm:block
                            "

                        >

                            <h3

                                className="
                                    text-sm
                                    font-semibold

                                    text-slate-900

                                    dark:text-white
                                "

                            >

                                {
                                    user?.username || "User"
                                }

                            </h3>



                            <span

                                className="
                                    rounded-full

                                    bg-blue-100

                                    px-2
                                    py-0.5

                                    text-xs

                                    font-medium

                                    capitalize

                                    text-blue-700

                                    dark:bg-blue-900/40

                                    dark:text-blue-300
                                "

                            >

                                {
                                    user?.role || "user"
                                }

                            </span>


                        </div>



                    </div>





                </div>





            </div>


        </header>

    );

}


export default Navbar;