package com.example.backend;

import com.example.backend.entity.Employee;
import com.example.backend.repository.EmployeeRepository;
import com.example.backend.service.EmployeeService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeService employeeService;

    @Test
    void testGetAllEmployees() {
        Employee e1 = new Employee(); e1.setFirstName("John");
        Employee e2 = new Employee(); e2.setFirstName("Jane");
        when(employeeRepository.findAll()).thenReturn(Arrays.asList(e1, e2));

        List<Employee> employees = employeeService.getAllEmployees();
        assertEquals(2, employees.size());
    }

    @Test
    void testGetEmployeeById() {
        Employee e = new Employee(); e.setId(1L); e.setFirstName("John");
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(e));

        Optional<Employee> result = employeeService.getEmployeeById(1L);
        assertTrue(result.isPresent());
        assertEquals("John", result.get().getFirstName());
    }
    @Test
    void testCreateEmployee_Success() {
        Employee e = new Employee();
        e.setEmail("new@company.com");
        when(employeeRepository.findByEmail("new@company.com")).thenReturn(Optional.empty());
        when(employeeRepository.save(any(Employee.class))).thenReturn(e);

        Employee result = employeeService.createEmployee(e);
        assertNotNull(result);
        assertEquals("new@company.com", result.getEmail());
    }

    @Test
    void testCreateEmployee_DuplicateEmail() {
        Employee e = new Employee();
        e.setEmail("existing@company.com");
        when(employeeRepository.findByEmail("existing@company.com")).thenReturn(Optional.of(e));

        assertThrows(IllegalArgumentException.class, () -> {
            employeeService.createEmployee(e);
        });
    }
}
