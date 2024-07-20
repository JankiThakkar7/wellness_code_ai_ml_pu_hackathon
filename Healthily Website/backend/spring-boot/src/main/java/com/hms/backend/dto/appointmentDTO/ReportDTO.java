package com.hms.backend.dto.appointmentDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportDTO {
    String appointmentID;
    String report;
}
