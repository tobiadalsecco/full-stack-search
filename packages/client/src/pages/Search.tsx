import { useState, type ChangeEvent, useRef, useEffect, useCallback } from 'react';
import { useDebounce } from "use-debounce";
import { City, Country, Hotel, SearchResponse } from '../types';
import { API_URL } from '../constants';
import { Link } from 'react-router-dom';

const searchRequest = async (value: string): Promise<SearchResponse> => {
  const searchData = await fetch(`${API_URL}/search?q=${value}`);
  const searchResults = (await searchData.json()) as SearchResponse;
  return searchResults;
}

const Search = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);

  const inputRef = useRef<HTMLInputElement>(null);

  const clearForm = () => {
    setHotels([]);
    setCountries([]);
    setCities([]);
    setShowClearBtn(false);
  }

  const fetchData = useCallback(async () => {
    const results = await searchRequest(debouncedSearch);
    setShowClearBtn(true);
    setHotels(results.hotels);
    setCountries(results.countries);
    setCities(results.cities);
  }, [debouncedSearch]);

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClickClear = () => {
    clearForm();
    if(inputRef.current) {
      setSearch('');
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (search === '') {
      clearForm();
      return;
    }
  }, [search]);

  useEffect(() => {
    if (debouncedSearch === '') {
      return;
    }
    fetchData();
  }, [debouncedSearch, fetchData]);

  return (
    <div className="dropdown">
      <div className="form">
        <i className="fa fa-search"></i>
        <input
          type="text"
          className="form-control form-input"
          placeholder="Search accommodation..."
          onChange={handleChangeSearch}
          ref={inputRef}
          value={search}
        />
        {showClearBtn && (
          <span className="left-pan cu">
            <i className="fa fa-close" onClick={handleClickClear}></i>
          </span>
        )}
      </div>
      {!!hotels.length && (
        <div className="search-dropdown-menu dropdown-menu w-100 show p-2">

          <h2>Hotels</h2>
          {hotels.length ? hotels.map((hotel, index) => (
            <li key={index}>
              <Link to={`/hotels/${hotel._id}`} className="dropdown-item">
                <i className="fa fa-building mr-2"></i>
                {hotel.hotel_name}
              </Link>
              <hr className="divider" />
            </li>
          )) : <p>No hotels matched</p>}

          <h2>Countries</h2>
          {countries.length ? countries.map((country, index) => (
            <li key={index}>
              <Link to={`/countries/${country._id}`} className="dropdown-item">
                <i className="fa fa-map-pin mr-2"></i>
                {country.country}
              </Link>
              <hr className="divider" />
            </li>
          )) : <p>No countries matched</p>}
          
          <h2>Cities</h2>
          {cities.length ? cities.map((city, index) => (
            <li key={index}>
              <Link to={`/cities/${city._id}`} className="dropdown-item">
                <i className="fa fa-map-marker mr-2"></i>
                {city.name}
              </Link>
              <hr className="divider" />
            </li>
          )) : <p>No cities matched</p>}
        </div>
      )}
    </div>
  );
}

export default Search;