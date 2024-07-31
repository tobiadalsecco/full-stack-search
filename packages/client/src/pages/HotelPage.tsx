import ItemLayout from "../components/ItemLayout";
import {useQuery} from 'react-query';
import { useParams } from 'react-router-dom';
import { API_URL } from "../constants";
import { Hotel } from "../types";

const HotelPage = () => {
  const { hotelId } = useParams();
  const getHotel = async () => {
		const res = await fetch(`${API_URL}/hotels/${hotelId}`);
		return res.json();
	};
	const {data, error, isLoading} = useQuery('hotel', getHotel);

  if (error) return <ItemLayout error />;
	if (isLoading) return <ItemLayout loading />;

  return <ItemLayout heading={(data as unknown as Hotel).hotel_name} />;
}

export default HotelPage;