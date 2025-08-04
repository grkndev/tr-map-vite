import React from 'react';
import { Input } from '../ui/input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Şehir adı yazın...",
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Input type="text"
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
      className="bg-zinc-700 border-none focus-visible:ring-0 focus-visible:ring-offset-0 absolute max-w-md top-10"
    />
  );
};

export default SearchBar;