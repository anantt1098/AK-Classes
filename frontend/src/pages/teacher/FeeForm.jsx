import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../components/dashboard/PageHeader";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Textarea from "../../components/common/Textarea";
import Select from "../../components/common/Select";
import FormCard from "../../components/common/FormCard";

import {
    createFee,
    getFeeById,
    updateFee,
} from "../../services/fee.service";

import {
    getAllStudents,
} from "../../services/student.service";


function FeeForm() {

    const navigate = useNavigate();

    const { id } = useParams();

    const isEdit = Boolean(id);


    const [loading, setLoading] =
        useState(false);


    const [students, setStudents] =
        useState([]);


    const [errors, setErrors] =
        useState({});


    const [formData, setFormData] =
        useState({

            student: "",
            totalFee: "",
            paidFee: "",
            remarks: "",

        });



    const fetchStudents = async () => {
        try {
            const res = await getAllStudents(1, "", 1000);
            setStudents(res.students || []);
        } catch (_error) {
            toast.error("Unable to load students.");
        }
    };

    const fetchFee = async () => {
        try {
            setLoading(true);
            const res = await getFeeById(id);
            const fee = res.fee;

            setFormData({
                student: fee.student?._id || "",
                totalFee: fee.totalFee || "",
                paidFee: fee.paidFee || "",
                remarks: fee.remarks || "",
            });
        } catch (_error) {
            toast.error("Unable to load fee details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
        if (isEdit) {
            fetchFee();
        }
    }, [id, isEdit]);



    const validateForm = () => {

        const newErrors = {};


        if (!formData.student) {

            newErrors.student =
                "Please select a student.";

        }


        if (
            formData.totalFee === "" ||
            Number(formData.totalFee) < 0
        ) {

            newErrors.totalFee =
                "Enter a valid total fee.";

        }


        if (
            Number(formData.paidFee || 0) >
            Number(formData.totalFee || 0)
        ) {

            newErrors.paidFee =
                "Paid fee cannot exceed total fee.";

        }


        setErrors(newErrors);


        return (
            Object.keys(newErrors).length === 0
        );

    };



    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData((prev)=>({

            ...prev,

            [name]:value,

        }));


        if(errors[name]){

            setErrors((prev)=>({

                ...prev,

                [name]:"",

            }));

        }

    };



    const handleSubmit = async (e)=>{

        e.preventDefault();


        if(!validateForm())
            return;



        try {

            setLoading(true);


            const payload = {

                ...formData,

                totalFee:
                    Number(formData.totalFee),

                paidFee:
                    Number(formData.paidFee || 0),

            };



            if(isEdit){

                await updateFee(
                    id,
                    payload
                );


                toast.success(
                    "Fee updated successfully."
                );


            }
            else{


                await createFee(
                    payload
                );


                toast.success(
                    "Fee created successfully."
                );

            }



            navigate(
                "/teacher/fees"
            );



        }
        catch(error){


            console.log(
                "FEE ERROR:",
                error.response?.data
            );


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
                    ? "Edit Fee"
                    : "Add Fee"
                }

                subtitle="Manage student fee records"

            />



            <form
                onSubmit={handleSubmit}
                className="space-y-8"
            >


                <FormCard

                    title="Student Information"

                    subtitle="Select the student"

                >

                    <Select

                        label="Student"

                        name="student"

                        value={formData.student}

                        onChange={handleChange}

                        error={errors.student}

                        disabled={isEdit}

                        required

                        options={[

                            {
                                value:"",
                                label:"Select Student",
                            },

                            ...students.map(
                                (student)=>({

                                    value:
                                        student._id,

                                    label:
                                        `${student.fullName} (${student.admissionNo})`

                                })
                            )

                        ]}

                    />


                </FormCard>




                <FormCard

                    title="Fee Details"

                    subtitle="Enter fee information"

                >

                    <div className="grid gap-5 md:grid-cols-2">


                        <Input

                            type="number"

                            label="Total Fee"

                            name="totalFee"

                            value={formData.totalFee}

                            onChange={handleChange}

                            error={errors.totalFee}

                            required

                        />



                        <Input

                            type="number"

                            label="Paid Fee"

                            name="paidFee"

                            value={formData.paidFee}

                            onChange={handleChange}

                            error={errors.paidFee}

                        />



                        <div className="md:col-span-2">


                            <Textarea

                                label="Remarks"

                                name="remarks"

                                value={formData.remarks}

                                onChange={handleChange}

                                rows={4}

                            />


                        </div>


                    </div>


                </FormCard>




                <div className="flex justify-end gap-3">


                    <Button

                        type="button"

                        variant="secondary"

                        onClick={()=>navigate("/teacher/fees")}

                    >

                        Cancel

                    </Button>



                    <Button

                        type="submit"

                        loading={loading}

                    >

                        {
                            isEdit
                            ? "Update Fee"
                            : "Create Fee"
                        }

                    </Button>


                </div>



            </form>


        </div>

    );

}


export default FeeForm;