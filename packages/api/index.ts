import express, { Request } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { MongoClient, ObjectId } from "mongodb";

dotenv.config();

if (process.env.NODE_ENV !== 'production' && !process.env.DATABASE_URL) {
  await import('./db/startAndSeedMemoryDB');
}

const PORT = process.env.PORT || 3001;
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();

app.use(cors())
app.use(express.json());

const mongoClient = new MongoClient(DATABASE_URL);
console.log('Connecting to MongoDB...');
try {
  await mongoClient.connect();
  console.log('Successfully connected to MongoDB!');
} catch(e) {
  console.error(e);
}
const db = mongoClient.db();

const searchHotels = async (q: string) => {
  const hotelsCollection = db.collection('hotels');
  return hotelsCollection
    .find({
      $or: [
        { 
          hotel_name: { 
            $regex: q,
            $options: "i"
          } 
        },
        { 
          country: { 
            $regex: q,
            $options: "i"
          } 
        }
      ]
    })
    .project({
      hotel_name: 1,
    })
    .toArray();
}

const searchCountries = async (q: string) => {
  const countriesCollection = db.collection('countries');
  return countriesCollection
    .find({ 
      country: { 
        $regex: q,
        $options: "i"
      } 
    })
    .project({
      country: 1,
    })
    .toArray();
}

const searchCities = async (q: string) => {
  const citiesCollection = db.collection('cities');
  return citiesCollection
    .find({ 
      name: { 
        $regex: q,
        $options: "i"
      } 
    })
    .toArray();
}

app.get('/search', async (req, res) => {
  const q = req.query.q as string;
  const [hotels, countries, cities] = await Promise.all([
    searchHotels(q),
    searchCountries(q),
    searchCities(q)
  ]);
  res.send({
    hotels,
    countries,
    cities,
  });
});

type HotelReqParams = { 
  hotelId: string
};
app.get('/hotels/:hotelId', async (req: Request<HotelReqParams>, res) => {
  const hotel = await db
    .collection('hotels')
    .findOne(
      {_id: new ObjectId(req.params.hotelId)}, 
      { projection: { hotel_name: 1 }}
    );
  res.send(hotel);
});

type CountryReqParams = { 
  countryId: string
};
app.get('/countries/:countryId', async (req: Request<CountryReqParams>, res) => {
  const hotel = await db
    .collection('countries')
    .findOne(
      {_id: new ObjectId(req.params.countryId)}, 
      { projection: { country: 1 }}
    );
  res.send(hotel);
});

type CityReqParams = { 
  cityId: string
};
app.get('/cities/:cityId', async (req: Request<CityReqParams>, res) => {
  const hotel = await db
    .collection('cities')
    .findOne(
      {_id: new ObjectId(req.params.cityId)}, 
      { projection: { name: 1 }}
    );
  res.send(hotel);
});

app.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`)
});