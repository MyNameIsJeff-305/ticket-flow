import { useEffect, useState } from 'react';
import './DateRangeFilterModal.scss';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../../context/Modal';

interface DateRangeFilterModalProps {
    currentRange?: { startDate: string; endDate: string };
    onSelectRange: (startDate: string, endDate: string) => void;
}

export default function DateRangeFilterModal({
    currentRange,
    onSelectRange,
}: DateRangeFilterModalProps) {
    const [startDate, setStartDate] = useState(currentRange?.startDate || new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(currentRange?.endDate || new Date().toISOString().split('T')[0]);

    const [errors, setErrors] = useState<{ startDate?: string; endDate?: string }>({});
    const [isFormValid, setIsFormValid] = useState(true);

    const { closeModal } = useModal();

    useEffect(() => {
        const newErrors: { startDate?: string; endDate?: string } = {};

        if (!startDate) newErrors.startDate = 'Start date is required';
        if (!endDate) newErrors.endDate = 'End date is required';

        if (startDate && endDate && startDate >= endDate) {
            newErrors.startDate = 'Start date must be before end date';
            newErrors.endDate = 'End date must be after start date';
        }

        setErrors(newErrors);
    }, [startDate, endDate]);

    useEffect(() => {
        setIsFormValid(Object.keys(errors).length === 0);
    }, [errors]);

    const handleSubmit = (e: any) => {
        if (!isFormValid) return;

        e.preventDefault();
        setErrors({});

        onSelectRange(startDate, endDate);
        closeModal();
    };

    return (
        <form className='date-range-filter-form' onSubmit={handleSubmit}>
            <h1>Select Date Range</h1>

            <div className="date-range-filter-form-inputs">
                <div className='date-range-filter-form-input'>
                    <label htmlFor='startDate'>Start Date</label>
                    <input
                        id='startDate'
                        type='date'
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    {errors.startDate && <div className='date-range-filter-error'>{errors.startDate}</div>}
                </div>

                <div className='date-range-filter-form-input'>
                    <label htmlFor='endDate'>End Date</label>
                    <input
                        id='endDate'
                        type='date'
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    {errors.endDate && <div className='date-range-filter-error'>{errors.endDate}</div>}
                </div>
            </div>

            <div className="actions">
                <button type='submit' className="btn-date-range-filter-submit" disabled={!isFormValid}>
                    Apply
                </button>
            </div>
        </form>
    )
}