import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../components/dashboard/PageHeader";
import Button from "../../components/common/Button";
import SearchBar from "../../components/common/SearchBar";
import Loader from "../../components/common/Loader";

import {
    getAllAssignments,
    deleteAssignment,
} from "../../services/assignment.service";



// ==========================================
// Subject List
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







function Assignments(){


const navigate = useNavigate();




const [assignments,setAssignments]=
useState([]);




const [loading,setLoading]=
useState(true);




const [page,setPage]=
useState(1);




const [totalPages,setTotalPages]=
useState(1);




const [searchInput,setSearchInput]=
useState("");




const [search,setSearch]=
useState("");





const [filters,setFilters]=
useState({

    studentClass:"",

    stream:"",

    subject:"",

});





const [selectedAssignment,setSelectedAssignment]=
useState(null);




const [showDeleteDialog,setShowDeleteDialog]=
useState(false);




const [deleteLoading,setDeleteLoading]=
useState(false);








// ==========================================
// Get Subjects
// ==========================================

const getSubjects = ()=>{


if(

filters.studentClass==="11" ||

filters.studentClass==="12"

){


if(!filters.stream)

return [];



return (

subjectData[
filters.studentClass
][filters.stream]

||

[]

);


}




return (

subjectData[
filters.studentClass
]

||

[]

);


};
// ==========================================
// Search Debounce
// ==========================================

useEffect(()=>{


const timer=setTimeout(()=>{


    setSearch(searchInput);

    setPage(1);


},500);



return ()=>clearTimeout(timer);


},[searchInput]);








const fetchAssignments = useCallback(async () => {
    try {
        setLoading(true);
        const res = await getAllAssignments(page, {
            search,
            ...filters,
        });
        setAssignments(res.assignments || []);
        setTotalPages(res.totalPages || 1);
    } catch (_error) {
        toast.error("Unable to load assignments.");
    } finally {
        setLoading(false);
    }
}, [page, search, filters]);

// ==========================================
// Fetch Assignments
// ==========================================

useEffect(() => {
    fetchAssignments();
}, [fetchAssignments]);








// ==========================================
// Delete Assignment
// ==========================================

const handleDelete=async()=>{


if(!selectedAssignment)
return;



try{


setDeleteLoading(true);



await deleteAssignment(

selectedAssignment._id

);




toast.success(
"Assignment deleted successfully."
);




setSelectedAssignment(null);


setShowDeleteDialog(false);



fetchAssignments();




}
catch(error){


toast.error(

error.response?.data?.message ||

"Unable to delete assignment."

);



}
finally{


setDeleteLoading(false);


}



};







return (

<div className="space-y-8">



<PageHeader

title="Assignments"

subtitle="Manage assignments"

action={

<Button

onClick={()=>
navigate(
"/teacher/assignments/new"
)
}

>

Add Assignment

</Button>

}

/>





<SearchBar

value={searchInput}

onChange={(e)=>

setSearchInput(
e.target.value
)

}


onClear={()=>{

setSearchInput("");

setSearch("");

}}


placeholder="Search assignments..."

/>







{/* FILTERS */}



<div className="grid gap-4 md:grid-cols-3">





<select

value={
filters.studentClass
}


onChange={(e)=>{


setFilters(prev=>({

    ...prev,

    studentClass:
    e.target.value,

    stream:"",

    subject:"",

}));


}}


className="
rounded-xl
border
border-slate-300
p-3
dark:border-slate-700
dark:bg-slate-900
"

>



<option value="">

All Classes

</option>



{

[6,7,8,9,10,11,12]

.map(cls=>(


<option

key={cls}

value={String(cls)}

>

Class {cls}

</option>


))

}



</select>









{

(

filters.studentClass==="11"

||

filters.studentClass==="12"

)

&&


<select

value={
filters.stream
}


onChange={(e)=>{


setFilters(prev=>({


...prev,


stream:
e.target.value,


subject:"",


}));


}}


className="
rounded-xl
border
border-slate-300
p-3
dark:border-slate-700
dark:bg-slate-900
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









<select

value={
filters.subject
}


onChange={(e)=>


setFilters(prev=>({


...prev,


subject:
e.target.value,


}))


}


disabled={

!filters.studentClass

||

(

(

filters.studentClass==="11"

||

filters.studentClass==="12"

)

&&

!filters.stream

)

}



className="
rounded-xl
border
border-slate-300
p-3
dark:border-slate-700
dark:bg-slate-900
"

>



<option value="">

Select Subject

</option>




{

getSubjects().map(subject=>(


<option

key={subject}

value={subject}

>

{subject}

</option>


))

}



</select>




</div>
{
loading ? (

<Loader />

) : (

<>

{/* Desktop Table */}

<div className="
hidden
overflow-x-auto
rounded-2xl
border
border-slate-200
bg-white
shadow-sm
lg:block
dark:border-slate-700
dark:bg-slate-900
">


<table className="min-w-full">


<thead className="
border-b
bg-slate-50
dark:bg-slate-800
">


<tr>

<th className="px-5 py-4 text-left">
Title
</th>


<th className="px-5 py-4 text-left">
Class
</th>


<th className="px-5 py-4 text-left">
Stream
</th>


<th className="px-5 py-4 text-left">
Subject
</th>


<th className="px-5 py-4 text-left">
Due Date
</th>


<th className="px-5 py-4 text-left">
Uploaded By
</th>


<th className="px-5 py-4 text-center">
Actions
</th>


</tr>


</thead>



<tbody>


{
assignments.length===0 ? (


<tr>

<td

colSpan={7}

className="
py-10
text-center
text-slate-500
"

>

No assignments found.

</td>

</tr>


) : (


assignments.map(item=>(


<tr

key={item._id}

className="
border-b
last:border-b-0
"

>


<td className="px-5 py-4">


<p className="font-semibold">

{item.title}

</p>


<p className="
mt-1
text-sm
text-slate-500
line-clamp-2
">

{item.description}

</p>


</td>





<td className="px-5 py-4">

Class {item.studentClass}

</td>





<td className="px-5 py-4">

{

item.stream
?
item.stream
:
"-"

}

</td>





<td className="px-5 py-4">

{item.subject}

</td>





<td className="px-5 py-4">

{
new Date(
item.dueDate
)
.toLocaleDateString()
}

</td>





<td className="px-5 py-4">

{
item.uploadedBy?.username
}

</td>





<td className="px-5 py-4">


<div className="flex justify-center gap-2">


<Button

onClick={()=>
navigate(
`/teacher/assignments/${item._id}/edit`
)
}

>

Edit

</Button>




<Button

variant="danger"

onClick={()=>{


setSelectedAssignment(item);


setShowDeleteDialog(true);


}}

>

Delete

</Button>


</div>


</td>



</tr>


))


)

}


</tbody>


</table>


</div>







{/* Mobile Cards */}


<div className="
grid
gap-4
lg:hidden
">


{

assignments.length===0 ? (


<div className="
rounded-2xl
border
bg-white
p-8
text-center
shadow-sm
dark:border-slate-700
dark:bg-slate-900
">


No assignments found.


</div>


) : (



assignments.map(item=>(


<div

key={item._id}

className="
rounded-2xl
border
bg-white
p-5
shadow-sm
dark:border-slate-700
dark:bg-slate-900
"

>


<h3 className="text-lg font-semibold">

{item.title}

</h3>



<p className="
mt-2
text-sm
text-slate-500
">

{item.description}

</p>




<div className="
mt-4
space-y-2
text-sm
">


<p>

<strong>
Class:
</strong>{" "}

{item.studentClass}

</p>




{

item.stream &&

<p>

<strong>
Stream:
</strong>{" "}

{item.stream}

</p>

}





<p>

<strong>
Subject:
</strong>{" "}

{item.subject}

</p>





<p>

<strong>
Due Date:
</strong>{" "}

{
new Date(
item.dueDate
)
.toLocaleDateString()
}

</p>





<p>

<strong>
Uploaded By:
</strong>{" "}

{
item.uploadedBy?.username
}

</p>


</div>




<div className="mt-5 flex gap-3">


<Button

onClick={()=>
navigate(
`/teacher/assignments/${item._id}/edit`
)
}

>

Edit

</Button>




<Button

variant="danger"

onClick={()=>{


setSelectedAssignment(item);


setShowDeleteDialog(true);


}}

>

Delete

</Button>



</div>



</div>


))


)


}


</div>







{/* Pagination */}


<div className="
mt-6
flex
items-center
justify-between
">


<Button

variant="secondary"

disabled={
page===1
}

onClick={()=>
setPage(
prev=>prev-1
)
}

>

Previous

</Button>




<span className="text-sm text-slate-500">

Page {page} of {totalPages}

</span>




<Button

variant="secondary"

disabled={
page===totalPages
}

onClick={()=>
setPage(
prev=>prev+1
)
}

>

Next

</Button>


</div>



</>

)

}







{/* Delete Modal */}


{

showDeleteDialog && (


<div className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/40
">


<div className="
w-full
max-w-md
rounded-2xl
bg-white
p-6
shadow-xl
dark:bg-slate-900
">


<h2 className="text-xl font-semibold">

Delete Assignment

</h2>



<p className="mt-3 text-slate-500">

Are you sure you want to delete this assignment?

</p>




<div className="
mt-6
flex
justify-end
gap-3
">


<Button

variant="secondary"

onClick={()=>{


setShowDeleteDialog(false);


setSelectedAssignment(null);


}}

>

Cancel

</Button>




<Button

variant="danger"

loading={deleteLoading}

onClick={handleDelete}

>

Delete

</Button>



</div>


</div>


</div>


)

}



</div>

);

}


export default Assignments;