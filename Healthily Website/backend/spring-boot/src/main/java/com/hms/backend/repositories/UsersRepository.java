package com.hms.backend.repositories;

import com.hms.backend.entities.Users;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends MongoRepository<Users, String> {
    public Users findByEmail(String email);

    void deleteByEmail(String email);
}
