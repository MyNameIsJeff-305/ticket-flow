import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getUserThunk } from "../../../store/session";

import './EmployeeDetails.scss';


export default function EmployeeDetails() {
    const dispatch = useDispatch();

    const { employeeId } = useParams();

    const employee = useSelector(state => state.session.selectedUser)

    useEffect(() => {
        dispatch(getUserThunk(employeeId));
    }, [dispatch, employeeId]);

    return (
        <div className="employee-details">
            {employee ? (
                <div className="employee-header">
                    <h1>Employee Details</h1>
                    <div className="employee-basic-info">
                        <div className="employee-profile-picture">
                            {employee.profilePicUrl ? (
                                <img src={employee.profilePicUrl} alt="Employee Profile" />
                            ) : (
                                <div className="placeholder-image">
                                    <span>{employee.firstName ? employee.firstName.charAt(0).toUpperCase() : ''}{employee.lastName ? employee.lastName.charAt(0).toUpperCase() : ''}</span>
                                </div>
                            )}
                        </div>
                        <div className="employee-basic-info-text">
                            <div className="name-status">
                                <h2>{employee.firstName} {employee.lastName}</h2>
                                <span className={`status-badge-${employee.isActive ? 'active' : 'inactive'}`}>
                                    {employee.isActive ? 'ACTIVE' : 'INACTIVE'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )
                : (<p>Loading...</p>)}
        </div>
    );
}