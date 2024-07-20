package com.hms.backend.repositories;

import com.hms.backend.entities.Appointment;
import com.hms.backend.entities.Report;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface AppointmentRepository extends MongoRepository<Appointment, ObjectId> {
    List<Appointment> findByDateAndTime(String date,String time);

    @Query("{'date': {'$gte': ?0,'$lte': ?1}}")
    List<Appointment> findByDateBetween(String currentDate,String endDate);

    List<Appointment> findByDate(String date);

    List<Appointment> findAllByDoctorEmail(String doctorEmail);

    @Query("{'date': {'$gte': ?0,'$lte': ?1},'doctorEmail': ?2}")
    List<Appointment> findByDateBetweenAndDoctorEmail(String startDate, String endDate, String email);

    @Query("{'date': ?0,'doctorEmail': ?1}")
    List<Appointment> findByDateAndDoctorEmail(String date,String email);

    List<Appointment> findAllByPatientEmail(String patientEmail);

    @Query("{'date': {'$gte': ?0,'$lte': ?1},'patientEmail': ?2}")
    List<Appointment> findByDateBetweenAndPatientEmail(String startDate, String endDate,String email);

    @Query("{'date': ?0,'patientEmail': ?1}")
    List<Appointment> findByDateAndPatientEmail(String date,String email);
    Appointment findById(String id);
}
