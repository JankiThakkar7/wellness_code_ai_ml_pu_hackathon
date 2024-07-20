package com.hms.backend.controllers;

import com.hms.backend.dto.HomeDTO;
import com.hms.backend.services.AppointmentService;
import com.hms.backend.services.DoctorService;
import com.hms.backend.services.PatientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.KeyPair;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("healthily/api/home")
@CrossOrigin(origins = "*")
public class HomeController {
    @Autowired
    private PatientsService patientsService;
    @Autowired
    private DoctorService doctorService;
    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("count")
    public ResponseEntity<HomeDTO> homeStats(){
        return ResponseEntity.ok(new HomeDTO(patientsService.getCount(),doctorService.getCount(),appointmentService.getCount()));
    }
}


