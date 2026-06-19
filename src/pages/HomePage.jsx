import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div>Home Page</div>
      <Link to="/me">Profile</Link>
    </div>
  );
};

export default HomePage;
