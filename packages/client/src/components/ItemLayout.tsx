import { Link } from 'react-router-dom';

const ItemLayout = ({ heading, loading, error }: { heading?: string, loading?: boolean, error?: boolean}) => {
  return (
    <div className="form-control">
      <h1>
        {heading && heading}
        {loading && 'Loading...'}
        {error && error}
      </h1>
      {!loading && <Link to={"/"} className='btn btn-primary'>Back</Link>}
    </div>
  );
}

export default ItemLayout;