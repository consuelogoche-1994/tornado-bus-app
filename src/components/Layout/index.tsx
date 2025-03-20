import { PropsWithChildren } from "react";
import NavBar from "../Navbar";
import TripSelector from "../TripSelector";

interface LayoutProps {
  showBanner?: boolean; // Definimos `showBanner` como opcional
  showTripSelector?: boolean;
}

const Layout = ({ children, showBanner = false, showTripSelector = false}: PropsWithChildren<LayoutProps>) => {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main className="bg-neutral min-h-[100vh]">
        {/* Condicional para mostrar el banner si showBanner es true */}
        {showBanner && 
          <div className="bg-gradient-to-b from-primary to-tertiary w-full h-120 md:h-100">
            <div className="w-[95%] md:w-[90%] lg:w-[80%] max-w-screen-xl m-auto h-full relative">
              <div className="w-full h-full mt-14 flex justify-center items-end absolute bottom-[-80px]">
                <div className="w-full bg-white rounded-md shadow-md p-5">
                  <h1 className="text-xl font-semibold text-text mb-6">Encuentra tu próxima viaje</h1>
                  <TripSelector />
                  </div>
                </div>
            </div>
          </div>
        }
      {/* Condicional para mostrar barra de seleccion de viajes */}
        {showTripSelector && 
            <div className="max-w-screen-xl m-auto pt-16">
              <div className="w-full bg-white rounded-md shadow-md p-5">
                <TripSelector />
              </div>
            </div>
        }

        <div className={`w-[95%] md:w-[90%] lg:w-[80%] max-w-screen-xl m-auto h-full ${showBanner ? "pt-[80px]" : ""}`}>
          {/* Aquí va el contenido dinámico (children) */}
          {children}
        </div>
      </main>
      <footer>

      </footer>
    </div>
    

  );
}

export default Layout;