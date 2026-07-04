/**
 * Navigation type definitions for sidebar and menus.
 */

export interface SidebarItem {
  id: string;
  label: string;
  subtitle?: string;
  href: string;
  iconKey: string;
  badge?: string;
  disabled?: boolean;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
