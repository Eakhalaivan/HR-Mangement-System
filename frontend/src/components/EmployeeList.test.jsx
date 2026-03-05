import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EmployeeList from './EmployeeList';
import * as api from '../services/api';

vi.mock('../services/api');

describe('EmployeeList Component', () => {
    it('renders loading state initially', () => {
        vi.mocked(api.getEmployees).mockResolvedValue([]);
        render(<EmployeeList />);
        expect(screen.getByText(/Loading employees.../i)).toBeInTheDocument();
    });

    it('renders employee data after loading', async () => {
        const mockEmployees = [
            { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@test.com', department: 'Engineering' }
        ];
        vi.mocked(api.getEmployees).mockResolvedValue(mockEmployees);

        render(<EmployeeList />);

        const employeeName = await screen.findByText(/John Doe/i);
        expect(employeeName).toBeInTheDocument();
    });
});
