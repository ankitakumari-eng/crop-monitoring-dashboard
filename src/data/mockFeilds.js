const mockFields = [
  {
    id: 1,
    name: 'Paddy Field A',
    location: 'Block 1, Odisha',
    crop: 'Rice',
    area: 4.5,
    status: 'healthy',
  },
  {
    id: 2,
    name: 'Wheat Field B',
    location: 'Block 2, Odisha',
    crop: 'Wheat',
    area: 3.2,
    status: 'warning',
  },
  {
    id: 3,
    name: 'Maize Field C',
    location: 'Block 3, Odisha',
    crop: 'Maize',
    area: 5.0,
    status: 'healthy',
  },
]

const mockAlerts = [
  { id: 1, fieldId: 1, message: 'Moisture stress detected', severity: 'warning' },
  { id: 2, fieldId: 2, message: 'Irrigation needed', severity: 'critical' },
  { id: 3, fieldId: 3, message: 'Normal conditions', severity: 'info' },
]

export { mockFields, mockAlerts }