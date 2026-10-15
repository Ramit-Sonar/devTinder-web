
const UserCard = ({ user }) => {
    if (!user) return null;

    const {
        firstName,
        lastName,
        photoUrl,
        age,
        gender,
        about,
        skills,
    } = user;

    return (
        <div className="card w-full max-w-xs overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-lg py-7">
            {/* Profile image */}
            <figure className="relative h-52 bg-base-200">
                <img
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                    className="h-full w-full object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-10 text-white">
                    <h2 className="text-xl font-bold">
                        {firstName} {lastName}
                        {age != null && `, ${age}`}
                    </h2>
                    {gender && (
                        <p className="text-xs capitalize text-white/80">
                            {gender}
                        </p>
                    )}
                </div>
            </figure>

            {/* Profile details */}
            <div className="card-body gap-3 p-4">
                <div>
                    <h3 className="mb-1 text-xs font-bold uppercase tracking-wide text-base-content/60">
                        About me
                    </h3>
                    <p className="line-clamp-2 text-sm leading-relaxed">
                        {about || "No introduction added yet."}
                    </p>
                </div>

                {skills?.length > 0 && (
                    <div>
                        <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-base-content/60">
                            Skills & Interests
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                            {skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="badge badge-primary badge-outline badge-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action buttons */}
                <div className="mt-1 flex justify-center gap-5">
                    <button
                        type="button"
                        aria-label="Pass"
                        className="btn btn-circle btn-outline btn-error btn-md"
                    >
                        ✕
                    </button>
                    <button
                        type="button"
                        aria-label="Interested"
                        className="btn btn-circle btn-primary btn-md"
                    >
                        ♥
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
