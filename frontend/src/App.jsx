import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddCrop from "./pages/AddCrop";
import CropList from "./pages/CropList";
import EditCrop from "./pages/EditCrop";
import Recommendation from "./pages/Recommendation";

function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Navigate to="/login" />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

            <Route
                path="/add-crop"
                element={<AddCrop />}
            />

            <Route
                path="/crops"
                element={<CropList />}
            />

            <Route
                path="/edit-crop/:id"
                element={<EditCrop />}
            />

            <Route
                path="/recommendations"
                element={<Recommendation />}
            />

        </Routes>

    );

}

export default App;