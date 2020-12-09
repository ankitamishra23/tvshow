import React from 'react'
import { Switch, Route } from 'react-router-dom'
import NotFound from '../Components/NotFoundPage'
import Dashboard from '../Components/dashboard/Dashboard';
import MovieDetailPage from '../Components/movieDetailPage/MovieDetailPage'



function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path='/movieDetailPage' component={MovieDetailPage}  />
        <Route path='/*' component={NotFound}  />

      </Switch>
    </React.Fragment>
  );
}

export default App;
