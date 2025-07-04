import { useState, useEffect } from "react";
import { config } from "../../config";

export interface ApodData {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: "image" | "video";
  date: string;
  copyright?: string;
}

const NASA_APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${config.NASA_API_KEY}`;

export const useNasaApod = () => {
  const [data, setData] = useState<ApodData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApod = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(NASA_APOD_URL);

      if (!response.ok) {
        throw new Error(`NASA API Error: ${response.status}`);
      }

      const apodData: ApodData = await response.json();
      setData(apodData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar dados da NASA"
      );
      console.error("Erro na NASA APOD API:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApod();
  }, []);

  return { data, loading, error, refetch: fetchApod };
};
