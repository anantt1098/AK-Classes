import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPodcast, FaExternalLinkAlt, FaVideo } from "react-icons/fa";

import { getStudentLiveClasses } from "../../services/liveClass.service";
import Loader from "../../components/common/Loader";

function getEmbedUrl(url) {
    if (!url) return null;
    let videoId = "";
    if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("watch?v=")) {
        videoId = url.split("watch?v=")[1]?.split("&")[0];
    } else if (url.includes("embed/")) {
        videoId = url.split("embed/")[1]?.split("?")[0];
    } else if (url.includes("live/")) {
        videoId = url.split("live/")[1]?.split("?")[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

function StudentLiveClasses() {
    const [liveClasses, setLiveClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLiveClasses = async () => {
        try {
            setLoading(true);
            const res = await getStudentLiveClasses();
            setLiveClasses(res.liveClasses || []);
        } catch (_error) {
            toast.error("Failed to load live classes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLiveClasses();
    }, []);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <FaPodcast className="text-red-600 animate-pulse" /> Live Classes
                </h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Watch real-time live lectures and interactive sessions hosted by your teachers.
                </p>
            </div>

            {/* Live Classes Grid */}
            {loading ? (
                <div className="flex min-h-[300px] items-center justify-center">
                    <Loader />
                </div>
            ) : liveClasses.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <FaPodcast className="mx-auto text-4xl text-slate-300 dark:text-slate-600" />
                    <h3 className="mt-3 text-lg font-bold text-slate-800 dark:text-slate-200">No Live Classes Right Now</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your teachers haven't started any live streams yet. Check back soon!</p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {liveClasses.map((item) => {
                        const embedUrl = getEmbedUrl(item.youtubeLink);
                        return (
                            <div
                                key={item._id}
                                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div>
                                    {embedUrl ? (
                                        <div className="relative aspect-video w-full bg-slate-900">
                                            <iframe
                                                src={embedUrl}
                                                title={item.title}
                                                className="h-full w-full border-0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                            <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                                                <span className="h-2 w-2 rounded-full bg-white animate-ping"></span>
                                                LIVE NOW
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex aspect-video w-full items-center justify-center bg-slate-800 text-slate-400">
                                            <FaVideo size={36} />
                                        </div>
                                    )}

                                    <div className="p-5 space-y-3">
                                        <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">
                                            {item.title}
                                        </h3>

                                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                                            {item.description || "No live class description."}
                                        </p>

                                        <div className="flex flex-wrap gap-2 text-xs font-medium pt-1">
                                            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                                Class: {item.studentClass}
                                            </span>
                                            {item.stream && (
                                                <span className="rounded-md bg-purple-50 px-2.5 py-1 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300">
                                                    {item.stream}
                                                </span>
                                            )}
                                            <span className="rounded-md bg-red-50 px-2.5 py-1 text-red-700 dark:bg-red-950/50 dark:text-red-300">
                                                {item.subject}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 p-4 dark:border-slate-800">
                                    <a
                                        href={item.youtubeLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-2.5 text-xs font-bold text-white transition-all hover:bg-red-700 shadow-md"
                                    >
                                        Join Live Class <FaExternalLinkAlt className="text-xs" />
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default StudentLiveClasses;
