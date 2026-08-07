import {
    useEffect,
    useState,
} from "react";

import {
    Outlet,
    useLocation,
} from "react-router-dom";


import Navbar from "../components/layout/Navbar";
import Drawer from "../components/layout/Drawer";


import { useAuth } from "../hooks/useAuth";




function MainLayout(){


    const { user } = useAuth();


    const location = useLocation();



    const [drawerOpen,setDrawerOpen] =
        useState(false);



    const [darkMode,setDarkMode] =
        useState(()=>{

            return localStorage.getItem("theme") === "dark";

        });





    useEffect(()=>{


        const root =
            document.documentElement;


        if(darkMode){

            root.classList.add("dark");

            localStorage.setItem(
                "theme",
                "dark"
            );

        }
        else{

            root.classList.remove("dark");

            localStorage.setItem(
                "theme",
                "light"
            );

        }


    },[darkMode]);







    useEffect(() => {
        setDrawerOpen(false);
    }, [location.pathname]);







    if(!user)
        return null;







    return (

        <div

            className="
                min-h-screen
                w-full

                overflow-x-hidden

                bg-slate-50
                text-slate-900

                dark:bg-slate-950
                dark:text-white
            "

        >






            <Drawer

                userRole={user.role}

                open={drawerOpen}

                closeDrawer={()=>{

                    setDrawerOpen(false);

                }}

            />









            <div

                className="
                    min-h-screen
                    w-full
                "

            >






                <Navbar

                    user={user}

                    darkMode={darkMode}


                    toggleTheme={()=>{

                        setDarkMode(
                            prev=>!prev
                        );

                    }}



                    toggleDrawer={()=>{

                        setDrawerOpen(true);

                    }}

                />









                <main

                    className="
                        w-full

                        min-h-screen

                        bg-slate-50

                        dark:bg-slate-950

                        px-5
                        pt-8
                        pb-12

                        sm:px-8

                        lg:px-10

                        xl:px-12

                        transition-colors
                        duration-300
                    "

                >




                    <div

                        className="
                            mx-auto

                            w-full

                            max-w-[1500px]

                            space-y-10
                        "

                    >


                        <Outlet/>


                    </div>





                </main>







            </div>






        </div>

    );

}



export default MainLayout;
