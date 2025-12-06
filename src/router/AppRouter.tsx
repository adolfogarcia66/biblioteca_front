// src/routes/AppRouter.tsx
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import LibrosPage from "../pages/LibrosPage";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../pages/HomePage";
import RegistroPage from "../pages/RegistroPage";
import RentPage from "../pages/RentPage";
import RentedBooksPage from "../pages/RentedBooksPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegistroPage />} />
      <Route
        path="/libros"
        element={
          <PrivateRoute>
            <LibrosPage />
          </PrivateRoute>
        }
      />
       <Route
          path="/rent"
          element={
            <PrivateRoute>
              <RentPage />
            </PrivateRoute>
          }
        />
         <Route
          path="/mis-books"
          element={
            <PrivateRoute>
              <RentedBooksPage />
            </PrivateRoute>
          }
        />
    </Routes>
  );
};

export default AppRouter;
