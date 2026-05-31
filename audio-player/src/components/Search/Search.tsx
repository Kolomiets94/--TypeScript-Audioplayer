import React, { useState, useEffect } from 'react';
import styles from './Search.module.scss';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300); // задержка 300 мс

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className={styles.search}>
      <img src="/assets/icons/search.svg" alt="search" className={styles.searchIcon} />
      <input
        type="text"
        placeholder="Что будем искать?"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;