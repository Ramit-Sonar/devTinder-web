
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Connections = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests ?? []);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [processingRequest, setProcessingRequest] = useState(null);
    const [toast, setToast] = useState(null);

    // Fetch received requests
    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true);
            setError("");

            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/user/requests/received`,
                    { withCredentials: true }
                );

                if (!Array.isArray(res.data.data)) {
                    throw new Error("Invalid request data received.");
                }

                dispatch(addRequest(res.data.data));
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Failed to fetch requests."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [dispatch]);

    // Display toast and automatically hide it
    const showToast = (message, type = "success") => {
        setToast({ message, type });

        setTimeout(() => {
            setToast(null);
        }, 3000);
    };

    // Accept or reject a request
    const reviewRequest = async (status, requestId) => {
        if (processingRequest) return;

        setProcessingRequest(requestId);

        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/request/review/${status}/${requestId}`,
                {},
                { withCredentials: true }
            );

            // Remove the card only after the API succeeds
            dispatch(
                addRequest(
                    requests.filter(
                        (request) => request._id !== requestId
                    )
                )
            );

            showToast(
                status === "accepted"
                    ? "Request accepted successfully!"
                    : "Request rejected successfully!",
                "success"
            );
        } catch (err) {
            showToast(
                err.response?.data?.message ||
                "Something went wrong. Please try again.",
                "error"
            );
        } finally {
            setProcessingRequest(null);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
                <span className="loading loading-spinner loading-lg text-primary" />
                <p className="text-base-content/60">
                    Loading received requests...
                </p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center px-4">
                <div className="card w-full max-w-md bg-base-100 shadow-xl">
                    <div className="card-body items-center text-center">
                        <h2 className="text-xl font-bold">
                            Unable to load requests
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

    return (
        <main className="min-h-screen bg-base-300 px-4 pt-8 pb-24 sm:px-8">
            {/* Toast Notification */}
            {toast && (
                <div className="toast toast-top toast-end z-50">
                    <div
                        role="status"
                        className={`alert shadow-lg ${toast.type === "success"
                                ? "alert-success"
                                : "alert-error"
                            }`}
                    >
                        <span className="text-lg">
                            {toast.type === "success" ? "✓" : "!"}
                        </span>

                        <span>{toast.message}</span>

                        <button
                            type="button"
                            className="btn btn-ghost btn-xs"
                            aria-label="Dismiss notification"
                            onClick={() => setToast(null)}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            <div className="mx-auto max-w-5xl">
                {/* Page Heading */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-base-content">
                        Received Requests
                    </h1>

                    <p className="mt-2 text-sm text-base-content/60">
                        People who want to connect with you.
                    </p>

                    <div className="mt-4 h-px bg-base-300" />

                    <p className="mt-4 text-sm font-medium text-base-content/70">
                        {requests.length}{" "}
                        {requests.length === 1 ? "request" : "requests"}
                    </p>
                </div>

                {/* Empty State */}
                {requests.length === 0 ? (
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center py-12 text-center">
                            <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-4xl">
                                👥
                            </div>

                            <h2 className="text-2xl font-bold">
                                No received requests
                            </h2>

                            <p className="max-w-sm text-base-content/60">
                                You don't have any pending connection
                                requests. Check back later!
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {requests.map((request) => {
                            const user = request.fromUserId;

                            if (
                                !user ||
                                typeof user !== "object"
                            ) {
                                return null;
                            }

                            const isProcessing =
                                processingRequest === request._id;

                            return (
                                <article
                                    key={request._id}
                                    className="rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
                                >
                                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                                        {/* Profile Photo */}
                                        <div className="flex shrink-0 justify-center sm:justify-start">
                                            <img
                                                src={
                                                    user.photoUrl ||
                                                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                        `${user.firstName || ""} ${user.lastName || ""}`
                                                    )}`
                                                }
                                                alt={`${user.firstName || ""} ${user.lastName || ""}`}
                                                onError={(e) => {
                                                    e.currentTarget.onerror = null;
                                                    e.currentTarget.src =
                                                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                            `${user.firstName || ""} ${user.lastName || ""}`
                                                        )}`;
                                                }}
                                                className="h-24 w-24 rounded-full border border-base-300 object-cover"
                                            />
                                        </div>

                                        {/* Profile Details */}
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                                <h2 className="text-xl font-bold text-base-content">
                                                    {user.firstName}{" "}
                                                    {user.lastName}
                                                </h2>

                                                <div className="flex flex-wrap gap-2">
                                                    {user.age != null && (
                                                        <span className="rounded-md bg-base-200 px-3 py-1 text-sm">
                                                            Age: {user.age}
                                                        </span>
                                                    )}

                                                    {user.gender && (
                                                        <span className="rounded-md bg-base-200 px-3 py-1 text-sm capitalize">
                                                            {user.gender}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* About */}
                                            <div className="mt-5">
                                                <h3 className="mb-1 text-sm font-semibold">
                                                    About
                                                </h3>

                                                <p className="break-words text-sm leading-6 text-base-content/70">
                                                    {user.about ||
                                                        "No description added yet."}
                                                </p>
                                            </div>

                                            {/* Skills */}
                                            <div className="mt-5">
                                                <h3 className="mb-2 text-sm font-semibold">
                                                    Skills
                                                </h3>

                                                <div className="flex flex-wrap gap-2">
                                                    {Array.isArray(
                                                        user.skills
                                                    ) &&
                                                        user.skills.length > 0 ? (
                                                        user.skills.map(
                                                            (skill, index) => (
                                                                <span
                                                                    key={`${skill}-${index}`}
                                                                    className="rounded-md border border-base-300 px-3 py-1 text-xs font-medium"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            )
                                                        )
                                                    ) : (
                                                        <p className="text-sm text-base-content/50">
                                                            No skills added
                                                            yet.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Accept / Reject */}
                                            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                                                <button
                                                    type="button"
                                                    className="btn btn-success sm:min-w-28"
                                                    disabled={
                                                        processingRequest !==
                                                        null
                                                    }
                                                    onClick={() =>
                                                        reviewRequest(
                                                            "accepted",
                                                            request._id
                                                        )
                                                    }
                                                >
                                                    {isProcessing ? (
                                                        <span className="loading loading-spinner loading-sm" />
                                                    ) : (
                                                        "Accept"
                                                    )}
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-error btn-outline sm:min-w-28"
                                                    disabled={
                                                        processingRequest !==
                                                        null
                                                    }
                                                    onClick={() =>
                                                        reviewRequest(
                                                            "rejected",
                                                            request._id
                                                        )
                                                    }
                                                >
                                                    {isProcessing ? (
                                                        <span className="loading loading-spinner loading-sm" />
                                                    ) : (
                                                        "Reject"
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Connections;
