import { useContext } from "react";
import { CityOriginContext } from "../context/CityOriginContext";

export const useCities = () => {
  const context = useContext(CityOriginContext);
  if (!context) {
    throw new Error("useCities debe usarse dentro de un CityProvider");
  }
  return context;
};