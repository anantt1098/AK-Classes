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
    uploadTest,
    getTestById,
    updateTest,
} from "../../services/test.service";



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


    "11": {

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


    "12": {

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





function TestForm(){


const navigate = useNavigate();


const {id} = useParams();


const isEdit = Boolean(id);



const [loading,setLoading] =
useState(false);



const [errors,setErrors] =
useState({});



const [formData,setFormData] =
useState({

    title:"",

    description:"",

    studentClass:"",

    stream:"",

    subject:"",

    testLink:"",

    dueDate:"",

});





// ==========================================
// Get Subjects
// ==========================================

const getSubjects = ()=>{


    if(
        formData.studentClass==="11" ||
        formData.studentClass==="12"
    ){

        if(!formData.stream)
            return [];


        return (
            subjectData[
                formData.studentClass
            ][
                formData.stream
            ]
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





const fetchTest = async () => {
    try {
        setLoading(true);
        const res = await getTestById(id);
        const test = res.test;

        setFormData({
            title: test.title || "",
            description: test.description || "",
            studentClass: test.studentClass || "",
            stream: test.stream || "",
            subject: test.subject || "",
            testLink: test.testLink || "",
            dueDate: test.dueDate?.split("T")[0] || "",
        });
    } catch (_error) {
        toast.error("Unable to load test.");
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    if (isEdit) {
        fetchTest();
    }
}, [id, isEdit]);





// ==========================================
// Class Change
// ==========================================

const handleClassChange=(e)=>{


setFormData((prev)=>({

    ...prev,

    studentClass:e.target.value,

    stream:"",

    subject:"",

}));


};





// ==========================================
// Stream Change
// ==========================================

const handleStreamChange=(e)=>{


setFormData((prev)=>({

    ...prev,

    stream:e.target.value,

    subject:"",

}));


};





// ==========================================
// Input Change
// ==========================================

const handleChange=(e)=>{


const {
    name,
    value
}=e.target;



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
// ==========================================
// Validation
// ==========================================

const validateForm = () => {

    const newErrors = {};


    if(!formData.title.trim()){

        newErrors.title =
        "Title is required.";

    }


    if(!formData.studentClass){

        newErrors.studentClass =
        "Please select class.";

    }


    if(
        (
            formData.studentClass === "11" ||
            formData.studentClass === "12"
        )
        &&
        !formData.stream
    ){

        newErrors.stream =
        "Please select stream.";

    }


    if(!formData.subject){

        newErrors.subject =
        "Please select subject.";

    }


    if(!formData.testLink.trim()){

        newErrors.testLink =
        "Test link is required.";

    }


    if(!formData.dueDate){

        newErrors.dueDate =
        "Due date is required.";

    }


    setErrors(newErrors);


    return (
        Object.keys(newErrors).length === 0
    );

};




// ==========================================
// Submit
// ==========================================

const handleSubmit = async(e)=>{


e.preventDefault();



if(!validateForm())
return;



try{


setLoading(true);



if(isEdit){


await updateTest(
    id,
    formData
);


toast.success(
    "Test updated successfully."
);



}
else{


await uploadTest(
    formData
);


toast.success(
    "Test uploaded successfully."
);


}



navigate("/teacher/tests");



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
        "Edit Test"
        :
        "Upload Test"
    }

    subtitle="Manage class tests"

/>




<form

onSubmit={handleSubmit}

className="space-y-8"

>


<FormCard

title="Test Information"

subtitle="Enter test details"

/>
<FormCard

title="Test Information"

subtitle="Enter test details"

>


<div className="grid gap-5 md:grid-cols-2">



<Input

label="Test Title"

name="title"

value={formData.title}

onChange={handleChange}

error={errors.title}

required

/>





<Select

label="Class"

name="studentClass"

value={formData.studentClass}

onChange={handleClassChange}

error={errors.studentClass}

required

options={[

{
    value:"",
    label:"Select Class",
},


...[6,7,8,9,10,11,12].map((cls)=>({

    value:String(cls),

    label:`Class ${cls}`,

}))

]}

/>





{

(
formData.studentClass==="11" ||
formData.studentClass==="12"
)

&&


<Select

label="Stream"

name="stream"

value={formData.stream}

onChange={handleStreamChange}

error={errors.stream}

required

options={[

{
    value:"",
    label:"Select Stream",
},


{
    value:"Science",
    label:"Science",
},


{
    value:"Humanities",
    label:"Humanities",
},

]}

/>

}





<Select

label="Subject"

name="subject"

value={formData.subject}

onChange={handleChange}

error={errors.subject}

required


disabled={
    !formData.studentClass ||
    (
        (
            formData.studentClass==="11" ||
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
        formData.studentClass==="11" ||
        formData.studentClass==="12"
    )
    &&
    !formData.stream
)

?

"Select Stream First"

:

"Select Subject",

},


...getSubjects().map((subject)=>({

    value:subject,

    label:subject,

}))

]}

/>





<Input

type="date"

label="Due Date"

name="dueDate"

value={formData.dueDate}

onChange={handleChange}

error={errors.dueDate}

required

/>






<div className="md:col-span-2">


<Input

label="Test Link"

name="testLink"

value={formData.testLink}

onChange={handleChange}

error={errors.testLink}

placeholder="https://..."

required

/>


</div>






<div className="md:col-span-2">


<Textarea

label="Description"

name="description"

value={formData.description}

onChange={handleChange}

placeholder="Enter test description..."

rows={5}

/>


</div>



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

onClick={()=>navigate("/teacher/tests")}

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
"Update Test"
:
"Upload Test"
}

</Button>



</div>




</form>


</div>


);

}



export default TestForm;