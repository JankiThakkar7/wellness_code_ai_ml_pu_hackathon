package com.hms.backend.services;

import com.hms.backend.entities.Appointment;
import com.hms.backend.entities.Doctors;
import com.hms.backend.entities.Patients;
import com.hms.backend.repositories.AppointmentRepository;
import com.hms.backend.repositories.DoctorRepository;
import com.hms.backend.repositories.PatientsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PatientsRepository patientsRepository;

    @Autowired
    private DoctorRepository doctorRepository;
    public List<Appointment> allAppointment(){
        return appointmentRepository.findAll();
    }

    public List<Doctors> allDoctors(){
        return doctorRepository.findAll();
    }
  public List<Patients> allPatient(){
        return patientsRepository.findAll();
  }
    public List<Appointment> upComingAppointment(){

        LocalDate currentDate = LocalDate.now();

        YearMonth yearMonth = YearMonth.from(currentDate);
        LocalDate lastDayOfMonth = yearMonth.atEndOfMonth();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String startDate = currentDate.format(formatter);
        String endDate = lastDayOfMonth.format(formatter);
        return appointmentRepository.findByDateBetween(startDate,endDate);
    }
    public List<Appointment> appointmentByDate(String date){
        return appointmentRepository.findByDate(date);
    }
}
