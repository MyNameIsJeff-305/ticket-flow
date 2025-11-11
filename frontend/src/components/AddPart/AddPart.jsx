import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import { addPartThunk } from "../../store/parts";

import './AddPart.scss'

export default function AddPart({ setPartsChecker }) {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [sku, setSku] = useState('');
    // const [imageUrl, setImageUrl] = useState('');
    const [brand, setBrand] = useState('Generic');
    const [model, setModel] = useState('Standard');
    const [unit, setUnit] = useState('unit');
    const [defaultPrice, setDefaultPrice] = useState(0.00);
    const [active, setActive] = useState(true);

    const [errors, setErrors] = useState({});

    const [partImageURL, setPartImageURL] = useState('/assets/placeholder-image.jpg');

    const [selectedFile, setSelectedFile] = useState(null);

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const { closeModal } = useModal();

    useEffect(() => {
        setName('');
        setDescription('');
        setSku('');
        setBrand('');
        setModel('');
        setUnit('');
        setDefaultPrice(0.00);
        setActive(true);
        // setImageUrl('');
        setErrors({});
        setPartImageURL('/assets/placeholder-image.jpg');
        setSelectedFile(null);
        setIsButtonDisabled(true);
    }, []);

    useEffect(() => {
        let newErrors = {};

        if (!name || name === '') {
            newErrors.name = "Please enter a valid part name";
        }

        if (!sku || sku === '') {
            newErrors.sku = "Please enter a valid SKU";
        }

        setErrors(newErrors);
        setIsButtonDisabled(Object.keys(newErrors).length > 0);
    }, [name, sku]);

    const updateFile = e => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const fileURL = URL.createObjectURL(file);
            setPartImageURL(fileURL);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        const newPart = {
            name: name,
            description: description,
            sku: sku,
            brand: brand,
            model: model,
            unit: unit,
            defaultPrice: defaultPrice,
            active: active,
            imageUrl: selectedFile
        }

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
            <div className="add-part-header">
                <h1>Add a Part</h1>
            </div>
            <form onSubmit={handleSubmit} className="add-part-form">
                <div className="add-part-left">
                    <div className="image-wrapper" onClick={() => document.getElementById('hiddenAddFileInput').click()}>
                        <img
                            src={partImageURL}
                            alt="client-avatar"
                            className="client-image"
                        />
                        <div className="image-overlay">Click to upload</div>
                    </div>
                    <input
                        id="hiddenAddFileInput"
                        type="file"
                        name="img_url"
                        capture="environment"
                        accept=".jpg, .jpeg, .png"
                        onChange={updateFile}
                        style={{ display: 'none' }}
                    />
                    {errors.profilePicUrl && <span className="error">{errors.profilePicUrl}</span>}
                </div>
                <div className="add-part-right">
                    <div className="add-part-name-sku">
                        <div className="add-part-input">
                            <label>Part Name</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && <div className="error">{errors.name}</div>}
                        </div>
                        <div className="add-part-input">
                            <label>SKU</label>
                            <input
                                type="text"
                                name="sku"
                                value={sku}
                                onChange={(e) => setSku(e.target.value)}
                            />
                            {errors.sku && <div className="error">{errors.sku}</div>}
                        </div>
                    </div>

                    <div className="add-part-description">
                        <div className="add-part-input">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="brand-model">
                        <div className="add-part-input">
                            <label>Brand</label>
                            <input
                                type="text"
                                name="brand"
                                placeholder="Generic"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </div>
                        <div className="add-part-input">
                            <label>Model</label>
                            <input
                                type="text"
                                name="model"
                                placeholder="Standard"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="unit-price">
                        <div className="add-part-input">
                            <label>Unit</label>
                            <select
                                className="select-unit"
                                type="text"
                                name="unit"
                                placeholder="unit"
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                            >
                                <option value="">Select unit</option>
                                <option value="lb">lb</option>
                                <option value="oz">oz</option>
                                <option value="unit">unit</option>
                                <option value="box">box</option>
                                <option value="pack">pack</option>
                                <option value="set">set</option>
                                <option value="gallon">gallon</option>
                                <option value="other">other</option>
                            </select>
                        </div>
                        <div className="add-part-input">
                            <label>Default Price (USD)</label>
                            <input
                                type="number"
                                name="defaultPrice"
                                min="0.00"
                                step="0.01"
                                value={defaultPrice}
                                onChange={(e) => setDefaultPrice(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="add-part-buttons">
                    <button className="btn-add-part" type="submit" disabled={isButtonDisabled}>Add Part</button>
                    <button className="btn-cancel" onClick={closeModal}>Cancel</button>
                </div>
            </form>
        </div>
    )
}