package com.hms.backend.controllers;

import com.hms.backend.dto.appointmentDTO.AppointmentDTO;
import com.hms.backend.dto.doctorDTO.AddDoctorDTO;
import com.hms.backend.dto.doctorDTO.DoctorDTO;
import com.hms.backend.entities.Appointment;
import com.hms.backend.entities.Doctors;
import com.hms.backend.entities.Patients;
import com.hms.backend.entities.Users;
import com.hms.backend.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.print.Doc;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/healthily/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    @Autowired
    private UserService userService;

    @Autowired
    private AdminService adminService;

    @Value("${http://localhost:5173}")
    private String frontendUrl;

    @PostMapping("/addDoctor")
    public ResponseEntity<String> addDoctor(@RequestBody AddDoctorDTO addDoctorDTO) {
        String doctorEmail = addDoctorDTO.getEmail();

        Users existingUser = userService.findUserByEmail(doctorEmail);
        if(existingUser!=null){
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("User with email "+ doctorEmail + " already exists");
        }
        userService.sendConfirmationMail(doctorEmail);
        Users user = new Users();
        user.setEmail(doctorEmail);
        user.setRole("DOCTOR");
        userService.saveUser(user);
        return ResponseEntity.ok("Email sent successfully");
    }
    @GetMapping("/allDoctor")
    public List<Doctors> allDoctor(){
        return adminService.allDoctors();
    }

    @GetMapping("/allPatient")
    public List<Patients> allPatient(){
        return adminService.allPatient();
    }

    @GetMapping("/allAppointment")
    public List<AppointmentDTO> allAppointment() {
        List<Appointment> appointments = adminService.allAppointment();
        List<AppointmentDTO> appointmentDTOs = getAppointmentDTOS(appointments);
        return appointmentDTOs;
    }
    @GetMapping("/upComingAppointment")
    public List<AppointmentDTO> upComingAppointment(){
        List<Appointment> appointments = adminService.upComingAppointment();
        List<AppointmentDTO> appointmentDTOs = getAppointmentDTOS(appointments);
        return appointmentDTOs;
    }

    @PostMapping("/appointmentByDate")
    private List<AppointmentDTO> appointmentByDate(@RequestBody AppointmentDTO appointmentDTO){
        String date = appointmentDTO.getDate();
        List<Appointment> appointments = adminService.appointmentByDate(date);
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


