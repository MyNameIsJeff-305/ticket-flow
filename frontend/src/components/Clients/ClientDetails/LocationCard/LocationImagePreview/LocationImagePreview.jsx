export default function LocationImagePreview({ image }) {
    return (
        <div className="location-image-preview">
            <img src={image} alt="Location Preview" />
        </div>
    );
}