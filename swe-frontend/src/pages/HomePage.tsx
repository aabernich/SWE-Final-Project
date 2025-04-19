import '../styles/HomePage.css';
import Header from "../components/Header";

// Components
import Catalog from '../components/Catalog';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Header />
      {/* Main Content */}
      <main className="main-content">
        <h2 className="homepage-subtitle">Browse Our Collection of Fabrics</h2>
        <Catalog />
      </main>
    </div>
  );
};

export default HomePage;
