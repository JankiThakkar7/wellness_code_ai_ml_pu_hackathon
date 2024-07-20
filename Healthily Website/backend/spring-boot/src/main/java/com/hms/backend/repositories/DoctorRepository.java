package com.hms.backend.repositories;

import com.hms.backend.entities.Appointment;
import com.hms.backend.entities.Doctors;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface DoctorRepository extends MongoRepository<Doctors, String> {
    Doctors findByEmail(String Email);

    @Query("{ 'timeSlots': { $elemMatch: { 'day': ?0, 'time': ?1 } }, 'specialization':  ?2 , 'email': { $nin: ?3 } }")
    List<Doctors> findDoctorsByTimeSlotAndSpecializationAndEmailNotIn(String day, String time, String specializations, List<String> emailsToDiscard);

    void deleteByEmail(String email);

}
