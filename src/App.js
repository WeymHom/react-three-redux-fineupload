import React, { Component } from 'react';
import './App.css';
import Content from "./components/Content/Content";
import Footer from './components/Footer/Footer';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import 'babel-polyfill';
import ThreeModels from "./container/index";
const store = configureStore();
class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <div className="App">
            <Content/>
            <ThreeModels/>
            <Footer/>
          </div>
        </Provider>
    );
  }
}

export default App;
