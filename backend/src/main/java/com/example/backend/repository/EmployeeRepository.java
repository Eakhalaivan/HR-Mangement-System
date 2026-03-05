package com.example.backend.repository;

import com.example.backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Map;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);

    @Query("SELECT e.department as department, COUNT(e) as count FROM Employee e GROUP BY e.department")
    List<Object[]> countEmployeesByDepartment();
}
