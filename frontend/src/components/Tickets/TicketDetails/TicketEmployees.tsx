import './TicketEmployees.scss';
import { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import EmployeeChip from "../../Employees/EmployeeChip";

interface TicketEmployeesProps {
    author: any;
    employees: any[];
}

export default function TicketEmployees({ author, employees }: TicketEmployeesProps) {
    const [expanded, setExpanded] = useState(true);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    if (!author && (!employees || employees.length === 0)) {
        return null; // No employees to display
    }

    return (
        <div className={`ticket-employees ${expanded ? 'expanded' : ''}`}>
            <div className="employees-title">Created by</div>

            <EmployeeChip label={`${author.firstName} ${author.lastName}`} image={author.profilePicUrl} />

            <div className="employees-title" style={{ marginTop: 16 }}>Assigned to</div>

            <div className="employee-list">
                {employees.map((employee) => (
                    <EmployeeChip key={employee.id} label={employee.name} image={employee.profilePicURL} />
                ))}
            </div>
        </div>
    );
}