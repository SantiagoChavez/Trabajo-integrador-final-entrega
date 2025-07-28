import React from 'react';
import fondoJava from '../assets/techlab-bg.jpg';

const Inicio = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.texto}>Sistema de Gestión - TechLab</h1>
      <img src={fondoJava} alt="Fondo Java" style={styles.image} />
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#4b5765',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    maxWidth: '70%',
    maxHeight: '60%',
    objectFit: 'contain',
    zIndex: 0,
  },
  texto: {
    color: 'white',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px black',
    position: 'absolute',
    top: '10%',
    textAlign: 'center',
    width: '100%',
    zIndex: 1,
  },
};

export default Inicio;