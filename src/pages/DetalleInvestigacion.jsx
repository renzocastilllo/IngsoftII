import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaFileAlt } from 'react-icons/fa';
import Header from '../components/Header';
import logoicon from '../images/perfil.png';
import styles from '../styles/DetalleInvestigacion.module.css';

function DetalleInvestigacion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(0);
  const [investigacion, setInvestigacion] = useState(null);
  const [error, setError] = useState('');
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchInvestigacion = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/v1/articles/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 403) {
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Error fetching investigation details');
        }

        const data = await response.json();
        setInvestigacion(data.articleDetailDTO);
        setComments(data.comments);
      } catch (error) {
        setError('Error fetching investigation details');
        console.error(error);
      }
    };

    fetchInvestigacion();
  }, [id, navigate]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/v1/articles/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ comment: newComment }),
      });

      if (!response.ok) {
        throw new Error('Error adding comment');
      }

      const data = await response.json();
      setComments([...comments, data]);
      setNewComment('');
    } catch (error) {
      setError('Error adding comment');
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      {error && <p className={styles.error}>{error}</p>}
      {investigacion ? (
        <div className={styles.container}>
          <div className={styles.leftColumn}>
            <button className={styles.regresarButton} onClick={() => navigate(-1)}>← Regresar</button>
            <h2 className={styles.title}>{investigacion.title}</h2>
            <div className={styles.header}>
              <FaFileAlt className={styles.documentIcon} />
              <div>
                <p className={styles.description}>{investigacion.resume}</p>
              </div>
            </div>
            <div className={styles.commentSection}>
              <h3>Comenta acerca de este trabajo</h3>
              <textarea
                className={styles.commentTextArea}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button className={styles.submitButton} onClick={handleCommentSubmit}>Enviar</button>
            </div>
            <div className={styles.commentsContainer}>
              <h3>Comentarios</h3>
              {comments.map((comment, index) => (
                <div className={styles.comment} key={index}>
                  <div className={styles.commentHeader}>
                    <img
                      className={styles.commentImage}
                      src={logoicon}
                      alt="Perfil"
                    />
                    <div className={styles.commentUserInfo}>
                      <p className={styles.commentUser}>{comment.username}</p>
                      <p className={styles.commentDate}>{new Date(comment.createdDate).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className={styles.commentContent}>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.infoContainer}>
              <div className={styles.infoRow}>
                <div className={styles.infoColumn}>
                  <div className={styles.infoItem}>
                    <p className={styles.infoLabel}>Autor:</p>
                    <p className={styles.tag}>{investigacion.author}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <p className={styles.infoLabel}>Asesor:</p>
                    <p className={styles.tag}>{investigacion.advisor}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <p className={styles.infoLabel}>Profesor:</p>
                    <p className={styles.tag}>{investigacion.profesor}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <p className={styles.infoLabel}>Periodo:</p>
                    <p className={styles.tag}>{investigacion.period}</p>
                  </div>
                </div>
                <div className={styles.infoColumn}>
                  <div className={styles.infoItem}>
                    <p className={styles.infoLabel}>Curso:</p>
                    <p className={styles.tag}>{investigacion.curso}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <p className={styles.infoLabel}>Área / Subárea:</p>
                    <p className={styles.tag}>{investigacion.area} / {investigacion.subArea}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <p className={styles.infoLabel}>ODS:</p>
                    <p className={styles.tag}>{investigacion.ods.join(', ')}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <p className={styles.infoLabel}>Keywords:</p>
                    <p className={styles.tag}>{investigacion.keywords.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.ratingSection}>
              <p>Me gusta este trabajo:</p>
              <div className={styles.likeSection}>
                <img
                  src="https://img.icons8.com/material-outlined/24/000000/facebook-like.png"
                  alt="Like"
                  className={styles.likeIcon}
                  onClick={handleLike}
                />
                <span className={styles.likesCount}>{likes}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DetalleInvestigacion;
