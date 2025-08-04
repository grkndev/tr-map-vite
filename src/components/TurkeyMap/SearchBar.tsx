import React from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Şehir adı yazın...",
  className
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={`${styles.searchContainer} ${className || ''} absolute`}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={styles.searchInput}
          autoComplete="off"
          spellCheck="false"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Temizle"
          >
            ×
          </button>
        )}
      </div>
    
    </div>
  );
};

export default SearchBar;