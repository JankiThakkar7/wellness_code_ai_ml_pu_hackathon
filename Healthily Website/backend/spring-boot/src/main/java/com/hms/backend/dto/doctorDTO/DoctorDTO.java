package com.hms.backend.dto.doctorDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDTO {
    private String date;
    private String time;
    private String day;
    private List<String> clientKeyWords;
    private String email;
}
