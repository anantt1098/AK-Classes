import {
    useState,
} from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";


import {
    FaEnvelope,
    FaGraduationCap,
    FaLock,
    FaUser,
    FaUserTie,
    FaKey,
    FaPhone,
    FaMapMarkerAlt,
} from "react-icons/fa";


import {
    motion,
} from "framer-motion";


import toast from "react-hot-toast";
import logo from "../../assets/logo.jpg";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";


import {
    registerUser,
} from "../../services/auth.service";




// ==========================================
// Subject List
// ==========================================

const subjectData = {

    "6": [
        "Science",
        "Maths",
        "SST",
        "Hindi",
        "English",
        "Other",
    ],

    "7": [
        "Science",
        "Maths",
        "SST",
        "Hindi",
        "English",
        "Other",
    ],

    "8": [
        "Science",
        "Maths",
        "SST",
        "Hindi",
        "English",
        "Other",
    ],

    "9": [
        "Maths",
        "Science",
        "SST",
        "English",
    ],

    "10": [
        "Maths",
        "Science",
        "SST",
        "English",
    ],

};





// ==========================================
// Stream Subjects
// ==========================================

const streamSubjects = {

    Science: [

        "Physics",

        "Chemistry",

        "Maths",

        "Biology",

    ],


    Humanities: [

        "History",

        "Political Science",

        "Geography",

    ],

};





function Register(){


    const navigate = useNavigate();



    const [role,setRole] =
        useState("student");



    const [loading,setLoading] =
        useState(false);




    const [formData,setFormData] =
        useState({

            username:"",

            fullName:"",

            email:"",

            password:"",

            phone:"",

            parentPhone:"",

            address:"",

            verificationKey:"",


            studentClass:"",

            stream:"",

            subjects:[],


            otherSubject:"",

        });







    const handleChange = (e)=>{


        setFormData(prev=>({

            ...prev,

            [e.target.name]:
                e.target.value,

        }));

    };







    const handleClassChange = (e)=>{


        const selectedClass =
            e.target.value;



        setFormData(prev=>({

            ...prev,

            studentClass:
                selectedClass,


            stream:"",


            subjects:[],


            otherSubject:"",

        }));


    };







    const handleStreamChange = (e)=>{


        const selectedStream =
            e.target.value;



        setFormData(prev=>({

            ...prev,


            stream:
                selectedStream,


            subjects:
                streamSubjects[selectedStream]
                ||
                [],


        }));


    };







    const handleSubjectChange = (subject)=>{


        setFormData(prev=>({


            ...prev,


            subjects:

            prev.subjects.includes(subject)


            ?


            prev.subjects.filter(

                item =>
                item !== subject

            )


            :


            [

                ...prev.subjects,

                subject

            ],


        }));


    };







    const getSubjects = ()=>{


        if(

            formData.studentClass==="11"

            ||

            formData.studentClass==="12"

        ){

            return [];

        }




        return (

            subjectData[
                formData.studentClass
            ]

            ||

            []

        );


    };
    const handleSubmit = async(e)=>{


        e.preventDefault();




        if(
            !formData.username

            ||

            !formData.email

            ||

            !formData.password

        ){

            return toast.error(
                "Please fill all fields."
            );

        }






        let finalSubjects = [

            ...formData.subjects

        ];







        // ==============================
        // Auto assign subjects for 11-12
        // ==============================

        if(

            formData.studentClass==="11"

            ||

            formData.studentClass==="12"

        ){


            finalSubjects =
                streamSubjects[
                    formData.stream
                ]
                ||
                [];


        }








        // ==============================
        // Other Subject Handling
        // ==============================

        if(
            finalSubjects.includes("Other")
        ){


            if(
                !formData.otherSubject
            ){

                return toast.error(
                    "Specify other subject."
                );

            }



            finalSubjects =
                finalSubjects.filter(

                    item =>
                    item !== "Other"

                );



            finalSubjects.push(

                formData.otherSubject

            );


        }







        if(role==="student"){



            if(
                !formData.studentClass
            ){

                return toast.error(
                    "Select class."
                );

            }





            if(

                (
                    formData.studentClass==="11"

                    ||

                    formData.studentClass==="12"

                )

                &&

                !formData.stream

            ){

                return toast.error(
                    "Select stream."
                );

            }





            if(
                finalSubjects.length===0
            ){

                return toast.error(
                    "Select subjects."
                );

            }


        }








        if(

            role==="teacher"

            &&

            !formData.verificationKey

        ){

            return toast.error(
                "Verification key required."
            );

        }








        try{


            setLoading(true);





            await registerUser({

                ...formData,


                subjects:

                    finalSubjects,



                role,


            });






            toast.success(
                "Registration Successful"
            );






            navigate("/login");



        }
        catch(error){


            toast.error(

                error?.response?.data?.message

                ||

                "Registration Failed"

            );


        }
        finally{


            setLoading(false);


        }


    };







    return (

        <div

            className="

            min-h-screen

            bg-slate-100

            dark:bg-slate-950

            flex

            items-center

            justify-center

            p-5

            "

        >



            <motion.div

                initial={{

                    opacity:0,

                    y:30

                }}


                animate={{

                    opacity:1,

                    y:0

                }}


                className="

                w-full

                max-w-md

                "

            >



                <Card className="p-8">



                    <div className="text-center mb-8">


                        <img
                            src={logo}
                            alt="A.K. Classes"
                            className="mx-auto mb-4 h-20 w-20 rounded-full object-cover shadow-md ring-4 ring-blue-500/20"
                        />




                        <h1 className="text-3xl font-bold">

                            Create Account

                        </h1>


                    </div>





                    <div

                        className="

                        grid

                        grid-cols-2

                        gap-4

                        mb-6

                        "

                    >



                        <button

                            type="button"

                            onClick={()=>setRole("student")}


                            className={`

rounded-xl

border-2

p-4

transition

duration-200


${
role==="student"

?

"border-blue-600 bg-blue-600 text-white shadow-lg"

:

"border-slate-300 text-slate-700 dark:text-slate-200 hover:border-blue-500"

}

`}

                        >


                            <FaGraduationCap

                                className="

                                mx-auto

                                text-2xl

                                mb-2

                                "

                            />


                            Student


                        </button>





                        <button

                            type="button"

                            onClick={()=>setRole("teacher")}


                            className={`

rounded-xl

border-2

p-4

transition

duration-200


${
role==="teacher"

?

"border-blue-600 bg-blue-600 text-white shadow-lg"

:

"border-slate-300 text-slate-700 dark:text-slate-200 hover:border-blue-500"

}

`}

                        >


                            <FaUserTie

                                className="

                                mx-auto

                                text-2xl

                                mb-2

                                "

                            />


                            Teacher


                        </button>



                    </div>





                    <form

                        onSubmit={handleSubmit}

                        className="space-y-5"

                    >
                                            <Input

                            label="Username"

                            name="username"

                            value={formData.username}

                            onChange={handleChange}

                            icon={FaUser}

                        />




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







                        {
                        role==="student" && (

                        <>

                            <Input

                                label="Full Name"

                                name="fullName"

                                value={formData.fullName}

                                onChange={handleChange}

                                placeholder="Student Full Name"

                                icon={FaUser}

                            />


                            <Input

                                label="Student Phone Number"

                                name="phone"

                                type="tel"

                                value={formData.phone}

                                onChange={handleChange}

                                placeholder="e.g. 9876543210"

                                icon={FaPhone}

                            />


                            <Input

                                label="Parent Phone Number"

                                name="parentPhone"

                                type="tel"

                                value={formData.parentPhone}

                                onChange={handleChange}

                                placeholder="e.g. 9876543210"

                                icon={FaPhone}

                            />


                            <Input

                                label="Residential Address"

                                name="address"

                                value={formData.address}

                                onChange={handleChange}

                                placeholder="Enter full address"

                                icon={FaMapMarkerAlt}

                            />


                            <select

                                value={
                                    formData.studentClass
                                }

                                onChange={
                                    handleClassChange
                                }

                                className="
                                w-full
                                rounded-xl
                                border
                                p-3
                                "

                            >

                                <option value="">
                                    Select Class
                                </option>


                                {
                                [
                                    6,
                                    7,
                                    8,
                                    9,
                                    10,
                                    11,
                                    12

                                ].map(cls=>(

                                    <option

                                        key={cls}

                                        value={cls}

                                    >

                                        Class {cls}

                                    </option>

                                ))

                                }


                            </select>







                            {
                            (
                                formData.studentClass==="11"

                                ||

                                formData.studentClass==="12"

                            )

                            &&


                            <select

                                value={
                                    formData.stream
                                }

                                onChange={
                                    handleStreamChange
                                }

                                className="
                                w-full
                                rounded-xl
                                border
                                p-3
                                "

                            >

                                <option value="">
                                    Select Stream
                                </option>


                                <option value="Science">

                                    Science

                                </option>


                                <option value="Humanities">

                                    Humanities

                                </option>


                            </select>


                            }







                            {
                            formData.studentClass !== "11"

                            &&

                            formData.studentClass !== "12"

                            &&

                            (

                            <div>


                                <p className="font-medium mb-2">

                                    Select Subjects

                                </p>



                                {
                                getSubjects().map(subject=>(


                                    <label

                                        key={subject}

                                        className="
                                        flex
                                        gap-2
                                        items-center
                                        mb-2
                                        "

                                    >


                                        <input

                                            type="checkbox"


                                            checked={

                                                formData.subjects.includes(
                                                    subject
                                                )

                                            }


                                            onChange={()=>


                                                handleSubjectChange(
                                                    subject
                                                )

                                            }


                                        />


                                        {subject}


                                    </label>


                                ))

                                }


                            </div>

                            )

                            }






                        </>

                        )

                        }








                        {
                        role==="teacher"

                        &&


                        <Input

                            label="Verification Key"

                            name="verificationKey"

                            value={
                                formData.verificationKey
                            }

                            onChange={
                                handleChange
                            }

                            icon={FaKey}

                        />


                        }







                        <Button

                            type="submit"

                            fullWidth

                            loading={loading}

                        >

                            Register

                        </Button>





                    </form>








                    <p className="
                    mt-6
                    text-center
                    ">


                        Already have an account?{" "}



                        <Link

                            to="/login"

                            className="
                            text-blue-600
                            font-semibold
                            "

                        >

                            Login

                        </Link>


                    </p>







                </Card>


            </motion.div>


        </div>


    );


}


export default Register;