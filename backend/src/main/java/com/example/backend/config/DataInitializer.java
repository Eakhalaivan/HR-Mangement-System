package com.example.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.example.backend.entity.ERole;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.entity.Employee;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.EmployeeRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("--- DataInitializer: Starting data initialization ---");
        
        // 1. Initialize Roles
        if (roleRepository.findByName(ERole.ROLE_USER).isEmpty()) {
            System.out.println("Creating ROLE_USER...");
            roleRepository.save(new Role(ERole.ROLE_USER));
        }
        if (roleRepository.findByName(ERole.ROLE_ADMIN).isEmpty()) {
            System.out.println("Creating ROLE_ADMIN...");
            roleRepository.save(new Role(ERole.ROLE_ADMIN));
        }

        // 2. Initialize Admin User
        if (userRepository.findByUsername("admin").isEmpty()) {
            System.out.println("Creating default admin user...");
            User admin = new User(
                "admin", 
                "admin@example.com",
                encoder.encode("admin123")
            );

            Set<Role> roles = new HashSet<>();
            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(adminRole);

            admin.setRoles(roles);
            userRepository.save(admin);
            System.out.println("Admin user created successfully!");
        }

        // 3. Sync Existing Employees (Create User Accounts if missing)
        System.out.println("Checking for employees without user accounts...");
        for (Employee employee : employeeRepository.findAll()) {
            if (userRepository.findByEmail(employee.getEmail()).isEmpty()) {
                System.out.println("Creating missing user account for employee: " + employee.getEmail());
                User user = new User(
                    employee.getEmail(),
                    employee.getEmail(),
                    encoder.encode("Welcome123")
                );

                Set<Role> roles = new HashSet<>();
                Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(userRole);
                user.setRoles(roles);
                
                userRepository.save(user);
                System.out.println("User account created for: " + employee.getEmail());
            }
        }

        System.out.println("--- DataInitializer: Finished data initialization ---");
    }
}
