import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon} from 'lucide-react';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme = localStorage.getItem('theme') as AvailableThemes || 'dark';

    return storageTheme;
  });

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
};

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    event.preventDefault(); // não segue o link

    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
  }

  /* useEffect(() => {
    console.log('useEffect sem dependências', Date.now());
  }); */
  // executado toda vez que o componente renderiza na tela

  /* useEffect(() => {
    console.log('useEffect com array deps vazio', Date.now());
  }, []); */
  // executa apenas quando o React monta o componente na tela principal pela primeira vez -> util para buscar dados de API

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  // executa apenas quando o valor de theme mudou

  return (
    <nav className={styles.menu}>
      <a className={styles.menuLink} aria-label="Ir para a Home!" title="Ir para a Home!">
        <HouseIcon />
      </a>

      <a className={styles.menuLink} aria-label="Ver Histórico!" title="Ver Histórico!">
        <HistoryIcon />
      </a>

      <a className={styles.menuLink} aria-label="Ir para Configurações!" title="Ir para Configurações!">
        <SettingsIcon />
      </a>

      <a className={styles.menuLink} aria-label="Mudar Tema!" title="Mudar Tema!" onClick={handleThemeChange}>
        {nextThemeIcon[theme]}
      </a>
    </nav>  
  )
}