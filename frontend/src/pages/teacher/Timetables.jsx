import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../components/dashboard/PageHeader";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

import {
    getAllTimetables,
    deleteTimetable,
} from "../../services/timetable.service";


function Timetables() {

    const navigate = useNavigate();


    const [timetables,setTimetables] =
        useState([]);


    const [loading,setLoading] =
        useState(true);


    const [page,setPage] =
        useState(1);


    const [totalPages,setTotalPages] =
        useState(1);



    const [filters,setFilters] =
        useState({

            studentClass:"",
            day:"",

        });



    const [selectedTimetable,setSelectedTimetable] =
        useState(null);



    const [showDeleteDialog,setShowDeleteDialog] =
        useState(false);



    const [deleteLoading,setDeleteLoading] =
        useState(false);





    const fetchTimetables = async () => {
        try {
            setLoading(true);
            const res = await getAllTimetables(page, filters);
            setTimetables(res.timetables || []);
            setTotalPages(res.totalPages || 1);
        } catch (_error) {
            toast.error("Unable to load timetables.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTimetables();
    }, [page, filters]);







    const handleDelete = async()=>{


        if(!selectedTimetable)
            return;



        try{

            setDeleteLoading(true);



            await deleteTimetable(
                selectedTimetable._id
            );



            toast.success(
                "Timetable deleted successfully."
            );



            setShowDeleteDialog(false);

            setSelectedTimetable(null);



            fetchTimetables();


        }
        catch(error){

            toast.error(
                error.response?.data?.message ||
                "Unable to delete timetable."
            );

        }
        finally{

            setDeleteLoading(false);

        }

    };






return (

<div className="space-y-8">


<PageHeader

title="Timetables"

subtitle="Manage class timetables"

action={

<Button
onClick={()=>
navigate("/teacher/timetables/new")
}
>
Add Timetable
</Button>

}

/>







<div className="grid gap-4 md:grid-cols-2">



<select

value={filters.studentClass}

onChange={(e)=>

setFilters(prev=>({

...prev,

studentClass:e.target.value,

}))

}

className="
rounded-xl
border
p-3
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
value={cls}
>

Class {cls}

</option>

))

}


</select>








<select

value={filters.day}

onChange={(e)=>

setFilters(prev=>({

...prev,

day:e.target.value,

}))

}

className="
rounded-xl
border
p-3
dark:bg-slate-900
"

>

<option value="">
All Days
</option>

<option>
Monday
</option>

<option>
Tuesday
</option>

<option>
Wednesday
</option>

<option>
Thursday
</option>

<option>
Friday
</option>

<option>
Saturday
</option>


</select>


</div>







{
loading ?

<Loader/>

:

<>



<div className="
hidden
lg:block
overflow-x-auto
rounded-2xl
border
bg-white
dark:bg-slate-900
">


<table className="min-w-full">


<thead className="bg-slate-50 dark:bg-slate-800">


<tr>


<th className="px-5 py-4 text-left">
Class
</th>


<th className="px-5 py-4 text-left">
Day
</th>


<th className="px-5 py-4 text-left">
Subject
</th>


<th className="px-5 py-4 text-left">
Teacher
</th>


<th className="px-5 py-4 text-left">
Time
</th>


<th className="px-5 py-4 text-left">
Room
</th>


<th className="px-5 py-4">
Actions
</th>


</tr>


</thead>






<tbody>


{
timetables.length===0 ?

<tr>

<td
colSpan={7}
className="py-10 text-center"
>

No timetable found.

</td>

</tr>


:

timetables.map(item=>(


<tr
key={item._id}
className="border-b"
>


<td className="px-5 py-4">
{item.studentClass}
</td>


<td className="px-5 py-4">
{item.day}
</td>


<td className="px-5 py-4">
{item.subject}
</td>


<td className="px-5 py-4">
{item.teacher?.username}
</td>


<td className="px-5 py-4">

{item.startTime}
{" - "}
{item.endTime}

</td>


<td className="px-5 py-4">

{item.room || "-"}

</td>



<td className="px-5 py-4">


<div className="flex gap-2">


<Button

onClick={()=>
navigate(
`/teacher/timetables/${item._id}/edit`
)
}

>

Edit

</Button>



<Button

variant="danger"

onClick={()=>{

setSelectedTimetable(item);

setShowDeleteDialog(true);

}}

>

Delete

</Button>



</div>


</td>



</tr>


))

}



</tbody>


</table>


</div>







<div className="grid gap-4 lg:hidden">


{
timetables.map(item=>(


<div

key={item._id}

className="
rounded-2xl
border
bg-white
p-5
dark:bg-slate-900
"

>


<h3 className="font-semibold text-lg">

{item.subject}

</h3>



<div className="mt-3 space-y-2 text-sm">


<p>

<strong>Class:</strong>

{" "}

{item.studentClass}

</p>



<p>

<strong>Day:</strong>

{" "}

{item.day}

</p>



<p>

<strong>Teacher:</strong>

{" "}

{item.teacher?.username}

</p>



<p>

<strong>Time:</strong>

{" "}

{item.startTime}
{" - "}
{item.endTime}

</p>



<p>

<strong>Room:</strong>

{" "}

{item.room || "-"}

</p>


</div>





<div className="mt-5 flex gap-3">


<Button

onClick={()=>
navigate(
`/teacher/timetables/${item._id}/edit`
)
}

>

Edit

</Button>



<Button

variant="danger"

onClick={()=>{

setSelectedTimetable(item);

setShowDeleteDialog(true);

}}

>

Delete

</Button>


</div>



</div>


))

}


</div>






<div className="
flex
justify-between
items-center
mt-6
">


<Button

variant="secondary"

disabled={page===1}

onClick={()=>
setPage(p=>p-1)
}

>

Previous

</Button>




<span>

Page {page} of {totalPages}

</span>





<Button

variant="secondary"

disabled={page===totalPages}

onClick={()=>
setPage(p=>p+1)
}

>

Next

</Button>



</div>



</>

}






{
showDeleteDialog &&

<div className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
z-50
">


<div className="
bg-white
dark:bg-slate-900
p-6
rounded-2xl
w-full
max-w-md
">


<h2 className="text-xl font-semibold">

Delete Timetable

</h2>


<p className="mt-3">

Are you sure?

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

setSelectedTimetable(null);

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

}



</div>


);


}


export default Timetables;