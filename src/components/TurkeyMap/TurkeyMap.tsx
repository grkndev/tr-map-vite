import React, { useState, useCallback, useMemo } from 'react';
import type { TurkeyMapProps, CityType } from './types';
import { cities as defaultCities, DEFAULT_VIEW_BOX, DEFAULT_CUSTOM_STYLE } from './data';
import { cityMatchesSearch } from './searchUtils';
import styles from './TurkeyMap.module.css';

const   TurkeyMap: React.FC<TurkeyMapProps> = ({
  viewBox = DEFAULT_VIEW_BOX,
  visible = true,
  hoverable = true,
  customStyle = DEFAULT_CUSTOM_STYLE,
  data = defaultCities,
  searchTerm = '',
  onHover,
  onClick,
  className,
  style
}) => {
  const [hoveredCityId, setHoveredCityId] = useState<string | null>(null);

  const mergedStyle = useMemo(() => ({
    ...DEFAULT_CUSTOM_STYLE,
    ...customStyle
  }), [customStyle]);



  const handleMouseEnter = useCallback((city: CityType) => {
    if (!hoverable) return;
    setHoveredCityId(city.id);
    onHover?.(city);
  }, [hoverable, onHover]);

  const handleMouseLeave = useCallback(() => {
    if (!hoverable) return;
    setHoveredCityId(null);
    onHover?.(null);
  }, [hoverable, onHover]);

  const handleClick = useCallback((city: CityType) => {
    onClick?.(city);
  }, [onClick]);

  const renderCity = useCallback((city: CityType) => {
    const isHovered = hoveredCityId === city.id;
    const isSearchMatch = searchTerm ? cityMatchesSearch(city, searchTerm) : false;
    const hasSearchTerm = searchTerm.trim() !== '';
    
    // Highlighting logic:
    // 1. If hovering, show hover effect
    // 2. If searching and matches, show search highlight  
    // 3. If searching but doesn't match, dim the city
    const isHighlighted = isHovered || isSearchMatch;
    const shouldDim = (hoveredCityId !== null && !isHovered) || (hasSearchTerm && !isSearchMatch);
    
    return (
      <g
        key={city.id}
        className={`${styles.cityGroup} ${shouldDim ? styles.dimmed : ''} ${isHighlighted ? styles.highlighted : ''} ${isSearchMatch ? styles.searchHighlighted : ''}`}
        onMouseEnter={() => handleMouseEnter(city)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(city)}
        style={{ cursor: hoverable ? 'pointer' : 'default' }}
      >
        <path
          d={city.path}
          data-city-id={city.id}
          fill={isHighlighted ? mergedStyle.hoverColor : mergedStyle.idleColor}
          stroke={mergedStyle.strokeColor}
          strokeWidth={mergedStyle.strokeWidth}
          className={styles.cityPath}
        />
        {city.centerX && city.centerY && (
          <text
            x={city.centerX}
            y={city.centerY}
            className={styles.cityLabel}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={city.fontSize || 10}
            fill="#333"
            fontWeight="600"
            pointerEvents="none"
          >
            {city.name}
          </text>
        )}
      </g>
    );
  }, [hoveredCityId, mergedStyle, hoverable, handleMouseEnter, handleMouseLeave, handleClick]);

  const cities = useMemo(() => data.map(renderCity), [data, renderCity]);

  if (!visible) return null;

  return (
    <div className={`${styles.turkeyMapContainer} ${className || ''}`} style={style}>
      <svg
        viewBox={`${viewBox.left} ${viewBox.top} ${viewBox.width} ${viewBox.height}`}
        className={styles.turkeyMapSvg}
      >
        <g className={styles.citiesGroup}>
          {cities}
        </g>
      </svg>
    </div>
  );
};

export default TurkeyMap;