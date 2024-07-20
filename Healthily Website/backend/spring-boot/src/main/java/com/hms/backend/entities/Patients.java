package com.hms.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "patients")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Patients {
    private String profileImg;
    private String firstName;
    private String middleName;
    private String lastName;
    private String gender;
    private String email;
    private String phoneNumber;
    private String aadhar;
    private String birthDate;
    private String bloodGroup;
    private Address address;
}
