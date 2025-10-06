import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineModeEdit } from "react-icons/md";
import './stylesheets/Profile.css';
import UserProfileEdit from '../components/UserProfileEdit';
import Axios from '../utils/axios';
import SummaryApi from '../common/summaryAPI';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';

const Profile = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [isEditProfile, setIsEditProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name,
    mobile: user?.mobile
  });
  useEffect(() => {
    if (user && user.name) {
      setEditForm({
        name: user.name || "",
        mobile: user.mobile || ""
      });
    }
  }, [user]);
  console.log(editForm)
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: editForm,
      });
      console.log(response)

      if (response.data.success) {
        toast.success("Profile updated successfully");
        dispatch(setUserDetails(response.data.data));
        console.log("Updated user: ", response); // ← verify _id exists
        setIsEditing(false);
      }
    } catch (err) {
      toast.error("Failed to update profile");
      console.log(err);
    }
  };

  const handleCancel = () => {
    setEditForm({ name: user?.name || "", mobile: user?.mobile || "" });
    setIsEditing(false);
  };

  return (
    <div className='profile-wrapper'>
      <div>
        <h2 style={{ "fontWeight": 500, "marginBottom": "-1  rem" }}>My Profile</h2>
      </div>
      <div className='profile-image'>
        {user?.avatar ? (
          <div className='user-logo' style={{ "backgroundColor": "white !important", "border": "1px solid #666" }}>
            <img src={user.avatar} alt="" />
          </div>
        ) : (
          <div className='user-logo' style={{ cursor: "pointer" }}>
            <p style={{fontSize: "3rem"}}>{user?.name?.charAt(0)}</p>
          </div>
        )}
        <div className='edit-image'>
          <button onClick={() => setIsEditProfile(true)}>
            <MdOutlineModeEdit />Edit Photo
          </button>
        </div>
        <UserProfileEdit user={user} isEditProfile={isEditProfile} setIsEditProfile={setIsEditProfile} />
      </div>

      <div className='profile-details-wrapper'>
        <form className='profile-details' onSubmit={(e) => e.preventDefault()}>
          <label className='profile-detail-item' htmlFor="name">
            <p>Name</p>
            <input
              type="text"
              name='name'
              id='name'
              value={editForm.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>

          <label className='profile-detail-item' htmlFor="email">
            <p>Email</p>
            <input
              type="email"
              name='email'
              id='email'
              value={user?.email}
              disabled
            />
          </label>

          <label className='profile-detail-item' htmlFor="mobile">
            <p>Mobile</p>
            <input
              type="text"
              name='mobile'
              id='mobile'
              value={editForm.mobile}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder='Not Provided'
            />
          </label>

          {!isEditing ? (
            <button type='button' className='profile-edit-btn' onClick={() => setIsEditing(true)}>
              <MdOutlineModeEdit /> Edit Profile
            </button>
          ) : (
            <div className='profile-edit-btn-group'>
              <button type='button' className='save-btn' onClick={handleUpdate}>Update</button>
              <button type='button' className='cancel-btn' onClick={handleCancel}>Cancel</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
