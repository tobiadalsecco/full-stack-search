import ItemLayout from "../components/ItemLayout";
import {useQuery} from 'react-query';
import { useParams } from 'react-router-dom';
import { API_URL } from "../constants";
import { City } from "../types";

const CityPage = () => {
  const { cityId } = useParams();
  const getCity = async () => {
		const res = await fetch(`${API_URL}/cities/${cityId}`);
		return res.json();
	};
	const {data, error, isLoading} = useQuery('city', getCity);

  if (error) return <ItemLayout error />;
	if (isLoading) return <ItemLayout loading />;

  return <ItemLayout heading={(data as unknown as City).name} />;
}

export default CityPage;