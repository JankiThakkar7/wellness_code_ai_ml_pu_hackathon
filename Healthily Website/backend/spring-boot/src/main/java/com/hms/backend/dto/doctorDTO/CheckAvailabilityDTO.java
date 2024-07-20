package com.hms.backend.dto.doctorDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckAvailabilityDTO {
    private String date;
    private String time;
    private String day;
    private String description;
}
