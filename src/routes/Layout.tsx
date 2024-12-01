import React from "react";
import Header from "../components/Header";
import { Route } from "react-router";
import MainRouter from "./MainRoutes";
import HomePage from "../pages/HomePage";
import NewPatientPage from "../pages/NewPatientPage";
import SchedulePatient from "../pages/SchedulePatient";
import ViewPatient from "../pages/ViewPatient";

const Layout = () => {
  return (
    <div>
      <Header />
      <Route element={<MainRouter />}>
        <Route path="app" element={<HomePage />} />
        <Route path="new" element={<NewPatientPage />} />
        <Route path="schedule" element={<SchedulePatient />} />
        <Route path="view" element={<ViewPatient />} />
      </Route>
    </div>
  );
};

export default Layout;
