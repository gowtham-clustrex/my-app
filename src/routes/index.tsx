import React from "react";
import { Route, Routes } from "react-router";
import LoginPage from "../pages/LoginPage";
import MainRouter from "./MainRoutes";
import HomePage from "../pages/HomePage";
import NewPatientPage from "../pages/NewPatientPage";
import SchedulePatient from "../pages/SchedulePatient";
import ViewPatient from "../pages/ViewPatient";
import Uploadpage from "../pages/Uploadpage";
import DicomImageList from "../pages/DicomImageList";

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route element={<MainRouter />}>
        <Route path="/" element={<HomePage />} />
        <Route path="new" element={<NewPatientPage />} />
        <Route path="schedule" element={<SchedulePatient />} />
        <Route path="view" element={<ViewPatient />} />
        <Route path="upload" element={<Uploadpage />} />
        <Route path="dicom" element={<DicomImageList />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
