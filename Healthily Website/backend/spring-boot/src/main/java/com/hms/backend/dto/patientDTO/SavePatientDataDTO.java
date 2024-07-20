package com.hms.backend.dto.patientDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SavePatientDataDTO {
    String profileImg;
    String email;
    String aadhar;
    String birthDate;
    String blood;
    String bloodGroup;
    String building;
    String city;
    String country;
    String firstName;
    String gender;
    String houseNo;
    String lastName;
    String middleName;
    String phoneNumber;
    String pincode;
    String state;
}
