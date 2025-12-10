import React, { createContext, useState, useContext } from 'react';
import '../components/Admin.css'; // Importamos el CSS donde está .notificacion-oval

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [mensaje, setMensaje] = useState(null);

  const mostrarNotificacion = (texto) => {
    setMensaje(texto);
    setTimeout(() => {
      setMensaje(null);
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ mostrarNotificacion }}>
      {children}
      {/* Aquí renderizamos la notificación para TODA la app */}
      {mensaje && (
        <div className="notificacion-oval" style={{ zIndex: 99999 }}>
          {mensaje}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);