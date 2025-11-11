import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { BsClipboardPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

import './Inventory.scss';

import { getAllPartsThunk, getTotalPartsAmountThunk } from "../../store/parts";
import PartCard from "../Parts/PartCard/PartCard";
import AddPart from "../AddPart";
import { getAllStatusThunk } from "../../store/status";

export default function Inventory() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const allParts = useSelector((state) => state.parts.allParts);
    const totalParts = useSelector((state) => state.parts.totalPartsAmount);

    const [page, setPage] = useState(1);
    const [deletePartCkecker, setDeletePartChecker] = useState(false);
    const [addPartCkecker, setAddPartChecker] = useState(false);
    const [editPartCkecker, setEditPartChecker] = useState(false);

    const PARTS_PER_PAGE = 10;

    useEffect(() => {
        dispatch(getTotalPartsAmountThunk());
        dispatch(getAllPartsThunk(page, PARTS_PER_PAGE));
        dispatch(getAllStatusThunk());
        setDeletePartChecker(false);
        setAddPartChecker(false);
        setEditPartChecker(false);
    }, [dispatch, page, addPartCkecker, deletePartCkecker, editPartCkecker]);

    const lastPage = Math.ceil(totalParts / PARTS_PER_PAGE);

    const onModalClose = () => {
        setDeletePartChecker(true);
        setAddPartChecker(true);
        setEditPartChecker(true);
    }

    const goToSpot = (e, part) => {
        e.preventDefault();
        e.stopPropagation();
        return navigate(`/inventory/${part.id}`);
    }

    // if (!allParts || !totalParts)
    if (!allParts)
        return (
            <section className="inventory-tab">
                <div className="section-header">
                    <h1>Inventory</h1>
                    <OpenModalMenuItem
                        // style={{ width: "100%",maxWidth: '400px' }}
                        modalComponent={<AddPart setPartsChecker={setAddPartChecker} />}
                        onModalClose={onModalClose}
                        dismisable={false}
                    >
                        <button className="btn-add-item">
                            <BsClipboardPlus /> Add Part
                        </button>
                    </OpenModalMenuItem>
                </div>

                <section className="inventory-tab">
                    <span className="loader"></span>
                </section>

                <div className="tickets-footer">
                    <button className='prev-btn' style={{ border: "none" }} disabled={page <= 1} onClick={() => setPage(page - 1)}><FaAngleLeft /></button>
                    <div>
                        <span >
                            {page} of {lastPage}
                        </span>
                    </div>
                    <button className='next-btn' style={{ border: "none" }} disabled={page >= lastPage} onClick={() => setPage(page + 1)}><FaAngleRight /></button>
                </div>
            </section>
        );

    return (
        <section className="inventory-tab">
            <div className="section-header">
                <h1>Inventory</h1>
                <OpenModalMenuItem
                    modalComponent={<AddPart setPartsChecker={setAddPartChecker} />}
                    onModalClose={onModalClose}
                    dismisable={false}
                >
                    <button className="btn-add-item">
                        <BsClipboardPlus /> Add Part
                    </button>
                </OpenModalMenuItem>
            </div>

            <div className="inventory-container">
                {allParts.map((part) => (
                    <div key={part.id} className="part-card-wrapper" onClick={(e) => goToSpot(e, part)}>
                        <PartCard part={part} setEditPartChecker={setEditPartChecker} setDeletePartChecker={setEditPartChecker} />
                    </div>
                ))}
            </div>

            <div className="inventory-footer">
                <button className='prev-btn' style={{ border: "none" }} disabled={page <= 1} onClick={() => setPage(page - 1)}><FaAngleLeft /></button>
                <div>
                    <span >
                        {page} of {lastPage}
                    </span>
                </div>
                <button className='next-btn' style={{ border: "none" }} disabled={page >= lastPage} onClick={() => setPage(page + 1)}><FaAngleRight /></button>
            </div>
        </section>
    );
}