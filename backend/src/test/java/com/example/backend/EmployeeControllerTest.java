package com.example.backend;

import com.example.backend.controller.EmployeeController;
import com.example.backend.entity.Employee;
import com.example.backend.service.EmployeeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(EmployeeController.class)
public class EmployeeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EmployeeService employeeService;

    @Test
    void testGetAllEmployees() throws Exception {
        Employee e1 = new Employee();
        e1.setId(1L);
        e1.setFirstName("John");
        e1.setLastName("Doe");
        e1.setEmail("john.doe@company.com");
        e1.setDepartment("Engineering");

        when(employeeService.getAllEmployees()).thenReturn(Arrays.asList(e1));

        mockMvc.perform(get("/api/employees")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].firstName").value("John"));
    }
    @Test
    void testCreateEmployee_Success() throws Exception {
        Employee e = new Employee();
        e.setFirstName("Jane");
        e.setLastName("Doe");
        e.setEmail("jane.doe@company.com");
        e.setDepartment("Engineering");

        when(employeeService.createEmployee(any(Employee.class))).thenReturn(e);

        mockMvc.perform(post("/api/employees")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"firstName\":\"Jane\",\"lastName\":\"Doe\",\"email\":\"jane.doe@company.com\",\"department\":\"Engineering\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email").value("jane.doe@company.com"));
    }

    @Test
    void testCreateEmployee_Conflict() throws Exception {
        when(employeeService.createEmployee(any(Employee.class))).thenThrow(new IllegalArgumentException("Email already exists"));

        mockMvc.perform(post("/api/employees")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"firstName\":\"Jane\",\"lastName\":\"Doe\",\"email\":\"jane.doe@company.com\",\"department\":\"Engineering\"}"))
                .andExpect(status().isConflict())
                .andExpect(content().string("Email already exists"));
    }
}
