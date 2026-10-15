
import { useState } from "react";
import { ChevronDown, UserRound, Camera, X, Check } from "lucide-react";

const EditProfile = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        photoUrl: "",
        gender: "",
        age: "",
        about: "",
        skills: "",
    });

    const [genderOpen, setGenderOpen] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const inputClass =
        "w-full rounded-xl border border-base-300 bg-base-100 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

    const labelClass = "mb-2 block text-sm font-semibold";

    return (
        <main className="min-h-[calc(100vh-120px)] bg-base-200 px-4 py-8">
            <div className="mx-auto max-w-2xl">

                {/* Page heading */}
                <div className="mb-7 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <UserRound size={25} />
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight">
                        Edit Profile
                    </h1>

                    <p className="mt-2 text-sm text-base-content/60">
                        Personalize your profile and let people know you better.
                    </p>
                </div>

                {/* Main card */}
                <div className="overflow-visible rounded-3xl border border-base-300 bg-base-100 shadow-xl">

                    {/* Profile preview */}
                    <div className="flex items-center gap-4 border-b border-base-300 p-5 sm:p-6">
                        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-base-200 ring-2 ring-primary/30">
                            {formData.photoUrl ? (
                                <img
                                    src={formData.photoUrl}
                                    alt="Profile preview"
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                />
                            ) : (
                                <UserRound size={32} className="text-base-content/40" />
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <h2 className="truncate text-lg font-bold">
                                {formData.firstName || formData.lastName
                                    ? `${formData.firstName} ${formData.lastName}`.trim()
                                    : "Your profile"}
                            </h2>

                            <p className="mt-1 text-sm text-base-content/60">
                                Make your profile reflect who you are.
                            </p>

                            <div className="mt-2 flex items-center gap-1 text-xs text-primary">
                                <Camera size={14} />
                                <span>Update your photo below</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-7 p-5 sm:p-7">

                        {/* Personal information */}
                        <section>
                            <div className="mb-4">
                                <h3 className="font-bold">Personal Information</h3>
                                <p className="mt-1 text-xs text-base-content/50">
                                    Add your basic details.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>First Name</label>
                                    <input
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
                                    <label className={labelClass}>Last Name</label>
                                    <input
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
                                    <label className={labelClass}>Age</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        placeholder="Your age"
                                        min="18"
                                        max="100"
                                        className={inputClass}
                                    />
                                </div>

                                {/* Gender dropdown: menu is positioned below the button */}
                                <div className="relative">
                                    <label className={labelClass}>Gender</label>

                                    <button
                                        type="button"
                                        aria-expanded={genderOpen}
                                        aria-haspopup="listbox"
                                        onClick={() => setGenderOpen((open) => !open)}
                                        className={`${inputClass} flex items-center justify-between text-left`}
                                    >
                                        <span className={formData.gender ? "capitalize" : "text-base-content/45"}>
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
                                <h3 className="font-bold">Profile Details</h3>
                                <p className="mt-1 text-xs text-base-content/50">
                                    Help others discover more about you.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className={labelClass}>Profile Photo URL</label>
                                    <input
                                        type="url"
                                        name="photoUrl"
                                        value={formData.photoUrl}
                                        onChange={handleChange}
                                        placeholder="https://example.com/photo.jpg"
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>About Me</label>
                                    <textarea
                                        name="about"
                                        value={formData.about}
                                        onChange={handleChange}
                                        placeholder="Tell others about your interests, personality, or goals..."
                                        rows={4}
                                        maxLength={300}
                                        className={`${inputClass} resize-y`}
                                    />

                                    <p className="mt-1 text-right text-xs text-base-content/50">
                                        {formData.about.length}/300
                                    </p>
                                </div>

                                <div>
                                    <label className={labelClass}>Skills & Interests</label>
                                    <input
                                        type="text"
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        placeholder="React, Node.js, MongoDB"
                                        className={inputClass}
                                    />

                                    <p className="mt-1 text-xs text-base-content/50">
                                        Separate each skill with a comma.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col-reverse gap-3 border-t border-base-300 bg-base-200/40 p-5 sm:flex-row sm:justify-end sm:px-7">
                        <button
                            type="button"
                            className="btn btn-outline rounded-xl sm:min-w-28"
                        >
                            <X size={17} />
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="btn btn-primary rounded-xl sm:min-w-36"
                        >
                            <Check size={17} />
                            Save Changes
                        </button>
                    </div>
                </div>

                <p className="mt-4 text-center text-xs text-base-content/50">
                    Your profile helps people get to know you better.
                </p>
            </div>
        </main>
    );
};

export default EditProfile;
