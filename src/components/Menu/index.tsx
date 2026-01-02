import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon} from 'lucide-react';
import styles from './styles.module.css';

export function Menu() {
  return (
    <nav className={styles.menu}>
      <a className={styles.menuLink}>
        <HouseIcon />
      </a>

      <a className={styles.menuLink}>
        <HistoryIcon />
      </a>
      
      <a className={styles.menuLink}>
        <SettingsIcon />
      </a>
      
      <a className={styles.menuLink}>
        <SunIcon />
      </a>
    </nav>  
  )
}