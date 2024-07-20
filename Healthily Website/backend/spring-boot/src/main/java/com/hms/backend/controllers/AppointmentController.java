package com.hms.backend.controllers;

import com.hms.backend.dto.appointmentDTO.AppointmentDTO;
import com.hms.backend.dto.appointmentDTO.AppointmentDetailsDTO;
import com.hms.backend.dto.appointmentDTO.ReportDTO;
import com.hms.backend.entities.Appointment;
import com.hms.backend.services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/healthily/api/appointment")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    AppointmentService appointmentService;

    @PostMapping("/add")
    public void addAppointment(@RequestBody Appointment appointment){
        appointmentService.saveAppointment(appointment);
    }

    @PostMapping("/id")
    public AppointmentDetailsDTO getAppointment(@RequestBody AppointmentDTO appointmentDTO){
        return appointmentService.getAppointment(appointmentDTO.get_id());
    }

    @PostMapping("/generateReport")
    public void saveReport(@RequestBody ReportDTO reportDTO){
        appointmentService.generateReport(reportDTO);
    }
}
