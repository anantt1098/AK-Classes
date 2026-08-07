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
import FormCard from "../../components/common/FormCard";

import {
    createTimetable,
    getTimetableById,
    updateTimetable,
} from "../../services/timetable.service";

import {
    getAllTeachers,
} from "../../services/teacher.service";




// ==========================================
// Subject Data
// ==========================================

const subjectData = {


    "6":[
        "Science",
        "Maths",
        "SST",
        "Hindi",
        "English",
        "Other",
    ],


    "7":[
        "Science",
        "Maths",
        "SST",
        "Hindi",
        "English",
        "Other",
    ],


    "8":[
        "Science",
        "Maths",
        "SST",
        "Hindi",
        "English",
        "Other",
    ],



    "9":[
        "Maths",
        "Science",
        "SST",
        "English",
    ],



    "10":[
        "Maths",
        "Science",
        "SST",
        "English",
    ],




    "11":{

        Science:[
            "Physics",
            "Chemistry",
            "Maths",
            "Biology",
        ],


        Humanities:[
            "History",
            "Political Science",
            "Geography",
        ],

    },





    "12":{

        Science:[
            "Physics",
            "Chemistry",
            "Maths",
            "Biology",
        ],


        Humanities:[
            "History",
            "Political Science",
            "Geography",
        ],

    },


};






function TimetableForm(){



const navigate = useNavigate();



const {id}=useParams();



const isEdit =
Boolean(id);




const [loading,setLoading]=
useState(false);




const [teachers,setTeachers]=
useState([]);




const [errors,setErrors]=
useState({});





const [formData,setFormData]=
useState({

    studentClass:"",

    stream:"",

    day:"",

    subject:"",

    teacher:"",

    startTime:"",

    endTime:"",

    room:"",

});





// ==========================================
// Get Subjects
// ==========================================

const getSubjects=()=>{


    if(

        formData.studentClass==="11" ||

        formData.studentClass==="12"

    ){


        if(!formData.stream)

            return [];



        return (

            subjectData[
                formData.studentClass
            ][formData.stream]

            ||

            []

        );


    }



    return (

        subjectData[
            formData.studentClass
        ]

        ||

        []

    );


};
// ==========================================
// Fetch Data
// ==========================================

    const fetchTeachers = async () => {
        try {
            const res = await getAllTeachers(1, "", 1000);
            setTeachers(res.teachers || []);
        } catch (_error) {
            toast.error("Unable to load teachers.");
        }
    };

    const fetchTimetable = async () => {
        try {
            setLoading(true);
            const res = await getTimetableById(id);
            const timetable = res.timetable;

            setFormData({
                studentClass: timetable.studentClass || "",
                stream: timetable.stream || "",
                day: timetable.day || "",
                subject: timetable.subject || "",
                teacher: timetable.teacher?._id || "",
                startTime: timetable.startTime || "",
                endTime: timetable.endTime || "",
                room: timetable.room || "",
            });
        } catch (_error) {
            toast.error("Unable to load timetable.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeachers();
        if (isEdit) {
            fetchTimetable();
        }
    }, [id, isEdit]);






// ==========================================
// Class Change
// ==========================================

const handleClassChange=(e)=>{


    const value =
    e.target.value;



    setFormData(prev=>({


        ...prev,


        studentClass:value,


        stream:"",


        subject:"",


    }));



};






// ==========================================
// Stream Change
// ==========================================

const handleStreamChange=(e)=>{


    setFormData(prev=>({


        ...prev,


        stream:e.target.value,


        subject:"",


    }));


};






// ==========================================
// Validation
// ==========================================

const validateForm=()=>{


    const newErrors={};




    if(!formData.studentClass){

        newErrors.studentClass =
        "Class is required.";

    }




    if(

        (
            formData.studentClass==="11" ||

            formData.studentClass==="12"

        )

        &&

        !formData.stream

    ){

        newErrors.stream =
        "Stream is required.";

    }




    if(!formData.day){

        newErrors.day =
        "Day is required.";

    }




    if(!formData.subject.trim()){

        newErrors.subject =
        "Subject is required.";

    }




    if(!formData.teacher){

        newErrors.teacher =
        "Teacher is required.";

    }




    if(!formData.startTime){

        newErrors.startTime =
        "Start time is required.";

    }




    if(!formData.endTime){

        newErrors.endTime =
        "End time is required.";

    }




    setErrors(newErrors);



    return (
        Object.keys(newErrors).length===0
    );


};






// ==========================================
// Input Change
// ==========================================

const handleChange=(e)=>{


    const {
        name,
        value
    }=e.target;



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






// ==========================================
// Submit
// ==========================================

const handleSubmit=async(e)=>{


    e.preventDefault();



    if(!validateForm())

        return;





    try{


        setLoading(true);




        if(isEdit){


            await updateTimetable(

                id,

                formData

            );



            toast.success(
                "Timetable updated successfully."
            );


        }
        else{


            await createTimetable(

                formData

            );



            toast.success(
                "Timetable created successfully."
            );


        }




        navigate(
            "/teacher/timetables"
        );


    }
    catch(error){


        toast.error(

            error.response?.data?.message

            ||

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
        "Edit Timetable"
        :
        "Add Timetable"
    }

    subtitle="Manage class timetable"

/>




<form

onSubmit={handleSubmit}

className="space-y-8"

>



<FormCard

title="Timetable Information"

subtitle="Enter timetable details"

>



<div className="grid gap-5 md:grid-cols-2">





<Select

label="Class"

name="studentClass"

value={
    formData.studentClass
}

onChange={
    handleClassChange
}

error={
    errors.studentClass
}

required


options={[

{
    value:"",
    label:"Select Class"
},


...[
6,
7,
8,
9,
10,
11,
12

].map(cls=>(

{

value:String(cls),

label:`Class ${cls}`

}

))

]}

/>






{

(
formData.studentClass==="11"

||

formData.studentClass==="12"

)

&&


<Select

label="Stream"

name="stream"

value={
    formData.stream
}

onChange={
    handleStreamChange
}

error={
    errors.stream
}

required


options={[

{
    value:"",
    label:"Select Stream"
},


{
    value:"Science",
    label:"Science"
},


{
    value:"Humanities",
    label:"Humanities"
},


]}


/>

}





<Select

label="Subject"

name="subject"

value={
    formData.subject
}

onChange={
    handleChange
}

error={
    errors.subject
}

required


disabled={

    !formData.studentClass

    ||

    (

        (
            formData.studentClass==="11"

            ||

            formData.studentClass==="12"

        )

        &&

        !formData.stream

    )

}



options={[


{
    value:"",
    label:

    !formData.studentClass

    ?

    "Select Class First"

    :

    (

        (
            formData.studentClass==="11"

            ||

            formData.studentClass==="12"

        )

        &&

        !formData.stream

    )

    ?

    "Select Stream First"

    :

    "Select Subject"

},



...getSubjects().map(subject=>(


{

value:subject,

label:subject


}


))


]}


/>








<Select

label="Day"

name="day"

value={
    formData.day
}

onChange={
    handleChange
}

error={
    errors.day
}

required


options={[


{
value:"",
label:"Select Day"
},


{
value:"Monday",
label:"Monday"
},


{
value:"Tuesday",
label:"Tuesday"
},


{
value:"Wednesday",
label:"Wednesday"
},


{
value:"Thursday",
label:"Thursday"
},


{
value:"Friday",
label:"Friday"
},


{
value:"Saturday",
label:"Saturday"
},


]}


/>







<Select

label="Teacher"

name="teacher"

value={
    formData.teacher
}

onChange={
    handleChange
}

error={
    errors.teacher
}

required


options={[


{
value:"",
label:"Select Teacher"
},



...teachers.map(teacher=>(


{

value:teacher._id,

label:teacher.username

}


))


]}


/>








<Input

type="time"

label="Start Time"

name="startTime"

value={
    formData.startTime
}

onChange={
    handleChange
}

error={
    errors.startTime
}

required

/>







<Input

type="time"

label="End Time"

name="endTime"

value={
    formData.endTime
}

onChange={
    handleChange
}

error={
    errors.endTime
}

required

/>







<Input

label="Room"

name="room"

value={
    formData.room
}

onChange={
    handleChange
}

placeholder="Room 101"

/>






</div>



</FormCard>







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

onClick={()=>


navigate(
    "/teacher/timetables"
)


}

>

Cancel

</Button>






<Button

type="submit"

loading={loading}

>

{

isEdit

?

"Update Timetable"

:

"Create Timetable"

}


</Button>





</div>





</form>



</div>

);

}



export default TimetableForm;