package com.hms.backend.entities;

import lombok.Data;

import java.util.List;
@Data
public class TimeSlot {
   private String day;
   private List<String> time;
}
