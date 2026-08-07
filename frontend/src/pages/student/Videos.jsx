import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlayCircle, FaVideo, FaBook } from "react-icons/fa";

import { getStudentVideos } from "../../services/video.service";
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
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

function Videos() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchVideos = async () => {
        try {
            setLoading(true);
            const res = await getStudentVideos();
            setVideos(res.videos || []);
        } catch (_error) {
            toast.error("Unable to load videos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Video Lectures</h1>
                <p className="mt-2 text-slate-500">
                    Watch video lectures uploaded by your teachers for your class and subjects.
                </p>
            </div>

            {videos.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <FaVideo className="mx-auto text-4xl text-slate-400" />
                    <h3 className="mt-4 text-lg font-bold">No Videos Available</h3>
                    <p className="mt-1 text-sm text-slate-500">
                        Your teachers haven't uploaded any video lectures for your class yet.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {videos.map((video) => {
                        const embedUrl = getEmbedUrl(video.youtubeLink);
                        return (
                            <div
                                key={video._id}
                                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div>
                                    {embedUrl ? (
                                        <iframe
                                            src={embedUrl}
                                            title={video.title}
                                            className="h-48 w-full border-0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <div className="flex h-48 w-full items-center justify-center bg-slate-100 dark:bg-slate-800">
                                            <a
                                                href={video.youtubeLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:underline"
                                            >
                                                <FaPlayCircle className="text-xl" /> Watch on YouTube
                                            </a>
                                        </div>
                                    )}

                                    <div className="p-5">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                                                <FaBook /> {video.subject}
                                            </span>
                                            <span className="text-xs text-slate-400">
                                                Class {video.studentClass}
                                            </span>
                                        </div>

                                        <h3 className="mt-3 font-bold text-slate-900 line-clamp-2 dark:text-white">
                                            {video.title}
                                        </h3>
                                        {video.description && (
                                            <p className="mt-2 text-xs text-slate-500 line-clamp-3">
                                                {video.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 p-4 dark:border-slate-800">
                                    <a
                                        href={video.youtubeLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-2.5 text-xs font-bold text-red-600 transition-all hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950"
                                    >
                                        <FaPlayCircle /> Open Full Video
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

export default Videos;