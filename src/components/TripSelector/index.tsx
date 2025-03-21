import { Button } from "@/components/ui/button";
import CitySelect from "../SearchSelect";
import DatePicker from "../DatePicker";
import PassengerType from "../PassengerType";
import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function TripSelector() {
  const [date, setDate] = useState<Date | undefined>();

  const validationSchema = Yup.object().shape({
    passengers: Yup.number()
      .min(1, "Mínimo un pasajero")
      .required("Mínimo un pasajero"),
  });

  return (
    <Formik
      initialValues={{ passengers: 1 }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Formulario enviado con valores:", values);
      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <div className="flex flex-col gap-2 rounded-lg md:grid md:grid-cols-6 lg:flex lg:flex-row">
            <div className="flex-1 p-1 text-center rounded-md border border-gray-300 md:col-span-3">
              <CitySelect />
            </div>
            <div className="flex-1 p-1 text-center rounded-md border border-gray-300 md:col-span-3">
              <CitySelect />
            </div>
            <div className="flex-1 p-1 text-center rounded-md border border-gray-300 md:col-span-2 lg:col-span-1">
              <DatePicker value={date} onChange={setDate} />
            </div>
            <div className="flex-1 p-1 rounded-md border border-gray-300 md:col-span-2 lg:col-span-1">
              <PassengerType
                value={values.passengers}
                onChange={(total) => setFieldValue("passengers", total)}
              />
              <ErrorMessage
                name="passengers"
                component="div"
                className="text-red-500 text-[10px] pl-4"
              />
            </div>
            <div className="flex-1 flex items-center justify-center md:col-span-2 lg:col-span-1">
              <Button type="submit" className="w-full md:w-[80%]">
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