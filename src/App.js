import { Grid } from '@mui/material';
import './App.css';
import AddProduct from './components/AddProduct';
import Product from './components/Product';


function App() {
  return (
    <div className="App">
      <Grid container>
        <Grid item xs={3} p={2}>
        <AddProduct/>

        </Grid>
        <Grid item xs={9} p={2}>
          <Product/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
