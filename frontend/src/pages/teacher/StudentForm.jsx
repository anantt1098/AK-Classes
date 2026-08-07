import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../components/dashboard/PageHeader";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Textarea from "../../components/common/Textarea";
import FormCard from "../../components/common/FormCard";

import {
    createStudent,
    getStudentById,
    updateStudent,
} from "../../services/student.service";


function StudentForm() {

    const navigate = useNavigate();
    const { id } = useParams();

    const isEdit = Boolean(id);


    const [loading,setLoading] =
        useState(false);


    const [errors,setErrors] =
        useState({});



    const [formData,setFormData] =
        useState({

            // Login Information
            username:"",
            email:"",
            password:"",


            // Student Information
            fullName:"",
            studentClass:"",
            phone:"",
            parentPhone:"",
            address:"",

            joiningDate:
                new Date()
                .toISOString()
                .split("T")[0],


            isActive:true,

        });





    const classOptions = [

        {
            value:"6",
            label:"Class 6",
        },

        {
            value:"7",
            label:"Class 7",
        },

        {
            value:"8",
            label:"Class 8",
        },

        {
            value:"9",
            label:"Class 9",
        },

        {
            value:"10",
            label:"Class 10",
        },

        {
            value:"11",
            label:"Class 11",
        },

        {
            value:"12",
            label:"Class 12",
        },

    ];





    const fetchStudent = async () => {
        try {
            setLoading(true);
            const res = await getStudentById(id);
            const student = res.student;

            setFormData({
                username: student.user?.username || "",
                email: student.user?.email || "",
                password: "",
                fullName: student.fullName || "",
                studentClass: student.studentClass || "",
                phone: student.phone || "",
                parentPhone: student.parentPhone || "",
                address: student.address || "",
                joiningDate: student.joiningDate?.split("T")[0] || "",
                isActive: student.isActive ?? true,
            });
        } catch (_error) {
            toast.error("Unable to load student.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isEdit) {
            fetchStudent();
        }
    }, [id, isEdit]);
        const validateForm = () => {

        const newErrors = {};



        if (!isEdit && !formData.username.trim()) {

            newErrors.username =
                "Username is required.";

        }



        if (!isEdit && !formData.email.trim()) {

            newErrors.email =
                "Email is required.";

        }



        if (
            !isEdit &&
            !/\S+@\S+\.\S+/.test(
                formData.email
            )
        ) {

            newErrors.email =
                "Enter a valid email.";

        }



        if (
            !isEdit &&
            formData.password.length < 6
        ) {

            newErrors.password =
                "Password must be at least 6 characters.";

        }





        if (!formData.fullName.trim()) {

            newErrors.fullName =
                "Full name is required.";

        }



        if (!formData.studentClass) {

            newErrors.studentClass =
                "Please select class.";

        }



        if (
            formData.phone &&
            !/^\d{10}$/.test(
                formData.phone
            )
        ) {

            newErrors.phone =
                "Phone number must be 10 digits.";

        }



        if (
            formData.parentPhone &&
            !/^\d{10}$/.test(
                formData.parentPhone
            )
        ) {

            newErrors.parentPhone =
                "Parent phone must be 10 digits.";

        }



        setErrors(newErrors);



        return (
            Object.keys(newErrors)
            .length === 0
        );

    };






    const handleChange = (e)=>{

        const {
            name,
            value
        } = e.target;



        setFormData(prev=>({

            ...prev,

            [name]:value,

        }));



        if(errors[name]){

            setErrors(prev=>({

                ...prev,

                [name]:"",

            }));

        }

    };







    const handleReset = ()=>{


        setErrors({});



        setFormData({

            username:"",
            email:"",
            password:"",

            fullName:"",
            admissionNo:"",
            studentClass:"",
            phone:"",
            parentPhone:"",
            address:"",

            joiningDate:
                new Date()
                .toISOString()
                .split("T")[0],

            isActive:true,

        });

    };








    const handleSubmit = async(e)=>{

        e.preventDefault();



        if(!validateForm())
            return;




        try{


            setLoading(true);



            if(isEdit){


                await updateStudent(
                    id,
                    {

                        fullName:
                            formData.fullName,


                        studentClass:
                            formData.studentClass,


                        phone:
                            formData.phone,


                        parentPhone:
                            formData.parentPhone,


                        address:
                            formData.address,


                        joiningDate:
                            formData.joiningDate,


                        isActive:
                            formData.isActive,

                    }
                );



                toast.success(
                    "Student updated successfully."
                );


            }
            else{


                await createStudent(
                    formData
                );



                toast.success(
                    "Student created successfully."
                );


            }




            navigate(
                "/teacher/students"
            );


        }
        catch(error){


            toast.error(
                error.response?.data?.message ||
                "Something went wrong."
            );


        }
        finally{


            setLoading(false);


        }

    };






    return (

        <div className="space-y-8">


            <PageHeader

                title={
                    isEdit
                    ?
                    "Edit Student"
                    :
                    "Add Student"
                }

                subtitle="Manage student information"

            />





            <form

                onSubmit={handleSubmit}

                className="space-y-8"

            >



                {!isEdit && (

                    <FormCard

                        title="Account Information"

                        subtitle="Student login credentials"

                    >

                        <div className="grid gap-5 md:grid-cols-2">


                            <Input

                                label="Username"

                                name="username"

                                value={
                                    formData.username
                                }

                                onChange={
                                    handleChange
                                }

                                error={
                                    errors.username
                                }

                                required

                            />



                            <Input

                                type="email"

                                label="Email"

                                name="email"

                                value={
                                    formData.email
                                }

                                onChange={
                                    handleChange
                                }

                                error={
                                    errors.email
                                }

                                required

                            />



                            <div className="md:col-span-2">


                                <Input

                                    type="password"

                                    label="Password"

                                    name="password"

                                    value={
                                        formData.password
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    error={
                                        errors.password
                                    }

                                    required

                                />


                            </div>


                        </div>


                    </FormCard>

                )}






                <FormCard

                    title="Personal Information"

                    subtitle="Basic student details"

                >

                    <div className="grid gap-5 md:grid-cols-2">


                        <Input

                            label="Full Name"

                            name="fullName"

                            value={
                                formData.fullName
                            }

                            onChange={
                                handleChange
                            }

                            error={
                                errors.fullName
                            }

                            required

                        />





                    </div>


                </FormCard>
                                {/* Academic Information */}

                <FormCard

                    title="Academic Information"

                    subtitle="Class details"

                >

                    <div className="grid gap-5 md:grid-cols-2">


                        <Select

                            label="Class"

                            name="studentClass"

                            value={
                                formData.studentClass
                            }

                            onChange={
                                handleChange
                            }

                            options={
                                classOptions
                            }

                            error={
                                errors.studentClass
                            }

                            required

                        />



                        <Input

                            type="date"

                            label="Joining Date"

                            name="joiningDate"

                            value={
                                formData.joiningDate
                            }

                            onChange={
                                handleChange
                            }

                        />



                        {isEdit && (

                            <Select

                                label="Status"

                                name="isActive"

                                value={
                                    String(
                                        formData.isActive
                                    )
                                }

                                onChange={(e)=>

                                    setFormData(
                                        prev=>({

                                            ...prev,

                                            isActive:
                                                e.target.value ===
                                                "true",

                                        })
                                    )

                                }

                                options={[
                                    {
                                        value:"true",
                                        label:"Active",
                                    },

                                    {
                                        value:"false",
                                        label:"Inactive",
                                    },

                                ]}

                            />

                        )}


                    </div>


                </FormCard>







                {/* Contact Information */}


                <FormCard

                    title="Contact Information"

                    subtitle="Student contact details"

                >


                    <div className="grid gap-5 md:grid-cols-2">


                        <Input

                            label="Phone Number"

                            name="phone"

                            value={
                                formData.phone
                            }

                            onChange={
                                handleChange
                            }

                            error={
                                errors.phone
                            }

                            placeholder="9876543210"

                        />



                        <Input

                            label="Parent Phone"

                            name="parentPhone"

                            value={
                                formData.parentPhone
                            }

                            onChange={
                                handleChange
                            }

                            error={
                                errors.parentPhone
                            }

                            placeholder="9876543210"

                        />



                        <div className="md:col-span-2">


                            <Textarea

                                label="Address"

                                name="address"

                                value={
                                    formData.address
                                }

                                onChange={
                                    handleChange
                                }

                                placeholder="Enter complete address..."

                                rows={4}

                            />


                        </div>


                    </div>


                </FormCard>








                {/* Action Buttons */}


                <div

                    className="
                        flex
                        flex-col
                        gap-3
                        sm:flex-row
                        sm:justify-end
                    "

                >


                    <Button

                        type="button"

                        variant="secondary"

                        onClick={() =>
                            navigate(
                                "/teacher/students"
                            )
                        }

                    >

                        Cancel

                    </Button>





                    {!isEdit && (

                        <Button

                            type="button"

                            variant="secondary"

                            onClick={
                                handleReset
                            }

                        >

                            Reset

                        </Button>

                    )}






                    <Button

                        type="submit"

                        loading={
                            loading
                        }

                    >

                        {
                            isEdit
                            ?
                            "Update Student"
                            :
                            "Create Student"
                        }

                    </Button>



                </div>





            </form>


        </div>


    );

}



export default StudentForm;