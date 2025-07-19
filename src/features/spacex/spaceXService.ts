// src/hooks/useSpaceX.ts
import { useEffect, useState } from 'react';

export interface SpaceXLaunch {
  id: string;
  name: string;
  date_utc: string;
  date_unix: number;
  details: string | null;
  links: {
    webcast: string | null;
    wikipedia: string | null;
    article: string | null;
  };
  rocket: string;
  success: boolean | null;
  upcoming: boolean;
}

const SPACEX_UPCOMING_URL = 'https://api.spacexdata.com/v4/launches/upcoming';
const SPACEX_LATEST_URL = 'https://api.spacexdata.com/v4/launches/latest';

export const useSpaceXLaunches = () => {
  const [upcomingLaunches, setUpcomingLaunches] = useState<SpaceXLaunch[]>([]);
  const [nextLaunch, setNextLaunch] = useState<SpaceXLaunch | null>(null);
  const [latestLaunch, setLatestLaunch] = useState<SpaceXLaunch | null>(null); // Nova funcionalidade
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLaunches = async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar próximos lançamentos e último lançamento em paralelo
      const [upcomingResponse, latestResponse] = await Promise.all([
        fetch(SPACEX_UPCOMING_URL),
        fetch(SPACEX_LATEST_URL),
      ]);

      if (!upcomingResponse.ok) {
        throw new Error(
          `SpaceX Upcoming API Error: ${upcomingResponse.status}`
        );
      }

      if (!latestResponse.ok) {
        throw new Error(`SpaceX Latest API Error: ${latestResponse.status}`);
      }

      const upcoming: SpaceXLaunch[] = await upcomingResponse.json();
      const latest: SpaceXLaunch = await latestResponse.json();

      setUpcomingLaunches(upcoming);
      setLatestLaunch(latest);

      // O primeiro da lista é o próximo lançamento
      if (upcoming.length > 0) {
        setNextLaunch(upcoming[0]);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao carregar dados da SpaceX'
      );
      console.error('Erro na SpaceX API:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaunches();
  }, []);

  return {
    upcomingLaunches,
    nextLaunch,
    latestLaunch, // Nova funcionalidade
    loading,
    error,
    refetch: fetchLaunches,
  };
};
