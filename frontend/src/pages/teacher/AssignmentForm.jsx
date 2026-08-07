import { useCallback, useEffect, useState } from "react";
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
    createAssignment,
    getAssignmentById,
    updateAssignment,
} from "../../services/assignment.service";



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





function AssignmentForm(){


const navigate = useNavigate();


const {id}=useParams();


const isEdit = Boolean(id);





const [loading,setLoading]=
useState(false);



const [errors,setErrors]=
useState({});





const [formData,setFormData]=
useState({

    title:"",

    description:"",

    studentClass:"",

    stream:"",

    subject:"",

    dueDate:"",

    attachment:"",

    isActive:true,

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

const fetchAssignment = useCallback(async () => {
    try {
        setLoading(true);
        const res = await getAssignmentById(id);
        const assignment = res.assignment;

        setFormData({
            title: assignment.title,
            description: assignment.description,
            studentClass: assignment.studentClass,
            subject: assignment.subject,
            dueDate: assignment.dueDate
                ? new Date(assignment.dueDate)
                      .toISOString()
                      .split("T")[0]
                : "",
            attachment: assignment.attachment || "",
            isActive: assignment.isActive,
        });
    } catch (_error) {
        toast.error("Unable to load assignment.");
    } finally {
        setLoading(false);
    }
}, [id]);

// ==========================================
// Fetch Assignment
// ==========================================

useEffect(() => {
    if (isEdit) {
        fetchAssignment();
    }
}, [isEdit, fetchAssignment]);








// ==========================================
// Handle Class Change
// ==========================================

const handleClassChange=(e)=>{


const value=e.target.value;



setFormData(prev=>({

    ...prev,

    studentClass:value,

    stream:"",

    subject:"",

}));


};







// ==========================================
// Handle Stream Change
// ==========================================

const handleStreamChange=(e)=>{


setFormData(prev=>({


    ...prev,


    stream:
    e.target.value,


    subject:"",


}));


};








// ==========================================
// Handle Change
// ==========================================

const handleChange=(e)=>{


const {

    name,

    value,

    type,

    checked,

}=e.target;



setFormData(prev=>({


    ...prev,


    [name]:

    type==="checkbox"
    ?
    checked
    :
    value,


}));





if(errors[name]){


setErrors(prev=>({


    ...prev,


    [name]:"",


}));


}


};








// ==========================================
// Validation
// ==========================================

const validateForm=()=>{


const newErrors={};




if(!formData.title.trim()){


newErrors.title=
"Title is required.";


}




if(!formData.description.trim()){


newErrors.description=
"Description is required.";


}





if(!formData.studentClass){


newErrors.studentClass=
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


newErrors.stream=
"Please select stream.";


}






if(!formData.subject){


newErrors.subject=
"Please select subject.";


}




if(!formData.dueDate){


newErrors.dueDate=
"Due date is required.";


}




setErrors(newErrors);



return Object.keys(newErrors).length===0;


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


await updateAssignment(

id,

formData

);



toast.success(
"Assignment updated successfully."
);



}
else{


await createAssignment(
formData
);



toast.success(
"Assignment created successfully."
);



}



navigate(
"/teacher/assignments"
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
"Edit Assignment"
:
"Create Assignment"
}

subtitle="Manage assignments"

/>



<form

onSubmit={handleSubmit}

className="space-y-8"

>



<FormCard

title="Assignment Information"

subtitle="Enter assignment details"

/>



<div className="grid gap-5 md:grid-cols-2">



<Input

label="Title"

name="title"

value={formData.title}

onChange={handleChange}

error={errors.title}

placeholder="Assignment title"

required

/>






<Select

label="Class"

name="studentClass"

value={
formData.studentClass
}

onChange={handleClassChange}

error={errors.studentClass}

required

options={[

{
value:"",
label:"Select Class",
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
label:`Class ${cls}`,
}

))

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

value={
formData.stream
}

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
}

]}

/>

}







<Select

label="Subject"

name="subject"

value={
formData.subject
}

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

"Select Subject"

},



...getSubjects().map(subject=>(

{
value:subject,
label:subject,
}

))

]}

/>







<Input

type="date"

label="Due Date"

name="dueDate"

value={
formData.dueDate
}

onChange={handleChange}

error={errors.dueDate}

required

/>







<div className="md:col-span-2">


<Textarea

label="Description"

name="description"

value={
formData.description
}

onChange={handleChange}

error={errors.description}

placeholder="Enter assignment details..."

rows={6}

required

/>


</div>







<div className="md:col-span-2">


<Input

label="Attachment URL"

name="attachment"

value={
formData.attachment
}

onChange={handleChange}

placeholder="https://example.com/file.pdf"

/>


</div>







{

isEdit && (

<div className="md:col-span-2">


<label className="flex items-center gap-3">


<input

type="checkbox"

name="isActive"

checked={
formData.isActive
}

onChange={handleChange}

/>


<span>

Active Assignment

</span>


</label>


</div>

)

}



</div>



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

onClick={()=>navigate(
"/teacher/assignments"
)}

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

"Update Assignment"

:

"Create Assignment"

}


</Button>



</div>





</form>



</div>


);


}



export default AssignmentForm;