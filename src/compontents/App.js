import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink} from "react-router-dom"

import logo from "../assets/imgs/logo.png";
import '../assets/stylus/reset.styl'
import './App.styl';

import Recommend from "./recommend/Recommend";
import Ranking from "./ranking/Ranking";
import Search from "./search/Search";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <header className="app-header">
            <img src={logo} className="app-logo" alt="logo" />
            <h1 className="app-title">Mango Music</h1>
          </header>
        <div className="music-tab">
          <div className="tab-item selected">
              <NavLink to="/recommend" className="nav-link">
                <span>推荐</span>
              </NavLink>
          </div>
          <div className="tab-item">
              <NavLink to="/ranking" className="nav-link">
                <span>排行榜</span>
              </NavLink>
          </div>
          <div className="tab-item">
              <NavLink to="/search" className="nav-link">
                <span>搜索</span>
              </NavLink>
          </div>
        </div>
          <Switch>
            <Route path="/recommend" component={Recommend} />
            <Route path="/ranking" component={Ranking} />
            <Route path="/search" component={Search} />
            <Redirect from="/" to="/recommend" />
            <Route component={Recommend} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
