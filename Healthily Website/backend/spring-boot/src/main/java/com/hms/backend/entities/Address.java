package com.hms.backend.entities;

import lombok.Data;

@Data
public class Address {
    private String country;
    private String state;
    private String city;
    private String pincode;
    private String building;
    private String houseNo;
}