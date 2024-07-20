package com.hms.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Document(collection = "doctors")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Doctors {
    private String profileImg;
    private String email;
    private String firstName;
    private String middleName;
    private String lastName;
    private String gender;
    private String specialization;
    private String contactNumber;
    private String aadhar;
    private List<TimeSlot> timeSlots;
}