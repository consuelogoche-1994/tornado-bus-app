import { Bars3Icon, UserIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
  const activeStyle = 'underline underline-offset-4'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  // Toggle mobile menu visibility
  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="fixed top-0 z-1 w-full shadow-md text-primary font-light">
      <div className="flex justify-between items-center py-3 px-3 lg:px-8 gap-3 bg-white">
        {/* Button for mobile menu */}
        <button
          className="lg:hidden text-primar focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
        
        {/* Logo */}
        <div className="text-xl font-semibold whitespace-nowrap">
          <NavLink to="/">
          <img className='h-6' src="/logo.svg" alt="Logo"  />
        
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="w-full lg:gap-6">
          <ul className="flex items-center justify-end gap-3">
            <li className='hidden lg:block'>
              <NavLink to="/trip-offers" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
                Promociones
              </NavLink>
            </li>
            <li className='hidden lg:block'>
              <NavLink to="/my-trips" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
                Mis viajes
              </NavLink>
            </li>
            <li className='hidden lg:block'>
              <NavLink to="/help" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
                Help
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-account" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
                <div className="flex gap-1 p-1 rounded-md hover:bg-tertiary/30">
                  <UserIcon className="h-6 w-6 text-base text-primary" />
                  <span>Iniciar sesión</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="flex flex-col lg:hidden bg-white border-t-1 border-neutral">
          <li className='hover:bg-neutral p-4'>
            <NavLink
              to="/trip-offers"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={toggleMobileMenu}
            >
              Promociones
            </NavLink>
          </li>
          <li className='hover:bg-neutral p-4'>
            <NavLink
              to="/my-trips"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={toggleMobileMenu}
            >
              Mis viajes
            </NavLink>
          </li>
          <li className='hover:bg-neutral p-4'>
            <NavLink
              to="/help"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={toggleMobileMenu}
            >
              Ayuda
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Navbar