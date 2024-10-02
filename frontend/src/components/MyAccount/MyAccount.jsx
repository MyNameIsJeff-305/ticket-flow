// import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// import { updateUserThunk } from '../../store/session';

import { FaPen } from "react-icons/fa6";
// import { FaSave } from "react-icons/fa";

import './MyAccount.css'

export default function MyAccount({ user }) {

    // const dispatch = useDispatch();

    // const [profilePicUrl, setProfilePicUrl] = useState(user.profilePicUrl);

    // const [isEditing, setIsEditing] = useState(false);



    useEffect(() => {
        // if (isEditing) {
        //     dispatch(updateUserThunk(user.id, { image_url: profilePicUrl }));
        // }
    })

    // const updateFile = e => {
    //     // const file = e.target.files[0];
    //     // if (file) setProfilePicUrl(file);
    // };

    return (
        <section className="my-account-tab">
            <div className='my-account-header'>
                <h1>My Account</h1>
                <button className='edit-cancel-button' onClick={() => window.alert("Feature Coming Soon...")}>
                    {/* {
                        isEditing ? <FaSave /> : <FaPen />
                    } */}
                    <FaPen />
                </button>
            </div>
            <div className="account-details-container-main">
                <div className="account-picture-container">
                    <img src={user?.profilePicUrl} alt="user-avatar" />
                    <input
                        type="file"
                        name='img_url'
                        // onChange={updateFile}
                        accept='.jpg, .jpeg, .png'
                        // disabled={!isEditing}
                    />
                </div>
                <div className="account-details-container">
                    <div className="details-1">
                        <span>First Name:</span>
                        <input type="text" value={user.firstName} disabled="true"></input>
                    </div>
                    <div className="details-2">
                        <span>Last Name:</span>
                        <input type="text" value={user.lastName} disabled="true"></input>
                    </div>
                </div>
            </div>
        </section>
    );
}