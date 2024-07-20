package com.hms.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HomeDTO {
    private Long patientCount;
    private Long doctorCount;
    private Long appointmentCount;
}
