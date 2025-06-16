import React, { useState, useEffect } from 'react';

interface APODData {
  title: string;
  explanation: string;
  url: string;
  media_type: string;
  date: string;
}

interface SpaceXLaunch {
  name: string;
  date_utc: string;
  details: string;
  links: {
    patch: { small: string; };
    webcast: string;
  };
}

const DashboardPage: React.FC = () => {
  const [apodData, setApodData] = useState<APODData | null>(null);
  const [nextLaunch, setNextLaunch] = useState<SpaceXLaunch | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const NASA_API_KEY = 'DEMO_KEY';

  // Estilos inline
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
      color: 'white',
      padding: '2rem',
      fontFamily: 'Inter, sans-serif'
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '3rem'
    },
    title: {
      fontSize: '3rem',
      fontWeight: 700,
      marginBottom: '0.5rem',
      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '2rem',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      padding: '2rem',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'transform 0.3s ease'
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem'
    },
    badge: {
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: 600,
      background: 'linear-gradient(45deg, #4ecdc4, #44bd87)'
    },
    image: {
      width: '100%',
      height: '200px',
      objectFit: 'cover' as const,
      borderRadius: '15px',
      marginBottom: '1rem'
    },
    button: {
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      border: 'none',
      padding: '0.8rem 1.5rem',
      borderRadius: '25px',
      color: 'white',
      fontWeight: 600,
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
      marginTop: '1rem'
    },
    countdown: {
      display: 'flex',
      gap: '1rem',
      margin: '1rem 0',
      padding: '1rem',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '10px'
    },
    countdownItem: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      minWidth: '50px'
    },
    countdownNumber: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#ff6b6b'
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50vh',
      fontSize: '1.2rem'
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (nextLaunch) {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const target = new Date(nextLaunch.date_utc).getTime();
        const difference = target - now;

        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
          });
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [nextLaunch]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [apodResponse, spacexResponse] = await Promise.all([
        fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`),
        fetch('https://api.spacexdata.com/v4/launches/upcoming')
      ]);

      const apodResult = await apodResponse.json();
      const spacexResult = await spacexResponse.json();
      
      setApodData(apodResult);
      if (spacexResult.length > 0) {
        setNextLaunch(spacexResult[0]);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          🚀 Carregando dados do espaço...
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🚀 Dashboard Espacial</h1>
        <p>Explore o universo com dados da NASA e SpaceX</p>
      </header>

      <div style={styles.grid}>
        {/* Card NASA */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2>🌌 Imagem do Dia - NASA</h2>
            <span style={styles.badge}>NASA</span>
          </div>
          
          {apodData && (
            <div>
              {apodData.media_type === 'image' ? (
                <img src={apodData.url} alt={apodData.title} style={styles.image} />
              ) : (
                <iframe
                  src={apodData.url}
                  title={apodData.title}
                  style={styles.image}
                  frameBorder="0"
                />
              )}
              <h3 style={{ color: '#4ecdc4', marginBottom: '0.5rem' }}>{apodData.title}</h3>
              <p style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>📅 {formatDate(apodData.date)}</p>
              <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
                {apodData.explanation.length > 150 
                  ? `${apodData.explanation.substring(0, 150)}...` 
                  : apodData.explanation
                }
              </p>
            </div>
          )}
        </div>

        {/* Card SpaceX */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2>🚀 Próximo Lançamento</h2>
            <span style={styles.badge}>SpaceX</span>
          </div>
          
          {nextLaunch ? (
            <div>
              <h3 style={{ color: '#4ecdc4', marginBottom: '0.5rem' }}>{nextLaunch.name}</h3>
              <p style={{ color: '#a0a0a0' }}>🗓️ {formatDate(nextLaunch.date_utc)}</p>
              
              <div style={styles.countdown}>
                <div style={styles.countdownItem}>
                  <span style={styles.countdownNumber}>{timeLeft.days}</span>
                  <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>dias</span>
                </div>
                <div style={styles.countdownItem}>
                  <span style={styles.countdownNumber}>{timeLeft.hours}</span>
                  <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>horas</span>
                </div>
                <div style={styles.countdownItem}>
                  <span style={styles.countdownNumber}>{timeLeft.minutes}</span>
                  <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>min</span>
                </div>
                <div style={styles.countdownItem}>
                  <span style={styles.countdownNumber}>{timeLeft.seconds}</span>
                  <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>seg</span>
                </div>
              </div>
              
              {nextLaunch.details && (
                <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
                  {nextLaunch.details.length > 100 
                    ? `${nextLaunch.details.substring(0, 100)}...` 
                    : nextLaunch.details
                  }
                </p>
              )}
              
              {nextLaunch.links?.webcast && (
                <a href={nextLaunch.links.webcast} target="_blank" rel="noopener noreferrer" style={styles.button}>
                  📺 Assistir ao Vivo
                </a>
              )}
            </div>
          ) : (
            <p>Nenhum lançamento programado</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
