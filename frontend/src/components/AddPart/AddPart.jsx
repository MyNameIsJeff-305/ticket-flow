import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import './AddPart.css';

import { addPartThunk } from "../../store/parts";

export default function AddPart({ ticketId, setPartsChecker}) {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState({});

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const { closeModal } = useModal();

    useEffect(() => {
        setName('');
        setDescription('');
        setImageUrl('');
        setErrors({});
        setIsButtonDisabled(true);
    }, []);

    useEffect(() => {
        let newErrors = {};

        if (!name || name ==='') {
            newErrors.name = "Please enter a valid part name";
        }
        setErrors(newErrors);
        setIsButtonDisabled(Object.keys(newErrors).length > 0);
    }, [name]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        const newPart = {
            name: name,
            description: description,
            imageUrl: imageUrl,
            ticketId: ticketId
        }

        // console.log(newPart, "THIS IS NEW PART");

        return dispatch(addPartThunk(newPart))
            .then(() => {
                setPartsChecker(true);
                closeModal();
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    }

    return (
        <div className="add-part-container">
            <form onSubmit={handleSubmit} className="add-part-form">
                <div className="add-part-title">Add a Part</div>
                <div className="add-part-errors">
                    {errors.name && <div>{errors.name}</div>}
                </div>
                <div className="add-part-input">
                    <label>Part Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="add-part-input">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="add-part-input">
                    <label>Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>
                <div className="add-part-buttons">
                    <button type="submit" disabled={isButtonDisabled}>Add Part</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </form>
        </div>
    )
}