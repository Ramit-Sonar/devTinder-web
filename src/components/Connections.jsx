
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector(
        (store) => store.connections ?? []
    );

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConnections = async () => {
            setLoading(true);
            setError("");

            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/user/connections`,
                    { withCredentials: true }
                );

                const data = res.data.data;

                if (!Array.isArray(data)) {
                    throw new Error("Invalid connections data received.");
                }

                dispatch(addConnection(data));
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Failed to fetch connections. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchConnections();
    }, [dispatch]);

    // Loading state
    if (loading) {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
                <span className="loading loading-spinner loading-lg text-primary" />
                <p className="text-base-content/60">
                    Loading your connections...
                </p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center px-4">
                <div className="card w-full max-w-md border border-error/20 bg-base-100 shadow-xl">
                    <div className="card-body items-center text-center">
                        <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-error/10 text-error">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                                />
                            </svg>
                        </div>

                        <h2 className="text-xl font-bold">
                            Unable to load connections
                        </h2>

                        <p className="text-sm text-base-content/60">
                            {error}
                        </p>

                        <button
                            className="btn btn-primary mt-3"
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Empty state
    if (connections.length === 0) {
        return (
            <div className="flex min-h-[65vh] items-center justify-center px-4">
                <div className="card w-full max-w-md bg-base-100 shadow-xl">
                    <div className="card-body items-center py-12 text-center">
                        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.7}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m12-13a4 4 0 11-8 0 4 4 0 018 0zm3 3a4 4 0 010 8m3 2v-2a4 4 0 00-3-3"
                                />
                            </svg>
                        </div>

                        <h2 className="text-2xl font-bold">
                            No connections yet
                        </h2>

                        <p className="max-w-xs text-base-content/60">
                            Your accepted connections will appear here.
                            Keep connecting with people!
                        </p>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <main className="min-h-screen bg-base-200 px-4 pt-8 pb-24 sm:px-8 sm:pb-28">
            <div className="mx-auto max-w-5xl">

                {/* Page Heading */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-base-content">
                        My Connections
                    </h1>
                    <p className="mt-2 text-sm text-base-content/60">
                        Manage your network and get to know your connections.
                    </p>
                    <div className="mt-4 h-px bg-base-300" />
                    <p className="mt-4 text-sm font-medium text-base-content/70">
                        {connections.length} {connections.length === 1 ? "connection" : "connections"}
                    </p>
                </div>

                {/* Connection List */}
                <div className="space-y-5">
                    {connections.map((connection) => (
                        <article
                            key={connection._id}
                            className="rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
                        >
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

                                {/* Profile Photo */}
                                <div className="flex shrink-0 justify-center sm:justify-start">
                                    <img
                                        src={
                                            connection.photoUrl ||
                                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                `${connection.firstName || ""} ${connection.lastName || ""}`
                                            )}&background=random`
                                        }
                                        alt={`${connection.firstName} ${connection.lastName}`}
                                        className="h-24 w-24 rounded-full border border-base-300 object-cover"
                                    />
                                </div>

                                {/* Profile Details */}
                                <div className="min-w-0 flex-1">

                                    {/* Name and Basic Information */}
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <h2 className="text-xl font-bold text-base-content">
                                            {connection.firstName} {connection.lastName}
                                        </h2>

                                        <div className="flex flex-wrap gap-2">
                                            {connection.age != null && (
                                                <span className="rounded-md bg-base-200 px-3 py-1 text-sm text-base-content/80">
                                                    Age: {connection.age}
                                                </span>
                                            )}

                                            {connection.gender && (
                                                <span className="rounded-md bg-base-200 px-3 py-1 text-sm capitalize text-base-content/80">
                                                    {connection.gender}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* About */}
                                    <div className="mt-5">
                                        <h3 className="mb-1 text-sm font-semibold text-base-content">
                                            About
                                        </h3>
                                        <p className="break-words text-sm leading-6 text-base-content/70">
                                            {connection.about ||
                                                "No description added yet."}
                                        </p>
                                    </div>

                                    {/* Skills */}
                                    <div className="mt-5">
                                        <h3 className="mb-2 text-sm font-semibold text-base-content">
                                            Skills
                                        </h3>

                                        <div className="flex flex-wrap gap-2">
                                            {Array.isArray(connection.skills) &&
                                                connection.skills.length > 0 ? (
                                                connection.skills.map((skill, index) => (
                                                    <span
                                                        key={`${skill}-${index}`}
                                                        className="rounded-md border border-base-300 px-3 py-1 text-xs font-medium text-base-content/80"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))
                                            ) : (
                                                <p className="text-sm text-base-content/50">
                                                    No skills added yet.
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </main>
    );

};

export default Connections;
