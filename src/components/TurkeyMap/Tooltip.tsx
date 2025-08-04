import React from 'react';
import type { CityType, TooltipStyle } from './types';
import styles from './Tooltip.module.css';

interface TooltipProps {
  city: CityType;
  style: TooltipStyle;
  customText?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ city, style, customText }) => {
  const displayText = customText || `${city.name} (${city.plateNumber})`;

  return (
    <div
      className={styles.tooltip}
      style={{
        left: `${style.left}px`,
        top: `${style.top}px`,
        visibility: style.visibility
      }}
    >
      {displayText}
    </div>
  );
};

export default Tooltip;