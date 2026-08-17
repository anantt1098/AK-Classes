import {
    FaBook,
    FaChalkboardTeacher,
    FaClipboardList,
    FaFileAlt,
    FaHome,
    FaMoneyBillWave,
    FaSignOutAlt,
    FaTimes,
    FaUserGraduate,
    FaUser,
    FaVideo,
    FaCalendarAlt,
    FaTasks,
    FaBullhorn,
    FaStickyNote,
    FaBroadcastTower,
} from "react-icons/fa";


import {
    NavLink,
    Link,
    useNavigate,
} from "react-router-dom";


import {
    motion,
    AnimatePresence,
} from "framer-motion";

import { useAuth } from "../../hooks/useAuth";

function Drawer({ open, closeDrawer }) {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const userRole = user?.role;

    const studentLinks = [

        {
            name:"Dashboard",
            icon:FaHome,
            path:"/student/dashboard",
        },

        {
            name:"Courses",
            icon:FaBook,
            path:"/student/courses",
        },

        {
            name:"Live Classes",
            icon:FaBroadcastTower,
            path:"/student/live-classes",
        },

        {
            name:"Notes",
            icon:FaFileAlt,
            path:"/student/notes",
        },

        {
            name:"Videos",
            icon:FaVideo,
            path:"/student/videos",
        },

        {
            name:"Attendance",
            icon:FaClipboardList,
            path:"/student/attendance",
        },

        {
            name:"Fees",
            icon:FaMoneyBillWave,
            path:"/student/fees",
        },

        {
            name:"Reports",
            icon:FaFileAlt,
            path:"/student/reports",
        },

        {
            name:"Profile",
            icon:FaUser,
            path:"/student/profile",
        },

    ];






    const teacherLinks = [

        {
            name:"Dashboard",
            icon:FaHome,
            path:"/teacher/dashboard",
        },

        {
            name:"Students",
            icon:FaUserGraduate,
            path:"/teacher/students",
        },

        {
            name:"Attendance",
            icon:FaClipboardList,
            path:"/teacher/attendance",
        },

        {
            name:"Tests",
            icon:FaChalkboardTeacher,
            path:"/teacher/tests",
        },

        {
            name:"Assignments",
            icon:FaTasks,
            path:"/teacher/assignments",
        },

        {
            name:"Reports",
            icon:FaFileAlt,
            path:"/teacher/reports",
        },

        {
            name:"Fees",
            icon:FaMoneyBillWave,
            path:"/teacher/fees",
        },

        {
            name:"Courses",
            icon:FaBook,
            path:"/teacher/courses",
        },

        {
            name:"Notes",
            icon:FaStickyNote,
            path:"/teacher/notes",
        },

        {
            name:"Videos",
            icon:FaVideo,
            path:"/teacher/videos",
        },

        {
            name:"Live Classes",
            icon:FaBroadcastTower,
            path:"/teacher/live-classes",
        },

        {
            name:"Notices",
            icon:FaBullhorn,
            path:"/teacher/notices",
        },

        {
            name:"Timetable",
            icon:FaCalendarAlt,
            path:"/teacher/timetables",
        },

        

    ];







    const links =
        userRole === "teacher"
        ?
        teacherLinks
        :
        studentLinks;







    const handleLogout = async()=>{


        await logout();


        navigate(
            "/login",
            {
                replace:true,
            }
        );


    };







    const renderLinks = () => (

        links.map(item=>(


            <NavLink

                key={item.path}

                to={item.path}

                onClick={closeDrawer}


                className={({isActive})=>

                `
                flex
                items-center
                gap-3

                rounded-xl

                px-4
                py-3

                font-medium

                transition


                ${
                    isActive
                    ?
                    "bg-blue-600 text-white shadow-lg"
                    :
                    "hover:bg-slate-100 dark:hover:bg-slate-800"
                }

                `

                }

            >


                <item.icon className="text-lg"/>


                {item.name}


            </NavLink>


        ))

    );










    return (


        <AnimatePresence>


        {

        open &&

        (

        <>


            {/* Overlay */}

            <motion.div


                initial={{
                    opacity:0
                }}


                animate={{
                    opacity:1
                }}


                exit={{
                    opacity:0
                }}


                onClick={closeDrawer}


                className="
                    fixed
                    inset-0

                    z-40

                    bg-black/50
                "

            />








            {/* Drawer */}

            <motion.aside


                initial={{
                    x:-300
                }}


                animate={{
                    x:0
                }}


                exit={{
                    x:-300
                }}


                transition={{
                    duration:0.25
                }}


                className="
                    fixed

                    left-0
                    top-0

                    z-50

                    h-screen

                    w-72

                    flex
                    flex-col

                    bg-white

                    shadow-xl

                    dark:bg-slate-900
                "


            >





                {/* Header */}


                <div

                    className="
                        flex
                        items-center
                        justify-between

                        p-6
                    "

                >



                    <div>


                        <Link
                            to={userRole === "teacher" ? "/teacher/dashboard" : "/student/dashboard"}
                            onClick={closeDrawer}
                            className="block hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            <h1

                                className="
                                    text-2xl
                                    font-bold
                                    text-blue-600
                                "

                            >

                                A.K. Classes


                            </h1>
                        </Link>



                        <p

                            className="
                                text-sm
                                text-slate-500
                                capitalize
                            "

                        >

                            {userRole} Portal


                        </p>


                    </div>





                    <button

                        onClick={closeDrawer}

                        className="
                            rounded-lg
                            p-2
                            hover:bg-slate-100
                            dark:hover:bg-slate-800
                        "

                    >

                        <FaTimes size={20}/>


                    </button>



                </div>









                {/* Links */}


                <nav

                    className="
                        flex-1

                        space-y-2

                        overflow-y-auto

                        px-4
                    "

                >

                    {renderLinks()}


                </nav>









                {/* Logout */}


                <div className="p-4">

                    <button


                        onClick={handleLogout}


                        className="
                            flex

                            w-full

                            items-center
                            justify-center

                            gap-2

                            rounded-xl

                            bg-red-500

                            py-3

                            font-medium

                            text-white

                            hover:bg-red-600
                        "


                    >

                        <FaSignOutAlt/>

                        Logout


                    </button>


                </div>





            </motion.aside>



        </>

        )

        }


        </AnimatePresence>


    );


}


export default Drawer;