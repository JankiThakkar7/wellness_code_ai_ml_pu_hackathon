package com.hms.backend.repositories;

import com.hms.backend.entities.Patients;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientsRepository extends MongoRepository<Patients, String> {
    Patients findByEmail(String email);
}
