import './EmployeeChip.scss';
import { BsFillPersonFill } from "react-icons/bs";

interface EmployeeChipProps {
    label: string;
    image?: string;
}

export default function EmployeeChip({ label, image }: EmployeeChipProps) {
    return (
        <div className="employee-chip">
            <div className="employee-image">
                {image ?
                    <img src={image} alt="Employee" /> :
                    <BsFillPersonFill />
                }
            </div>

            <div className="employee-name">
                {label}
            </div>
        </div>
    );
}