import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;