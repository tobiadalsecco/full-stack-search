import ItemLayout from "../components/ItemLayout";
import {useQuery} from 'react-query';
import { useParams } from 'react-router-dom';
import { API_URL } from "../constants";
import { Country } from "../types";

const CountryPage = () => {
  const { countryId } = useParams();
  const getCountry = async () => {
		const res = await fetch(`${API_URL}/countries/${countryId}`);
		return res.json();
	};
	const {data, error, isLoading} = useQuery('country', getCountry);

  if (error) return <ItemLayout error />;
	if (isLoading) return <ItemLayout loading />;

  return <ItemLayout heading={(data as unknown as Country).country} />;
}

export default CountryPage;