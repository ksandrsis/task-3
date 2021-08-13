import React, { createContext } from "react";
import useDataProvider from "../../hooks/useDataProvider";
import { IDataContext } from "./types";

export const DataContext = createContext<IDataContext | null>(null);

const DataProvider: React.FC = ({ children }) => {
  const value = useDataProvider();

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
export default DataProvider;
