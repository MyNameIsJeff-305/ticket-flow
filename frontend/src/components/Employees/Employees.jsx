import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { LuUserPlus } from "react-icons/lu";
import {
    HiOutlineChevronLeft,
    HiOutlineChevronRight,
    HiSortAscending,
    HiSortDescending,
} from "react-icons/hi";

import { getAllUsersThunk, getTotalUsersAmountThunk } from "../../store/session";

import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EmployeeCard from "./EmployeeCard";
import AddEmployee from "./AddEmployee";

import "./Employees.scss";

const SORT_OPTIONS = [
    { label: 'firstName', value: 'ASC', description: "First Name (A-Z)" },
    { label: 'firstName', value: 'DESC', description: "First Name (Z-A)" },
    { label: 'isActive', value: 'ASC', description: "Inactive Employees First" },
    { label: 'isActive', value: 'DESC', description: "Active Employees First" }
];

export default function Employees() {
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const [employeesAddChecker, setEmployeesAddChecker] = useState(false);
    const [employeesEditChecker, setEditEmployeeChecker] = useState(false);
    const [employeesDeleteChecker, setDeleteEmployeeChecker] = useState(false);
    const [sortOption, setSortOption] = useState(SORT_OPTIONS[0]);

    const EMPLOYEES_PER_PAGE = 10;

    const employees = useSelector((state) => state.session.allUsers);
    const totalEmployees = useSelector((state) => state.session.totalUsersAmount);
    const lastPage = Math.ceil(totalEmployees / EMPLOYEES_PER_PAGE);

    useEffect(() => {
        dispatch(getTotalUsersAmountThunk());
        dispatch(getAllUsersThunk(page, EMPLOYEES_PER_PAGE, sortOption.label, sortOption.value));
        setEmployeesAddChecker(false);
        setEditEmployeeChecker(false);
        setDeleteEmployeeChecker(false);
    }, [dispatch, page, employeesAddChecker, employeesEditChecker, employeesDeleteChecker, sortOption]);

    const onModalClose = () => {
        setEmployeesAddChecker(true);
        setEditEmployeeChecker(true);
        setDeleteEmployeeChecker(true);
    }

    const handleSortChange = () => {
        if (sortOption === SORT_OPTIONS[SORT_OPTIONS.length - 1]) {
            setSortOption(SORT_OPTIONS[0]);
            return;
        }

        const currentIndex = SORT_OPTIONS.findIndex(option => option.label === sortOption.label && option.value === sortOption.value);
        const selectedOption = SORT_OPTIONS[currentIndex + 1];
        setSortOption(selectedOption);
    }

    return (
        <section className="employees-tab">
            <div className="employees-section-header">
                <div className="employees-header-left">
                    <h1>Employees</h1>
                    <div className="sorting-button" onClick={handleSortChange}>
                        {sortOption.description === 'First Name (A-Z)' && (
                            <>
                                <HiSortAscending />
                                <p>First Name (A-Z)</p>
                            </>
                        )}
                        {sortOption.description === 'First Name (Z-A)' && (
                            <>
                                <HiSortDescending />
                                <p>First Name (Z-A)</p>
                            </>
                        )}
                        {sortOption.description === 'Inactive Employees First' && (
                            <>
                                <HiSortDescending />
                                <p>Inactive Employees First</p>
                            </>
                        )}
                        {sortOption.description === 'Active Employees First' && (
                            <>
                                <HiSortAscending />
                                <p>Active Employees First</p>
                            </>
                        )}
                    </div>
                </div>
                <OpenModalMenuItem
                    modalComponent={<AddEmployee setEmployeesAddChecker={setEmployeesAddChecker} />}
                    onModalClose={onModalClose}
                    dismisable={false}
                >
                    <button className="add-employee-btn">
                        <LuUserPlus /> Add Employee
                    </button>
                </OpenModalMenuItem>
            </div>

            <div className="employees-list">
                {employees && Object.values(employees).map((employee) => (
                    employee.isActive ? (
                        <EmployeeCard key={employee.id} employee={employee} isActive={true} setEditEmployeeChecker={setEditEmployeeChecker} setDeleteEmployeeChecker={setDeleteEmployeeChecker} />
                    ) : (
                        <EmployeeCard key={employee.id} employee={employee} isActive={false} setEditEmployeeChecker={setEditEmployeeChecker} setDeleteEmployeeChecker={setDeleteEmployeeChecker} />
                    )
                ))}
            </div>

            <div className='employees-footer'>
                <button className='prev-btn' style={{ border: "none" }} disabled={page <= 1} onClick={() => setPage(page - 1)}><HiOutlineChevronLeft /></button>
                <div>
                    <span >
                        {page} of {lastPage}
                    </span>
                </div>
                <button className='next-btn' style={{ border: "none" }} disabled={page >= lastPage} onClick={() => setPage(page + 1)}><HiOutlineChevronRight /></button>
            </div>
        </section>
    );
}