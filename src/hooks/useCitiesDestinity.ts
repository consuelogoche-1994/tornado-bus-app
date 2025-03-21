import { useContext } from "react";
import { CityDestinityContext } from "../context/CityDestinityContext";

export const useCitiesDestinity = () => {
  const context = useContext(CityDestinityContext);
  if (!context) {
    throw new Error("useCitiesDestinity must be used within a CityDestinityProvider");
  }
  return context;
};