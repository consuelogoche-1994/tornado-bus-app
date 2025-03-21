import { PassengersProvider } from './PassengersContext';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
      <PassengersProvider>
            {children}
      </PassengersProvider>
  );
};