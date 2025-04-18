import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import SearchSelect from "../SearchSelect";
import DatePicker from "../DatePicker";
import PassengerType from "../PassengerType";
import { useState, useEffect } from "react";
import { useCityOriginStore } from '@/stores/useCityOriginStore';
import { useCityDestinityStore } from '@/stores/useCityDestinityStore';
import { useDepartureTravelStore } from '@/stores/useDepartureTravelStore';
import { useTripDetailsStore } from '@/stores/useTripDetailsStore';

import { TripDetail, PassengerCountType } from "../../types/tripDetails";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function TripSelector() {

  const navigate = useNavigate();
  const { citiesOrigin, fetchCitiesOrigin } = useCityOriginStore();
  const { citiesDestinity, fetchCitiesDestinity } = useCityDestinityStore();
  const { tripDetail, setTripDetail } = useTripDetailsStore();
  const { fetchDepartureTravels } = useDepartureTravelStore();
  const [ selectedcityInitID, setSelectedcityInitID] = useState<number | null>(null);
  const [ selectedcityEndID, setSelectedcityEndID] = useState<number | null>(null);
  const [ passengersCount, setPassengersCount] = useState<PassengerCountType[]>([]);
  const [ initValidations, setInitValidations] = useState<Boolean>(false);
  const [date, setDate] = useState<Date | undefined>();

  useEffect(() => {
    if (tripDetail.date) {
      setDate(tripDetail.date);
    }
    if (tripDetail.cityInitID) {
      setSelectedcityInitID(tripDetail.cityInitID);
    }
    if (tripDetail.cityEndID) {
      setSelectedcityEndID(tripDetail.cityEndID);
    }
    if (tripDetail.passengersCount.length > 0) {
      setPassengersCount(tripDetail.passengersCount);
    }
  }, [tripDetail]);

  const handleInputChangeOrigin = (inputValue?: string) => {
    fetchCitiesOrigin(inputValue??"");
  };

  const handleUpdateCitiesDestinity = (cityInitId: number | null) => {
    setSelectedcityInitID(cityInitId);
    if(cityInitId){
      fetchCitiesDestinity(cityInitId, "");
    }
  };

  const handleInputChangeDestinity = (inputValue?: string) => {
    const value = inputValue ?? "";
    if (selectedcityInitID) {
      fetchCitiesDestinity(selectedcityInitID, value);
    }
  };

  const validationSchema = Yup.object().shape({
    totalPassengers: Yup.number()
      .min(1, "Mínimo un pasajero")
      .required("Mínimo un pasajero"),
    cityInitID: Yup.number()
      .required("Debe seleccionar una ciudad de origen"),
    cityEndID: Yup.number()
      .required("Debe seleccionar una ciudad de origen"),
    date: Yup.date()
      .min(new Date(new Date().setHours(0, 0, 0, 0)), "La fecha no puede ser anterior a hoy")
      .required("Debe seleccionar una fecha"),
  
  });

  const calculateTotalPassenger = (passenger: PassengerCountType[]) => {
    const total = passenger.reduce((acc, passenger) => acc + (passenger.total || 0), 0);
    return total;
  };

  const handleSubmit = (values: TripDetail) => {
    const filters = {
      limit: 25,
      page: 1,
      filters: {
        date: values.date?.toISOString().split('T')[0] || '',
        city: [values.cityInitID ?? 0, values.cityEndID ?? 0],
        passengerNumber: values.totalPassengers,
        passengerDisabilityNumber: 0,
        orderTravel: 1060,
        orderMaxMinTravel: 1,
        isPoint: false,
        currencyID: 567,
        externalInitId: 0,
        externalEndId: 0,
        routeID: null,
        _rowId: null
      }
    };
    setTripDetail(values);
    fetchDepartureTravels(filters);
    if (location.pathname !== "/trips") {
      navigate("/trips");
    }
  };

  return (
    <Formik
      initialValues={tripDetail}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="flex flex-col gap-2 rounded-lg md:grid md:grid-cols-6 lg:grid-cols-5">
            <div className="flex-1 p-1 rounded-md border border-gray-300 md:col-span-3 lg:col-span-1">
              <SearchSelect
                id="origin"
                value={selectedcityInitID}
                cities={citiesOrigin}
                onSelected={(cityId) => {
                  setFieldValue("cityInitID", cityId);
                  handleUpdateCitiesDestinity(cityId);
                }}
                onChange={handleInputChangeOrigin}
                dependencyReset={null}
              />
              {initValidations &&
                <ErrorMessage
                  name="cityInitID"
                  component="div"
                  className="text-red-500 text-[10px] pl-3"
                />
              }
            </div>
            <div className="flex-1 p-1 rounded-md border border-gray-300 md:col-span-3 lg:col-span-1">
              <SearchSelect
                id="destinity"
                value={selectedcityEndID}
                cities={citiesDestinity}
                onSelected={(cityId) => setFieldValue("cityEndID", cityId)}
                onChange={handleInputChangeDestinity}
                dependencyReset={selectedcityInitID}
              />
              {initValidations &&
                <ErrorMessage
                  name="cityEndID"
                  component="div"
                  className="text-red-500 text-[10px] pl-3"
                />
              }
            </div>
            <div className="flex-1 p-1 rounded-md border border-gray-300 md:col-span-2 lg:col-span-1">
              <DatePicker 
                value={date} 
                onChange={(date) => {
                  setDate(date);
                  setFieldValue("date", date)}
                } 
              />
              {initValidations &&
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-red-500 text-[10px] pl-3"
                />
              }
            </div>
            <div className="flex-1 p-1 rounded-md border border-gray-300 md:col-span-2 lg:col-span-1">
              <PassengerType
                value={passengersCount}
                onChange={(passengers) => {
                  setFieldValue("totalPassengers", calculateTotalPassenger(passengers));
                  setFieldValue("passengersCount", passengers);
                }}
              />
              {initValidations &&
                <ErrorMessage
                  name="totalPassengers"
                  component="div"
                  className="text-red-500 text-[10px] pl-4"
                />
              }
            </div>
            <div className="flex-1 flex items-center justify-center md:col-span-2 lg:col-span-1">
              <Button type="submit" onClick={()=> {setInitValidations(true)}} className="w-full md:w-[80%]">
                Buscar
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default TripSelector;