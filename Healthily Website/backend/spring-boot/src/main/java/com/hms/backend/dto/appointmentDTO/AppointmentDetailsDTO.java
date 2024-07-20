package com.hms.backend.dto.appointmentDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentDetailsDTO {
    String _id;
    String date;
    String time;
    String title;
    String doctorName;
    String patientName;
    String specialization;
    String doctorEmail;
    String patientEmail;
    String description;
    Boolean status;
    String report;
}
