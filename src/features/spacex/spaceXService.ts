import axios from 'axios';

export async function fetchUpcomingLaunches() {
  try {
    const response = await axios.post('https://api.spacexdata.com/v4/launches/query', {
      query: { upcoming: true },
      options: { sort: { date_utc: 'asc' }, limit: 5 },
    });
    return response.data.docs;
  } catch (error) {
    console.error('Erro ao buscar lançamentos SpaceX:', error);
    throw error;
  }
}
