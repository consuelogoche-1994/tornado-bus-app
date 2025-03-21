import { Button } from "@/components/ui/button";
import SearchSelect from "../SearchSelect";
import DatePicker from "../DatePicker";
import PassengerType from "../PassengerType";
import { useState } from "react";
import { useCitiesOrigin } from "../../hooks/useCitiesOrigin";
import { useCitiesDestinity } from "../../hooks/useCitiesDestinity";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function TripSelector() {

  const { citiesOrigin, fetchCitiesOrigin } = useCitiesOrigin();
  const { citiesDestinity, fetchCitiesDestinity } = useCitiesDestinity();
  const [ selectedCityOrigin, setSelectedCityOrigin] = useState<number | null>(null);
  const [ initValidations, setInitValidations] = useState<Boolean>(false);
  
  const handleInputChangeOrigin = (inputValue?: string) => {
    fetchCitiesOrigin(inputValue??"");
  };

  const handleUpdateCitiesDestinity = (cityInitId: number | null) => {
    setSelectedCityOrigin(cityInitId);
    if(cityInitId){
      fetchCitiesDestinity(cityInitId, "");
    }
  };

  const handleInputChangeDestinity = (inputValue?: string) => {
    const value = inputValue ?? "";
    if (selectedCityOrigin) {
      fetchCitiesDestinity(selectedCityOrigin, value);
    }
  };

  const [date, setDate] = useState<Date | undefined>();

  console.log(date);

  const validationSchema = Yup.object().shape({
    passengers: Yup.number()
      .min(1, "Mínimo un pasajero")
      .required("Mínimo un pasajero"),
    cityOrigin: Yup.number()
      .required("Debe seleccionar una ciudad de origen"),
    cityDestinity: Yup.number()
      .required("Debe seleccionar una ciudad de origen"),
    tripDate: Yup.date()
      .min(new Date(), "La fecha no puede ser anterior a hoy")
      .required("Debe seleccionar una fecha"),
  
  });

  return (
    <Formik
      initialValues={{ passengers: 1 , cityOrigin: null, cityDestinity: null, tripDate: null}}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Formulario enviado con valores:", values);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <div className="flex flex-col gap-2 rounded-lg md:grid md:grid-cols-6 lg:grid-cols-5">
            <div className="flex-1 p-1 rounded-md border border-gray-300 md:col-span-3 lg:col-span-1">
              <SearchSelect
                id="origin"
                cities={citiesOrigin}
                onSelected={(cityId) => {
                  setFieldValue("cityOrigin", cityId);
                  handleUpdateCitiesDestinity(cityId); // Actualiza el estado de origen
                }}
                onChange={handleInputChangeOrigin}
                dependencyReset={null}
              />
              {initValidations &&
                <ErrorMessage
                  name="cityOrigin"
                  component="div"
                  className="text-red-500 text-[10px] pl-3"
                />
              }
            </div>
            <div className="flex-1 p-1 rounded-md border border-gray-300 md:col-span-3 lg:col-span-1">
              <SearchSelect
                id="destinity"
                cities={citiesDestinity}
                onSelected={(cityId) => setFieldValue("cityDestinity", cityId)}
                onChange={handleInputChangeDestinity}
                dependencyReset={selectedCityOrigin}
              />
              {initValidations &&
                <ErrorMessage
                  name="cityDestinity"
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
                  setFieldValue("tripDate", date)}
                } 
              />
              {initValidations &&
                <ErrorMessage
                  name="tripDate"
                  component="div"
                  className="text-red-500 text-[10px] pl-3"
                />
              }
            </div>
            <div className="flex-1 p-1 rounded-md border border-gray-300 md:col-span-2 lg:col-span-1">
              <PassengerType
                value={values.passengers}
                onChange={(total) => setFieldValue("passengers", total)}
              />
              {initValidations &&
                <ErrorMessage
                  name="passengers"
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