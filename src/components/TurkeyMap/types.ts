export interface CityType {
  id: string;
  plateNumber: number;
  name: string;
  path: string;
  centerX?: number;
  centerY?: number;
  fontSize?: number;
}

export interface CustomStyleType {
  idleColor?: string;
  hoverColor?: string;
  strokeColor?: string;
  strokeWidth?: string;
}

export interface ViewBoxType {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface TooltipStyle {
  left: number;
  top: number;
  visibility: 'visible' | 'hidden';
}

export interface TurkeyMapProps {
  /**
   * SVG viewBox configuration
   */
  viewBox?: ViewBoxType;
  /**
   * Whether the map is visible
   */
  visible?: boolean;
  /**
   * Whether cities should respond to hover events
   */
  hoverable?: boolean;
  /**
   * Custom styling for cities
   */
  customStyle?: CustomStyleType;

  /**
   * Custom city data. If not provided, default Turkey cities will be used
   */
  data?: CityType[];
  /**
   * Search term to highlight matching cities
   */
  searchTerm?: string;
  /**
   * Callback when hovering over a city
   */
  onHover?: (city: CityType | null) => void;
  /**
   * Callback when clicking on a city
   */
  onClick?: (city: CityType) => void;
  /**
   * CSS class name for the container
   */
  className?: string;
  /**
   * Inline styles for the container
   */
  style?: React.CSSProperties;
}

export interface TurkeyMapState {
  hoveredCity: CityType | null;
}