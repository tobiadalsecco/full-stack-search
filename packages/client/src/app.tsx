import { Routes, Route, BrowserRouter } from 'react-router-dom';
import {QueryClient, QueryClientProvider } from 'react-query';
import HotelPage from './pages/HotelPage';
import CountryPage from './pages/CountryPage';
import CityPage from './pages/CityPage';
import Search from './pages/Search';
import Layout from './components/Layout';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Search />} />
            <Route path="hotels/:hotelId" element={<HotelPage />} />
            <Route path="countries/:countryId" element={<CountryPage />} />
            <Route path="cities/:cityId" element={<CityPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
