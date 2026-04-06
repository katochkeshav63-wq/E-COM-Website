import { createContext, useReducer } from "react";

const DataContext = createContext();

const initialState = {
  totalProducts: 0,
  totalOrders: 0,
  totalUsers: 0,
  totalRevenue: 0,
  monthlyRevenue: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING_START":
      return { ...state, loading: true };
    case "GET_ALL_STATS":
      return {
        ...state,
        totalOrders: action.payload.totalOrders,
        totalProducts: action.payload.totalProducts,
        totalUsers: action.payload.totalUsers,
        totalRevenue: action.payload.totalRevenue,
        monthlyRevenue: action.payload.monthlyRevenue || [],
        loading: false,
        lastUpdated: new Date(),
      };

    case "ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      throw new Error("Action unknown", 404);
  }
}

function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    totalOrders,
    totalProducts,
    totalUsers,
    totalRevenue,
    monthlyRevenue,
    loading,
    error,
    lastUpdated,
   
  } = state;

  
  return (
    <DataContext.Provider
      value={{
        totalOrders,
        totalProducts,
        totalUsers,
        totalRevenue,
        monthlyRevenue,
        loading,
        error,
        lastUpdated,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export { DataProvider, DataContext };
