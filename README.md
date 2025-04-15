# 🚍 Tornado Bus App

## 📖 Acerca de

Tornado Bus App es una aplicación para reservar viajes que ayuda a los usuarios a planificar sus viajes seleccionando ciudades, pasajeros y rutas disponibles. La aplicación ofrece características como la selección de asientos, validación de formularios y una simulación de confirmación de reserva.

## 🔧 Tecnologías Utilizadas

Esta aplicación fue construida utilizando las siguientes tecnologías:

- **React**: Una librería de JavaScript para construir interfaces de usuario. Permite crear componentes reutilizables, lo que hace que la aplicación sea flexible y fácil de mantener.
- **TypeScript**: Un superset de JavaScript que proporciona tipos estáticos. TypeScript ayuda a reducir errores durante el desarrollo, haciendo el código más confiable y fácil de refactorizar.
- **Vite**: Una herramienta de desarrollo rápida que ofrece una recarga en caliente (HMR) rápida. Es liviana y hace que la experiencia de desarrollo sea más rápida y fluida.
- **Tailwind CSS**: Un framework CSS de utilidad que permite construir diseños personalizados directamente en el HTML mediante la aplicación de clases. Acelera el proceso de diseño sin tener que escribir CSS personalizado.
- **Shadcn UI**: Un conjunto de componentes de interfaz de usuario altamente accesibles y personalizables. Se utiliza para crear elementos modernos y accesibles en la aplicación.
- **Axios**: Una librería para realizar peticiones HTTP. Se utiliza para comunicar la aplicación con la API y obtener o enviar datos de forma eficiente.
- **Zustand**: Una librería ligera para manejar estado global en React de forma más sencilla y eficiente que Context API. La usamos para controlar datos como los asientos seleccionados y la sesión de boletos desde cualquier componente, sin necesidad de proveedores (Provider) o árboles anidados..
- **React Hooks**: Funciones como `useState` y `useEffect` se usan para manejar el estado y los efectos secundarios en los componentes funcionales, haciendo el código más legible y mantenible.

## ✨ Características

1. **Selección de Ciudades**:
   - Elige una **ciudad inicial** y una **ciudad de destino** (por ejemplo: Dallas → Laredo).

2. **Selección de Pasajeros**:
   - Selecciona **uno o más pasajeros**, cada uno con una categoría diferente.

3. **Selección de Fecha de Viaje**:
   - Elige una **fecha de viaje**, con validación para asegurar que no sea una fecha pasada.

4. **Validación de Formulario**:
   - Asegúrate de que se haya seleccionado una **ciudad de salida**, **ciudad de destino**, **fecha de viaje** y al menos **un pasajero**.

5. **Viajes Disponibles**:
   - Visualiza los viajes disponibles según la **fecha seleccionada** y la **cantidad de pasajeros**.

6. **Selección de Viaje**:
   - Selecciona un viaje y visualiza el **precio por pasajero**.

7. **Distribución del Autobús**:
   - Visualiza la distribución del **autobús** para el viaje seleccionado.

8. **Selección de Asientos**:
   - **Marca los asientos** para el viaje. Cada pasajero puede seleccionar **un solo asiento**.

9. **Confirmación de Reserva**:
   - Simula el proceso de reserva con una **ventana emergente** o **alerta** de confirmación.

Puedes probar la aplicación en [https://tornado-bus-company.netlify.app](https://tornado-bus-company.netlify.app/).

## 🚀 Instalación y Ejecución

- Clonar Repositorio

**Instala las dependencias:**
- npm install

**Ejecuta la aplicación**
- npm run dev