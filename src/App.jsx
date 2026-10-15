import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { appStore } from "./utils/appStore";

import Body from "./components/Body";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            {/* Only logged-out users can access these */}
            <Route element={<PublicRoute />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>

            {/* Only logged-in users can access these */}
            <Route element={<PrivateRoute />}>
              <Route path="feed" element={<Feed />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;