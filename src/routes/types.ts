// Route configuration interface
export interface AppRoute {
  path: string;
  element?: React.ReactNode;
  children?: AppRoute[];
  protected?: boolean;
  title?: string;
  icon?: string;
}

// Navigation item interface
export interface NavigationItem {
  key: string;
  label: string;
  path: string;
  icon?: string;
  children?: NavigationItem[];
}
