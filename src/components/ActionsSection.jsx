import React from 'react';

function ActionsSection() {
  return (
    <div className="actions-section">
      <button className="action-button select-button">Seleccionar</button>
      <div className="button-group"> {/* Agrupamos Eliminar y Subir Archivo */}
        <button className="action-button delete-button">Eliminar</button>
        <button className="action-button upload-button">Subir Archivo</button>
      </div>
    </div>
  );
}

export default ActionsSection;
