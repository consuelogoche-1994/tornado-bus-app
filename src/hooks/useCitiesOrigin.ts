import { useContext } from "react";
import { CityOriginContext } from "../context/CityOriginContext";

export const useCitiesOrigin = () => {
  const context = useContext(CityOriginContext);
  if (!context) {
    throw new Error("useCitiesOrigin debe usarse dentro de un CityProvider");
  }
  return context;
};