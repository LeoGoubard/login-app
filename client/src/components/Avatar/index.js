import React from 'react';
import styles from "../../styles/Username.module.css";
import { useAuthStore } from "../../store/store";

const Avatar = ({ profile }) => {
    const profilPic = useAuthStore(state => state.auth.profilePic)
    return (
        <div className="profile flex justify-center py-4">
            <img src={profile || profilPic} className={styles.profile_img} alt="avatar" />
        </div>
    )
}

export default Avatar