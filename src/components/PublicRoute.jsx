import { Navigate, Outlet, useOutletContext } from "react-router";
import { useSelector } from "react-redux";

const PublicRoute = () => {
    const userData = useSelector((store) => store.user);
    const { authChecked } = useOutletContext();

    if (!authChecked) {
        return <div>Loading...</div>;
    }

    if (userData) {
        return <Navigate to="/feed" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;