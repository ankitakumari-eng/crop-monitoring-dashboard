// Mock historical data for charts
export const generateNDVIHistory = (days = 30) => {
  const history = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000);
    history.push({
      date: date.toISOString().split('T')[0],
      value: 0.55 + Math.random() * 0.25,
    });
  }
  return history;
};

export const generateNDWIHistory = (days = 30) => {
  const history = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000);
    history.push({
      date: date.toISOString().split('T')[0],
      value: 0.45 + Math.random() * 0.25,
    });
  }
  return history;
};

export const generateMoistureHistory = (days = 30) => {
  const history = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000);
    history.push({
      date: date.toISOString().split('T')[0],
      value: 30 + Math.random() * 50,
    });
  }
  return history;
};

export const generateTemperatureHistory = (days = 30) => {
  const history = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000);
    history.push({
      date: date.toISOString().split('T')[0],
      value: 20 + Math.random() * 15,
    });
  }
  return history;
};