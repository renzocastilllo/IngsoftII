import React, { useState } from 'react';
import styles from '../styles/TrabajosGuardados.module.css';

const Likes = ({ initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className={styles.trabajoLikes}>
      <img
        src="https://img.icons8.com/material-outlined/24/000000/facebook-like.png"
        alt="Like"
        className={styles.likeIcon}
        onClick={handleLike}
      />
      <span className={styles.likesCount}>{likes}</span>
    </div>
  );
};

export default Likes;
