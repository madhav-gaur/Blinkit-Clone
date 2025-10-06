import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import Axios from '../utils/axios';
import SummaryApi from '../common/summaryAPI';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const UserProfileEdit = ({ user, isEditProfile, setIsEditProfile }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(user?.avatar ? "Update Profile" : "Add a Profile Pic");

    const handleUploadProfile = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            setLoading("Uploading...");
            const response = await Axios({
                ...SummaryApi.uploadAvatar,
                data: formData,
            });

            const updatedUser = response.data?.data;
            if (updatedUser) {
                dispatch(setUserDetails(updatedUser));
                setIsEditProfile(false);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading("Profile Updated");
        }
    };

    return (
        <section className='profile-edit-wrapper' style={{ display: isEditProfile ? "flex" : "none" }}>
            <div className='profile-edit'>
                <div className='profile-edit-close' onClick={() => {
                    setIsEditProfile(false)
                    setLoading(user?.avatar ? "Update Profile" : "Add a Profile Pic")
                }}>
                    <IoClose />
                </div>
                <div>
                    {user?.avatar ? (
                        <div className='user-logo'>
                            <img src={user.avatar} alt="" />
                        </div>
                    ) : (
                        <div className='user-logo' style={{ cursor: "pointer" }}>
                            <p>{user?.name?.charAt(0)}</p>
                        </div>
                    )}
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label className='upload-profile' htmlFor="uploadProfile">
                        {loading}
                        <input
                            onChange={handleUploadProfile}
                            type="file"
                            name='uploadProfile'
                            id='uploadProfile'
                            style={{ display: 'none' }}
                        />
                    </label>
                </form>
            </div>
        </section>
    );
};

export default UserProfileEdit;
