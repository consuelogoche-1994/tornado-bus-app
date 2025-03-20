import { PropsWithChildren } from "react";
import NavBar from "../Navbar";
import TripSelector from "../TripSelector";

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
          <div className="bg-gradient-to-b from-primary to-tertiary w-full h-120 md:h-100">
            <div className="w-[95%] md:w-[90%] lg:w-[80%] max-w-screen-xl m-auto h-full relative">
              <div className="w-full h-full mt-14 p-4 flex justify-center items-end absolute bottom-[-80px]">
                <TripSelector />
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