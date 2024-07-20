package com.hms.backend.repositories;

import com.hms.backend.entities.Report;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReportRepository extends MongoRepository<Report, ObjectId> {
    public Report findByAppointmentID(String appointmentID);
}
