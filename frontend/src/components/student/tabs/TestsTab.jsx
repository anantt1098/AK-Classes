import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import Table from "../../common/Table";

import {
    getStudentTests,
} from "../../../services/test.service";

import Loader from "../../common/Loader";



const getFullUrl = (url) => {
    if (!url) return null;
    const trimmed = String(url).trim();
    if (!trimmed) return null;
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        return trimmed;
    }
    return `https://${trimmed}`;
};

function TestsTab({ tests: initialTests }) {
    const [tests, setTests] = useState(initialTests || []);
    const [loading, setLoading] = useState(!initialTests);

    const fetchTests = async () => {
        try {
            setLoading(true);
            const res = await getStudentTests();
            setTests(res.tests || []);
        } catch (_error) {
            toast.error("Unable to load tests.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (initialTests) {
            setTests(initialTests);
            setLoading(false);
        } else {
            fetchTests();
        }
    }, [initialTests]);

    const columns = [
        {
            title: "Test",
            key: "title",
        },
        {
            title: "Subject",
            key: "subject",
        },
        {
            title: "Due Date",
            key: "dueDate",
            render: (row) =>
                row.dueDate ? new Date(row.dueDate).toLocaleDateString() : "-",
        },
        {
            title: "Teacher",
            key: "teacher",
            render: (row) => row.uploadedBy?.username || "N/A",
        },
        {
            title: "Action",
            key: "action",
            render: (row) => {
                const link = getFullUrl(row.testLink);
                if (!link) {
                    return <span className="text-xs text-slate-400">No Link</span>;
                }
                return (
                    <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-700"
                    >
                        Open Test
                    </a>
                );
            },
        },
    ];







    if(loading){

        return <Loader />;

    }







    return (

        <div className="space-y-6">


            <h2 className="text-2xl font-bold">

                Tests

            </h2>





            <Table

                columns={columns}

                data={tests}

                emptyMessage="No tests available."

            />



        </div>

    );

}



export default TestsTab;