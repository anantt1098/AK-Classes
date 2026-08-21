import {
    useEffect,
    useState,
} from "react";

import toast from "react-hot-toast";

import {
    FaFileAlt,
    FaExternalLinkAlt,
} from "react-icons/fa";


import {
    getStudentNotes,
} from "../../services/notes.service";



import PageHeader from "../../components/dashboard/PageHeader";

function Notes() {


    const [notes,setNotes] =
        useState([]);


    const [loading,setLoading] =
        useState(true);





    const fetchNotes = async () => {
        try {
            setLoading(true);
            const res = await getStudentNotes();
            setNotes(res.notes || []);
        } catch (_error) {
            toast.error("Unable to load notes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);







    return (

        <div className="space-y-6">



            <PageHeader
                title="Notes"
                subtitle="Access your class and subject wise notes."
            />







            {loading ? (
                <div className="py-12 text-center text-slate-500">
                    Loading notes...
                </div>
            ) : notes.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <FaFileAlt className="mx-auto text-4xl text-slate-400" />
                    <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">No Notes Available</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">No notes uploaded by teachers yet.</p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {notes.map((note) => (
                        <div
                            key={note._id}
                            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                                        <FaFileAlt size={18} />
                                    </div>
                                    <h2 className="font-bold text-lg text-slate-900 dark:text-white">
                                        {note.title}
                                    </h2>
                                </div>

                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                    {note.description || "No description provided."}
                                </p>

                                <div className="flex flex-wrap gap-2 text-xs font-medium">
                                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                        Class: {note.studentClass}
                                    </span>
                                    {note.stream && (
                                        <span className="rounded-md bg-purple-50 px-2.5 py-1 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300">
                                            Stream: {note.stream}
                                        </span>
                                    )}
                                    <span className="rounded-md bg-blue-50 px-2.5 py-1 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                                        Subject: {note.subject}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
                                <a
                                    href={note.driveLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-50 py-2.5 text-xs font-bold text-blue-600 transition-all hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:hover:bg-blue-950"
                                >
                                    Open Notes <FaExternalLinkAlt className="text-xs" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>

    );

}



export default Notes;