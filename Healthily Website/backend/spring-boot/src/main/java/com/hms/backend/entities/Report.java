package com.hms.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "reports")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Report {
    String appointmentID;
    String report;
}
