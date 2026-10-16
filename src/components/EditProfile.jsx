
import { useEffect, useState } from "react";
import axios from "axios";
import {
    ChevronDown,
    UserRound,
    Camera,
    Check,
    Eye,
    Sparkles,
    RotateCcw,
} from "lucide-react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
    const getInitialData = () => ({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        photoUrl: user?.photoUrl || "",
        gender: user?.gender || "",
        age: user?.age ?? "",
        about: user?.about || "",
        skills: user?.skills?.join(", ") || "",
    });

    const [formData, setFormData] = useState(getInitialData);
    const [genderOpen, setGenderOpen] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [saving, setSaving] = useState(false);

    const dispatch = useDispatch();

    // Hide the success toast after 3 seconds.
    useEffect(() => {
        if (!success) return;

        const timer = setTimeout(() => {
            setSuccess("");
        }, 3000);

        return () => clearTimeout(timer);
    }, [success]);

    // Update the changed field.
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError("");
        setSuccess("");
    };

    // Data for the live preview.
    const previewUser = {
        ...user,
        ...formData,
        age: formData.age === "" ? "" : Number(formData.age),
        skills: formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
    };

    // Reset the form.
    const handleReset = () => {
        setFormData(getInitialData());
        setError("");
        setSuccess("");
        setGenderOpen(false);
    };

    // Save profile to the backend.
    const handleSaveProfile = async () => {
        setError("");
        setSuccess("");

        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            setError("First name and last name are required.");
            return;
        }

        if (
            formData.age !== "" &&
            (!Number.isInteger(Number(formData.age)) ||
                Number(formData.age) < 18 ||
                Number(formData.age) > 100)
        ) {
            setError("Age must be between 18 and 100.");
            return;
        }

        const updatedData = {
            ...formData,
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            photoUrl: formData.photoUrl.trim(),
            age: formData.age === "" ? undefined : Number(formData.age),
            about: formData.about.trim(),
            skills: formData.skills
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean),
        };

        try {
            setSaving(true);

            const res = await axios.patch(
                `${import.meta.env.VITE_API_URL}/profile/edits`,
                updatedData,
                { withCredentials: true }
            );

            dispatch(addUser(res.data.data));
            setSuccess(res.data.message || "Profile updated successfully!");
        } catch (err) {
            setError(
                typeof err.response?.data === "string"
                    ? err.response.data
                    : err.response?.data?.message ||
                    "Something went wrong. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };

    const inputClass =
        "w-full rounded-xl border-2 border-base-content/20 bg-base-100 px-4 py-3 text-sm text-base-content placeholder:text-base-content/45 outline-none transition-all duration-200 hover:border-base-content/35 focus:border-primary focus:ring-4 focus:ring-primary/15";

    const labelClass = "mb-2 block text-sm font-semibold";
    const sectionTitleClass = "text-base font-bold";

    return (
        <main className="min-h-[calc(100vh-120px)] bg-base-100 px-4 py-8 sm:px-6 lg:py-10">

            {/* Success toast */}
            {success && (
                <div className="toast toast-top toast-end z-[100] p-4">
                    <div role="status" className="alert alert-success shadow-lg">
                        <Check size={20} />
                        <span>{success}</span>
                    </div>
                </div>
            )}

            <div className="mx-auto max-w-6xl">

                {/* Page heading */}
                <div className="mb-8">
                    <div className="mb-3 flex items-center gap-2 text-primary">
                        <Sparkles size={20} />
                        <span className="text-sm font-semibold">
                            Make it personal
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Edit your profile
                    </h1>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-base-content/60 sm:text-base">
                        Update your details and see how your profile looks
                        before saving your changes.
                    </p>
                </div>

                {/* Form and preview */}
                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">

                    {/* Profile form */}
                    <section className="min-w-0 overflow-visible rounded-3xl border border-base-300 bg-base-100 shadow-sm">

                        <div className="flex items-center gap-3 border-b border-base-300 p-5 sm:p-6">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <UserRound size={23} />
                            </div>

                            <div>
                                <h2 className="font-bold">Your information</h2>
                                <p className="mt-1 text-xs text-base-content/60">
                                    Your profile details and interests
                                </p>
                            </div>
                        </div>

                        <div className="space-y-7 p-5 sm:p-7">

                            {/* Personal information */}
                            <section>
                                <div className="mb-4">
                                    <h3 className={sectionTitleClass}>
                                        Personal information
                                    </h3>
                                    <p className="mt-1 text-xs text-base-content/60">
                                        Tell people a little about yourself.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                    <div>
                                        <label className={labelClass} htmlFor="firstName">
                                            First name
                                        </label>
                                        <input
                                            id="firstName"
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="Enter first name"
                                            autoComplete="given-name"
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass} htmlFor="lastName">
                                            Last name
                                        </label>
                                        <input
                                            id="lastName"
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Enter last name"
                                            autoComplete="family-name"
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass} htmlFor="age">
                                            Age
                                        </label>
                                        <input
                                            id="age"
                                            type="number"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            placeholder="Enter your age"
                                            min="18"
                                            max="100"
                                            className={inputClass}
                                        />
                                    </div>

                                    {/* Gender dropdown */}
                                    <div className="relative">
                                        <label className={labelClass}>
                                            Gender
                                        </label>

                                        <button
                                            type="button"
                                            aria-expanded={genderOpen}
                                            aria-haspopup="listbox"
                                            onClick={() => setGenderOpen((open) => !open)}
                                            className={`${inputClass} flex items-center justify-between text-left`}
                                        >
                                            <span
                                                className={
                                                    formData.gender
                                                        ? "capitalize"
                                                        : "text-base-content/45"
                                                }
                                            >
                                                {formData.gender || "Select gender"}
                                            </span>

                                            <ChevronDown
                                                size={18}
                                                className={`shrink-0 transition-transform ${genderOpen ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>

                                        {genderOpen && (
                                            <div
                                                role="listbox"
                                                aria-label="Gender"
                                                className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-base-300 bg-base-100 p-1 shadow-xl"
                                            >
                                                {["male", "female", "other"].map((gender) => (
                                                    <button
                                                        key={gender}
                                                        type="button"
                                                        role="option"
                                                        aria-selected={formData.gender === gender}
                                                        onClick={() => {
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                gender,
                                                            }));
                                                            setGenderOpen(false);
                                                            setError("");
                                                            setSuccess("");
                                                        }}
                                                        className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm capitalize transition hover:bg-base-200 ${formData.gender === gender
                                                                ? "bg-primary/10 font-semibold text-primary"
                                                                : ""
                                                            }`}
                                                    >
                                                        {gender}
                                                        {formData.gender === gender && (
                                                            <Check size={16} />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>

                            <div className="border-t border-base-300" />

                            {/* Profile details */}
                            <section>
                                <div className="mb-4">
                                    <h3 className={sectionTitleClass}>
                                        Profile details
                                    </h3>
                                    <p className="mt-1 text-xs text-base-content/60">
                                        Add a photo, introduce yourself, and list your interests.
                                    </p>
                                </div>

                                <div className="space-y-5">

                                    <div>
                                        <label className={labelClass} htmlFor="photoUrl">
                                            Profile photo URL
                                        </label>

                                        <div className="relative">
                                            <Camera
                                                size={18}
                                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40"
                                            />
                                            <input
                                                id="photoUrl"
                                                type="url"
                                                name="photoUrl"
                                                value={formData.photoUrl}
                                                onChange={handleChange}
                                                placeholder="https://example.com/photo.jpg"
                                                className={`${inputClass} pl-10`}
                                            />
                                        </div>

                                        <p className="mt-2 text-xs text-base-content/50">
                                            Paste an image URL to preview your photo.
                                        </p>
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-center justify-between gap-2">
                                            <label className="text-sm font-semibold" htmlFor="about">
                                                About me
                                            </label>
                                            <span className="text-xs text-base-content/50">
                                                {formData.about.length}/300
                                            </span>
                                        </div>

                                        <textarea
                                            id="about"
                                            name="about"
                                            value={formData.about}
                                            onChange={handleChange}
                                            placeholder="Tell people about your personality, interests, or goals..."
                                            rows={5}
                                            maxLength={300}
                                            className={`${inputClass} resize-y leading-6`}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass} htmlFor="skills">
                                            Skills & interests
                                        </label>

                                        <input
                                            id="skills"
                                            type="text"
                                            name="skills"
                                            value={formData.skills}
                                            onChange={handleChange}
                                            placeholder="React, Node.js, MongoDB"
                                            className={inputClass}
                                        />

                                        <p className="mt-2 text-xs text-base-content/50">
                                            Separate each skill with a comma.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Error and action buttons */}
                        <div className="border-t border-base-300 bg-base-200/40 p-5 sm:px-7">
                            {error && (
                                <div
                                    role="alert"
                                    className="alert alert-error mb-4 py-3 text-sm"
                                >
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    disabled={saving}
                                    className="btn btn-ghost rounded-xl"
                                >
                                    <RotateCcw size={16} />
                                    Reset changes
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSaveProfile}
                                    disabled={saving}
                                    className="btn btn-primary rounded-xl"
                                >
                                    {saving ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Check size={17} />
                                            Save changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Live preview */}
                    <aside className="min-w-0 lg:sticky lg:top-6">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Eye size={21} />
                            </div>

                            <div>
                                <h2 className="font-bold">Live preview</h2>
                                <p className="mt-1 text-xs text-base-content/60">
                                    This is how your card will look.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center rounded-3xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-6">
                            <div className="mb-5 flex w-full items-center justify-between">
                                <span className="text-xs font-semibold uppercase tracking-wider text-base-content/50">
                                    Profile card
                                </span>
                                <span className="badge badge-primary badge-outline gap-1">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    Preview
                                </span>
                            </div>

                            <div className="w-full max-w-xs">
                                <UserCard user={previewUser} />
                            </div>
                        </div>
                    </aside>
                </div>

                <p className="mt-6 text-center text-xs text-base-content/50">
                    Make your profile reflect who you are.
                </p>
            </div>
        </main>
    );
};

export default EditProfile;
