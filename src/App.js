import { useState, useMemo } from 'react';
import './style/App.css';
import './style/themes.css';
import AppRoutes from './routes';
import { ThemeContext, themes } from './context/themes';

function App() {
  const [currentTheme, setTheme] = useState(themes.dark);

  const toggleTheme = () => {
    if (currentTheme === themes.dark) {
      setTheme(themes.light);
      return;
    }
    setTheme(themes.dark);
  };

const value = useMemo(() => ({currentTheme, toggleTheme}), [currentTheme]);

  return (
    <ThemeContext.Provider value={ value }>
      <div className={`wrapper ${currentTheme}`}>
        <AppRoutes />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
