import { useContext } from "react";
import { CityOriginContext } from "../context/CityOriginContext";

export const useCitiesOrigin = () => {
  const context = useContext(CityOriginContext);
  if (!context) {
    throw new Error("useCitiesOrigin must be used within a CityOriginProvider");
  }
  return context;
};