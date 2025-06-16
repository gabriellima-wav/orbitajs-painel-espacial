import axios from 'axios';

const NASA_API_KEY = '6tNfMVEstZPgjzn4jpeKNH1S8uXAxDbtURQXThBw';

export async function fetchAPOD() {
  try {
    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar APOD NASA:', error);
    throw error;
  }
}
