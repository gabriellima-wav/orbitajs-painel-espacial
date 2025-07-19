import {
  Dashboard,
  Favorite,
  Image,
  Person,
  RocketLaunch,
} from '@mui/icons-material';
import type { JSX } from 'react';

export interface NavItem {
  label: string;
  path: string;
  icon: JSX.Element;
}

export const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
  { label: 'Imagem do Dia', path: '/image-of-day', icon: <Image /> },
  { label: 'Lançamentos', path: '/launches', icon: <RocketLaunch /> },
  { label: 'Favoritos', path: '/favorites', icon: <Favorite /> },
  { label: 'Perfil', path: '/profile', icon: <Person /> },
];
