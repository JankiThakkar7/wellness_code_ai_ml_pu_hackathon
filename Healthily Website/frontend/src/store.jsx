import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./pages/register/RegisterSlice";
import patientPresentReducer from "./pages/patient/PatientPresentSlice";
import doctorPresentReducer from "./pages/doctor/DoctorPresentSlice";
import calendarReducer from "./components/calander/CalendarSlice";

export const store = configureStore({
  reducer: {
    registerPage: registerReducer,
    patientPresent: patientPresentReducer,
    doctorPresent: doctorPresentReducer,
    calendar: calendarReducer,
  },
});
