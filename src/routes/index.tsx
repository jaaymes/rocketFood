import { Route, BrowserRouter } from 'react-router-dom';

import {Dashboard} from '../pages/Dashboard';

const Routes = () => (
  <BrowserRouter>
    <Route path="/" exact component={Dashboard} />
  </BrowserRouter>
);

export default Routes;
