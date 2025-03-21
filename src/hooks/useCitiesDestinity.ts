import { useContext } from "react";
import { CityDestinityContext } from "../context/CityDestinityContext";

export const useCitiesDestinity = () => {
  const context = useContext(CityDestinityContext);
  if (!context) {
    throw new Error("useCitiesDestinity debe usarse dentro de un CityProvider");
  }
  return context;
};