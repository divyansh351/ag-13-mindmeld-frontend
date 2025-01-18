import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Skills from './pages/Skills';

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/profile" component={Profile} />
          <Route path="/skills" component={Skills} />
        </Switch>
      </MainLayout>
    </Router>
  );
};

export default App;