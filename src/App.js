import {Fragment} from 'react'
import Navbar from './components/Navbar/Navbar';
import Info from './components/Info/Info';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Fragment>
      <Navbar />
      <Info />
      <Footer />
    </Fragment>
  );
}

export default App;
