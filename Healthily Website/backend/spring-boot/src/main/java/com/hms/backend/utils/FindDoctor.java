package com.hms.backend.utils;

import java.util.*;

public class FindDoctor {
    public List<String> getDoctorBySpecialiazation(String description){
        List<String> doctorSpecializations = new ArrayList<>();
        Map<String, List<String>> doctorSpecializationMap = new HashMap<>();
        doctorSpecializationMap.put("General", (Arrays.asList(
                "general", "check-up", "cold", "flu", "fever", "cough", "sore", "throat", "headache", "body", "ache", "fatigue", " influenza", "influenza-like", "illness", "common cold", "respiratory", "infection", "viral", "respiratory"
        )));

        doctorSpecializationMap.put("Pediatrician", (Arrays.asList(
                "child", "children", "pediatric", "paediatric", "fever", "cough", "vaccination", "growth", "development", "childhood", "diseases", "infant", "toddler", "newborn", "baby", "colic", "teething", "immunization", "child health", "pediatric"
        )));

        doctorSpecializationMap.put("Cardiologist", (Arrays.asList(
                "heart", "chest", "pain", "high", "blood", "pressure", "hypertension", "arrhythmia", "palpitations", "shortness", "breath", "cardiovascular", "cardiac", "heart disease", "heart attack", "angina", "heart failure", "coronary", "artery", "disease", "cardiac", "arrest", "heart rhythm disorder", "heart"
        )));

        doctorSpecializationMap.put("Dermatologist", (Arrays.asList(

                "skin", "rash", "acne", "eczema", "psoriasis", "dermatitis", "mole", "wart", "skin cancer", "allergy", "itching", "redness", "irritation", "inflammation", "hives", "skin condition", "skin disorder", "dermatological."
        )));

        doctorSpecializationMap.put("Psychiatrist", (Arrays.asList(

                "anxiety", "depression", "stress", "bipolar", "schizophrenia", "OCD", "PTSD", "ADHD", "eating", "disorder", "mental", "health", "psychological", "therapy", "psychiatrist", "counseling", "psychotherapy", "mood", "disorder", "personality disorder."
        )));

        doctorSpecializationMap.put("Ophthalmologist", (Arrays.asList(

                "bone", "fracture", "joint", "pain", "arthritis", "sports", "injury", "back", "knee", "hip", "shoulder", "surgery", "orthopedic", "musculoskeletal", "spine", "osteoarthritis", "rheumatoid arthritis", "sports medicine", "joint replacement."
        )));

        doctorSpecializationMap.put("Gynecologist", (Arrays.asList(
                "women's health", "pregnancy", "childbirth", "pap smear", "contraception", "menopause", "menstrual", "menopause", "pelvic", "infertility", "ovarian", "cyst", "cervical", "cancer", "gynecological", "obstetrics", "obstetrician", "gynecology", "reproductive", "health", "reproductive system."

        )));

        doctorSpecializationMap.put("Endocrinologist", (Arrays.asList(
                "hormonal disorders", "diabetes", "thyroid disorders", "adrenal disorders", "hormone therapy"
        )));

        doctorSpecializationMap.put("Gastroenterologist", (Arrays.asList(
                "digestive health", "gastrointestinal disorders", "crohn's disease","ulcerative colitis", "endoscopy", "colonoscopy"
        )));
        
        doctorSpecializationMap.put("Otolaryngologies", (Arrays.asList(
                "ear", "sore", "throat", "sinusitis", "tonsillitis", "hearing", "loss", "nasal", "congestion", "vertigo", "tinnitus", "ENT", "otolaryngology", "otolaryngologist", "ear nose throat", "laryngitis", "nasal polyps", "hearing impairment."
        )));

        doctorSpecializationMap.put("Neurologist", (Arrays.asList(
                "headache, migraine", "seizure", "epilepsy", "stroke", "Parkinson's", "Alzheimer's", "neuropathy", "neurology", "neurologist", "brain", "nervous", "system", "cognitive", "disorder", "movement disorder", "neurological disorder", "brain tumor."
        )));

        for (Map.Entry<String, List<String>> entry : doctorSpecializationMap.entrySet()){
            String doctorSpecialization = entry.getKey();
            List<String> keywords = entry.getValue();
            String[] words = description.split("\\s+");
            for (String keyword : words) {
                if (keywords.contains(keyword)) {
                    if(!doctorSpecializations.contains(doctorSpecialization)){
                        doctorSpecializations.add(doctorSpecialization);
                    }
                }
            }
        }
        if (doctorSpecializations.isEmpty()){
            doctorSpecializations.add("General");
            return doctorSpecializations;
        } else {
            return doctorSpecializations;
        }
    }
}
