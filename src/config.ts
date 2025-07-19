interface Config {
  NASA_API_KEY: string;
}

const getConfig = (): Config => {
  // Verifica se process está disponível
  if (typeof process !== 'undefined' && process.env) {
    return {
      NASA_API_KEY:
        process.env.REACT_APP_NASA_API_KEY ||
        '6tNfMVEstZPgjzn4jpeKNH1S8uXAxDbtURQXThBw',
    };
  }

  // Fallback para ambiente sem process
  return {
    NASA_API_KEY: '6tNfMVEstZPgjzn4jpeKNH1S8uXAxDbtURQXThBw',
  };
};

export const config = getConfig();
