package com.hms.backend.controllers;

import com.hms.backend.dto.appointmentDTO.AppointmentDTO;
import com.hms.backend.dto.patientDTO.CheckPatientDTO;
import com.hms.backend.dto.patientDTO.SavePatientDataDTO;
import com.hms.backend.entities.Appointment;
import com.hms.backend.entities.Patients;
import com.hms.backend.services.PatientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/healthily/api/patient")
@CrossOrigin(origins = "*")
public class PatientController {
    @Autowired
    PatientsService patientsService;

    @PostMapping("/check")
    public ResponseEntity<String> checkPatient(@RequestBody CheckPatientDTO checkPatientDTO) {
        String email = checkPatientDTO.getEmail();
        Patients patient = patientsService.checkPatient(email);
        if (patient != null) {
            return ResponseEntity.ok("Patient with email " + email + " is available in the database");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Patient with email " + email + " is not found in the database");
        }
    }
    @PostMapping("/viewPatient")
    Patients  viewPatient(@RequestBody Patients patients){
        String email = patients.getEmail();
        return patientsService.viewProfile(email);
    }
    @PutMapping("/update")
    public ResponseEntity<Patients> updatePatient(@RequestBody Patients updatedPatient){
        Patients patients = patientsService.updatePatient(updatedPatient);
        if(patients != null){
            return ResponseEntity.ok(patients);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/savePatient")
    public ResponseEntity<String> savePatient(@RequestBody SavePatientDataDTO savePatientDataDTO) {
        try {
            patientsService.SavePatientData(savePatientDataDTO);
            return ResponseEntity.ok("Patient data saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save patient data: " + e.getMessage());
        }
    }
    @PostMapping("/allAppointment")
    public List<AppointmentDTO> allAppointment(@RequestBody AppointmentDTO appointmentDTO){
        String patientEmail = appointmentDTO.getPatientEmail();
        List<Appointment> appointments = patientsService.allAppointment(patientEmail);
        List<AppointmentDTO> appointmentDTOs = getAppointmentDTOS(appointments);
        return appointmentDTOs;
    }
    @PostMapping("/upComingAppointment")
    public List<AppointmentDTO> upComingAppointment(@RequestBody AppointmentDTO appointmentDTO){
        String patientEmail = appointmentDTO.getPatientEmail();
        List<Appointment> appointments = patientsService.upComingAppointment(patientEmail);
        List<AppointmentDTO> appointmentDTOs = getAppointmentDTOS(appointments);
        return appointmentDTOs;
    }
    @PostMapping("/appointmentByDate")
    public List<AppointmentDTO> getAppointmentByDate(@RequestBody AppointmentDTO appointmentDTO){
        String date = appointmentDTO.getDate();
        String patientEmail = appointmentDTO.getPatientEmail();
        List<Appointment> appointments = patientsService.appointmentByDate(date,patientEmail);
        List<AppointmentDTO> appointmentDTOs = getAppointmentDTOS(appointments);
        return appointmentDTOs;
    }
    private static List<AppointmentDTO> getAppointmentDTOS(List<Appointment> appointments) {
        List<AppointmentDTO> appointmentDTOs = new ArrayList<>();
        for (Appointment appointment : appointments) {
            AppointmentDTO appointment1 = new AppointmentDTO();
            appointment1.set_id(appointment.getId().toString());
            appointment1.setDate(appointment.getDate());
            appointment1.setTime(appointment.getTime());
            appointment1.setTitle(appointment.getTitle());
            appointment1.setDoctorName(appointment.getDoctorName());
            appointment1.setPatientName(appointment.getPatientName());
            appointment1.setDoctorEmail(appointment.getDoctorEmail());
            appointment1.setPatientEmail(appointment.getPatientEmail());
            appointment1.setStatus(appointment.getStatus());
            appointment1.setSpecialization(appointment.getSpecialization());
            appointmentDTOs.add(appointment1);
        }
        return appointmentDTOs;
    }

}
