package com.hms.backend.services;

import com.hms.backend.dto.appointmentDTO.AppointmentDTO;
import com.hms.backend.dto.appointmentDTO.AppointmentDetailsDTO;
import com.hms.backend.dto.appointmentDTO.ReportDTO;
import com.hms.backend.entities.Appointment;
import com.hms.backend.entities.Report;
import com.hms.backend.repositories.AppointmentRepository;
import com.hms.backend.repositories.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private ReportRepository reportRepository;

    public Long getCount(){
        return appointmentRepository.count();
    }

    public void saveAppointment(Appointment appointment){
        appointmentRepository.save(appointment);
    }

    public AppointmentDetailsDTO getAppointment(String id){
        AppointmentDetailsDTO appointmentDetailsDTO = new AppointmentDetailsDTO();
        Appointment appointment = appointmentRepository.findById(id);
        appointmentDetailsDTO.set_id(appointment.getId().toString());
        appointmentDetailsDTO.setDate(appointment.getDate());
        appointmentDetailsDTO.setTime(appointment.getTime());
        appointmentDetailsDTO.setTitle(appointment.getTitle());
        appointmentDetailsDTO.setDoctorName(appointment.getDoctorName());
        appointmentDetailsDTO.setPatientName(appointment.getPatientName());
        appointmentDetailsDTO.setSpecialization(appointment.getSpecialization());
        appointmentDetailsDTO.setDoctorEmail(appointment.getDoctorEmail());
        appointmentDetailsDTO.setPatientEmail(appointment.getPatientEmail());
        appointmentDetailsDTO.setDescription(appointment.getDescription());
        appointmentDetailsDTO.setStatus(appointment.getStatus());
        if(appointment.getStatus()) {
            Report report = reportRepository.findByAppointmentID(id);
            appointmentDetailsDTO.setReport(report.getReport());
        }
        return appointmentDetailsDTO;
    }

    public void generateReport(@RequestBody ReportDTO reportDTO){
        Report report = new Report();
        report.setAppointmentID(reportDTO.getAppointmentID());
        report.setReport(reportDTO.getReport());

        Optional<Appointment> optionalAppointment = Optional.ofNullable(appointmentRepository.findById(reportDTO.getAppointmentID()));
        if (optionalAppointment.isPresent()) {
            Appointment appointment = optionalAppointment.get();
            appointment.setStatus(Boolean.TRUE);
            appointmentRepository.save(appointment);
            reportRepository.save(report);
        }
    }

}
