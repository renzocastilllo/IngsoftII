import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaFileAlt } from 'react-icons/fa';
import Header from '../components/Header';
import logoicon from '../images/perfil.png';
import styles from '../styles/DetalleInvestigacion.module.css';
import data from '../data/db.json'; 

function DetalleInvestigacion() {
    const { id } = useParams();
    const [likes, setLikes] = useState(0);
    const [investigacion, setInvestigacion] = useState(null); // Estado para almacenar la investigación

    useEffect(() => {
        // Buscar la investigación por ID
        const investigacionEncontrada = data.investigaciones.find(item => item.id === parseInt(id));
        setInvestigacion(investigacionEncontrada);
    }, [id]);

    const handleLike = () => {
        setLikes(likes + 1);
    };

    return (
        <div>
            <Header />
            {investigacion && (
                <div className={styles.container}>
                    <div className={styles.leftColumn}>
                        <button className={styles.regresarButton}>← Regresar</button>
                        <h2 className={styles.title}>{investigacion.title}</h2>
                        <div className={styles.header}>
                            <FaFileAlt className={styles.documentIcon} />
                            <div>
                                <p className={styles.description}>{investigacion.abstract}</p>
                            </div>
                        </div>
                        <div className={styles.commentSection}>
                            <h3>Comenta acerca de este trabajo</h3>
                            <textarea className={styles.commentTextArea} />
                            <button className={styles.submitButton}>Enviar</button>
                        </div>
                        <div className={styles.commentsContainer}>
                            <h3>Comentarios</h3>
                            <div className={styles.comment}>
                                <div className={styles.commentHeader}>
                                    <img
                                        className={styles.commentImage}
                                        src={logoicon}
                                        alt="Perfil"
                                    />
                                    <div className={styles.commentUserInfo}>
                                        <p className={styles.commentUser}>Usuario</p>
                                        <p className={styles.commentDate}>Fecha</p>
                                    </div>
                                </div>
                                <div className={styles.commentContent}>
                                    <p>Contenido del comentario</p>
                                </div>
                            </div>
                            {/* Aquí van los demás comentarios */}
                        </div>
                    </div>
                    <div className={styles.rightColumn}>
                        <div className={styles.infoContainer}>
                            <div className={styles.infoRow}>
                                <div className={styles.infoColumn}>
                                    <div className={styles.infoItem}>
                                        <p className={styles.infoLabel}>Autor:</p>
                                        <p className={styles.tag}>{investigacion.autor}</p>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <p className={styles.infoLabel}>Asesor:</p>
                                        <p className={styles.tag}>{investigacion.asesor}</p>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <p className={styles.infoLabel}>Profesor:</p>
                                        <p className={styles.tag}>{investigacion.profesor}</p>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <p className={styles.infoLabel}>Periodo:</p>
                                        <p className={styles.tag}>{investigacion.periodo}</p>
                                    </div>
                                </div>
                                <div className={styles.infoColumn}>
                                    <div className={styles.infoItem}>
                                        <p className={styles.infoLabel}>Curso:</p>
                                        <p className={styles.tag}>{investigacion.curso}</p>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <p className={styles.infoLabel}>Área / Subárea:</p>
                                        <p className={styles.tag}>{investigacion.area} / {investigacion.subarea}</p>
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
            )}
        </div>
    );
}

export default DetalleInvestigacion;
