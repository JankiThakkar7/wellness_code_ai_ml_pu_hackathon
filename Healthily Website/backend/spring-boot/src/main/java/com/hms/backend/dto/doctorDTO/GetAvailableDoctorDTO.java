package com.hms.backend.dto.doctorDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetAvailableDoctorDTO {
    private String name;
    private String image;
    private String specialization;
    private String email;
}
