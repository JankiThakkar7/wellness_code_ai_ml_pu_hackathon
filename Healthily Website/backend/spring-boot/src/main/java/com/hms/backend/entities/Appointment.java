package com.hms.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "appointments")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Appointment {

    @Id
    private ObjectId id;
    private String date;
    private String time;
    private String doctorName;
    private String patientName;
    private String patientEmail;
    private String doctorEmail;
    private String title;
    private String specialization;
    private String description;
    private Boolean status=false;

}
