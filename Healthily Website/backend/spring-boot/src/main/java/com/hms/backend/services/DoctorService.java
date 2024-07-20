package com.hms.backend.services;

import com.hms.backend.dto.doctorDTO.GetAvailableDoctorDTO;
import com.hms.backend.entities.Appointment;
import com.hms.backend.entities.Doctors;
import com.hms.backend.repositories.AppointmentRepository;
import com.hms.backend.repositories.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;
    public Long getCount(){
        return doctorRepository.count();
    }
    public Doctors checkDoc(String email){
        return doctorRepository.findByEmail(email);
    }
    public void saveDoc(Doctors doctors){
        doctorRepository.save(doctors);
    }

    public List<Appointment> allAppointment(String doctorEmail){
        return appointmentRepository.findAllByDoctorEmail(doctorEmail);
    }
    public List<Appointment> upcomingAppointment(String email) {

        LocalDate currentDate = LocalDate.now();
        YearMonth yearMonth = YearMonth.from(currentDate);
        LocalDate lastDayOfMonth = yearMonth.atEndOfMonth();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String startDate = currentDate.format(formatter);
        String endDate = lastDayOfMonth.format(formatter);
        return appointmentRepository.findByDateBetweenAndDoctorEmail(startDate, endDate,email);
    }
    public List<Appointment> appointmentByDate(String date,String email){
        return appointmentRepository.findByDateAndDoctorEmail(date,email);
    }

    public List<String> doctorEmailFromAppointment(String date, String time){
        List<Appointment> appointments = appointmentRepository.findByDateAndTime(date,time);
        List<String> doctorsEmail = new ArrayList<>();
        for (Appointment appointment : appointments){
            doctorsEmail.add(appointment.getDoctorEmail());
        }
        return doctorsEmail;
    }

    public List<GetAvailableDoctorDTO> getDoctor(String day, String time, List<String> specializations, List<String> emailsToDiscard) {
        List<GetAvailableDoctorDTO> getAvailableDoctorDTOS = new ArrayList<>();
        for (String specialization : specializations){
            List<Doctors> doctors = doctorRepository.findDoctorsByTimeSlotAndSpecializationAndEmailNotIn(day,time,specialization,emailsToDiscard);
          for (Doctors doctor : doctors){
              GetAvailableDoctorDTO getAvailableDoctorDTO = new GetAvailableDoctorDTO();
              getAvailableDoctorDTO.setName(doctor.getFirstName() + " " + doctor.getLastName());
              getAvailableDoctorDTO.setEmail(doctor.getEmail());
              getAvailableDoctorDTO.setImage(doctor.getProfileImg());
              getAvailableDoctorDTO.setSpecialization(doctor.getSpecialization());
              getAvailableDoctorDTOS.add(getAvailableDoctorDTO);
          }
        }
        return getAvailableDoctorDTOS;
    }
    public void deleteDoctor(String email) {
        Optional<Doctors> optionalDoctor = Optional.ofNullable(doctorRepository.findByEmail(email));
        if (optionalDoctor.isPresent()) {
            doctorRepository.deleteByEmail(email);

        }

    }
}
