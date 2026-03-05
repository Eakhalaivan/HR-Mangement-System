package com.example.backend.service;

import com.example.backend.entity.Employee;
import com.example.backend.entity.User;
import com.example.backend.entity.Role;
import com.example.backend.entity.ERole;
import com.example.backend.repository.EmployeeRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder encoder;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    @Transactional
    public Employee createEmployee(Employee employee) {
        System.out.println("Attempting to create employee with email: " + employee.getEmail());
        
        // 1. Check if employee email already exists
        if (employeeRepository.findByEmail(employee.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists in employee records");
        }

        // 2. Check if user already exists
        if (userRepository.existsByEmail(employee.getEmail())) {
            throw new IllegalArgumentException("A user with this email already exists");
        }

        // 3. Save Employee
        Employee savedEmployee = employeeRepository.save(employee);

        // 4. Create User Account for Employee
        User user = new User(
            employee.getEmail(), // username is email
            employee.getEmail(),
            encoder.encode("Welcome123") // default password
        );

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);
        user.setRoles(roles);

        userRepository.save(user);
        System.out.println("Created user account for employee: " + employee.getEmail());

        return savedEmployee;
    }

    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));

        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmail(employeeDetails.getEmail());
        employee.setDepartment(employeeDetails.getDepartment());

        // Note: For simplicity, we are not updating the User username/email here. 
        // In a real system, these should be kept in sync.
        
        return employeeRepository.save(employee);
    }

    @Transactional
    public void deleteEmployee(Long id) {
        System.out.println("Starting delete process for employee ID: " + id);
        try {
            Employee employee = employeeRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
            
            System.out.println("Found employee: " + employee.getEmail());

            // Delete associated user if exists
            userRepository.findByEmail(employee.getEmail()).ifPresent(user -> {
                userRepository.delete(user);
                System.out.println("Deleted associated user account: " + employee.getEmail());
            });

            employeeRepository.delete(employee);
            System.out.println("Deleted employee record successfully: " + id);
        } catch (Exception e) {
            System.err.println("Error during deletion of employee " + id + ": " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
}
