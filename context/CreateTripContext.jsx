import { createContext, useState } from 'react';

// Create the context
export const CreateTripContext = createContext(null);

// Create the Provider component
export const CreateTripContextProvider = ({ children }) => {
  const [tripData, setTripData] = useState({
    destination: '',
    selectedPlace: null,
    travelerInfo: null,
    travellerCount: '',
    travelerType: '',
    startDate: null,
    endDate: null,
    totalNoOfDays: 0,
    dateRange: null,
    duration: '',
    budget: '',
    budgetInfo: null
  });

  const value = {
    tripData,
    setTripData
  };

  // Debug log to confirm provider is working
  console.log('✅ CreateTripContextProvider is working! Value:', value);

  return (
    <CreateTripContext.Provider value={value}>
      {children}
    </CreateTripContext.Provider>
  );
};
