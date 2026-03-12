package com.example.backend.controller;

import com.example.backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/dashboard")
@PreAuthorize("isAuthenticated()")
public class DashboardController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        long totalEmployees = employeeRepository.count();
        List<Object[]> deptCounts = employeeRepository.countEmployeesByDepartment();
        
        List<Map<String, Object>> departmentStats = deptCounts.stream().map(result -> {
            Map<String, Object> deptMap = new HashMap<>();
            deptMap.put("department", result[0]);
            deptMap.put("count", result[1]);
            return deptMap;
        }).collect(Collectors.toList());

        stats.put("totalEmployees", totalEmployees);
        stats.put("departmentStats", departmentStats);
        
        return stats;
    }
}
