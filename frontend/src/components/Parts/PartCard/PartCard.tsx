import { FaPen, FaTrash } from "react-icons/fa";
import { PiImageSquare } from "react-icons/pi";

import { useSelector } from "react-redux";

import { getPartTotalStockThunk } from "../../../store/parts";

import { useState, useEffect } from "react";

import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import EditPart from "../../EditPart/EditPart";


import "./PartCard.scss";

interface PartCardProps {
    part: any;
    setDeletePartChecker: any;
    ticketAuthor: any;
    setPartsChecker: any;
}

export default function PartCard({
    part,
    setDeletePartChecker,
    ticketAuthor,
    setPartsChecker
}: PartCardProps) {
    const [totalStock, setTotalStock] = useState<number | null>(null);
    const [isLoadingTotalStock, setIsLoadingTotalStock] = useState(false);

    const currentUser = useSelector((state: any) => state.session.user);

    const onModalClose = () => {
        setPartsChecker(true);
        setDeletePartChecker(true);
    }

    const fetchTotalStock = async () => {
        setIsLoadingTotalStock(true);
        const stock = await getPartTotalStockThunk(part.id);
        setTotalStock(stock || null);
        setIsLoadingTotalStock(false);
    }

    useEffect(() => {
        fetchTotalStock();
    }, []);

    return (
        <div className="part-card">
            <div className="image">
                {part.imageUrl ?
                    // {false ?
                    <img src={part.imageUrl} alt={part.name + " image"} /> :
                    <PiImageSquare className="part-icon" />
                }

            </div>

            <div className="part-info">
                <div className="part-name">{part.name}</div>
                <div className="part-description">{part.description}</div>

                <div className="spacer"></div>

                <div className="part-footer">
                    <div className="part-sku">
                        {part.sku || "N/A"}
                    </div>

                    <div className="part-total-stock">{
                        isLoadingTotalStock ?
                            <div className="spinner" style={{ width: 16, height: 16, borderWidth: 3 }}></div> :
                            totalStock ?
                                // true ?
                                <><strong>{totalStock || '-'}</strong> In Stock</> :
                                <em>Out of Stock</em>
                    }</div>
                </div>
            </div>
        </div>
    );
}