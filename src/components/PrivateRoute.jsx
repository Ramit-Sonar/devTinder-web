import { Navigate, Outlet, useOutletContext } from "react-router";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
    const userData = useSelector((store) => store.user);
    const { authChecked } = useOutletContext();

    if (!authChecked) {
        return <div>Loading...</div>;
    }

    if (!userData) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;