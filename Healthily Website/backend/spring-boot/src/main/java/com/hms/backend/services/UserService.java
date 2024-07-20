package com.hms.backend.services;

import com.hms.backend.entities.Users;
import com.hms.backend.repositories.UsersRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class UserService {
    @Autowired
    UsersRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;
    public void saveUser(Users user){
        userRepository.save(user);
    }

    public Users findUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public void sendConfirmationMail(String doctorEmail){
        try {
            Resource resource = new ClassPathResource("mail-templates/account-confirmation.html");
            String body = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message,true,"UTF-8");
            helper.setTo(doctorEmail);
            helper.setSubject("Welcome to Healthily-Your Account Confirmation");
            helper.setText(body,true);
            mailSender.send(message);
        }  catch (MessagingException | IOException e) {
            throw new RuntimeException(e);
        }
    }
    public void deleteDoctor(String email){

        userRepository.deleteByEmail(email);

    }
}
