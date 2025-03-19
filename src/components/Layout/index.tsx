import { PropsWithChildren } from "react";
import NavBar from "../Navbar";

interface LayoutProps {
  showBanner?: boolean; // Definimos `showBanner` como opcional
}

const Layout = ({ children, showBanner = false }: PropsWithChildren<LayoutProps>) => {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main className="bg-neutral min-h-[100vh]">
        {/* Condicional para mostrar el banner si showBanner es true */}
        {showBanner && 
          <div className="bg-gradient-to-b from-primary to-accent w-full h-120">
            <div className="w-[95%] md:w-[90%] lg:w-[80%] max-w-screen-xl m-auto h-full relative">

              <div className="w-full h-full mt-14 p-4 flex justify-center items-end absolute bottom-[-80px]">
                <div className="w-full bg-white rounded-md shadow-2xl p-5">
                  <h1 className="text-xl font-semibold text-text mb-6">Encuentra tu próxima viaje</h1>
                  <div className="flex flex-col gap-2 rounded-lg md:grid md:grid-cols-6 lg:flex lg:flex-row">
                    <div className="flex-1 p-4 text-center rounded-md border border-gray-300 md:col-span-3">Origen</div>
                    <div className="flex-1 p-4 text-center rounded-md border border-gray-300 md:col-span-3">Destino</div>
                    <div className="flex-1 p-4 text-center rounded-md border border-gray-300 md:col-span-2 lg:col-span-1">Fecha</div>
                    <div className="flex-1 p-4 text-center rounded-md border border-gray-300 md:col-span-2 lg:col-span-2">Pasajeros</div>
                    <div className="flex-1 p-4 text-center rounded-md border border-gray-300 md:col-span-2 lg:col-span-">Botón</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        <div className="pt-[80px]">
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