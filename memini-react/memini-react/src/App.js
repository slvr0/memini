import React, { Component, useEffect } from "react";

import logo from './logo.svg';
import './App.css';

class App extends Component{
    constructor(props){
        super(props);  
        
        this.API_URL = "http://localhost:5000/";
        this.state = {
          note: []
        };      
    }
    
  fetchData = async () => {
    fetch(this.API_URL + "api/Calendar/GetCalendar")
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json(); 
    })
    .then(data => {
      this.setState({note:data});
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }
  componentDidMount() {
 
    this.fetchData();
  }

  render() { 
      
        const note = this.state.note;

        return (
          <>
          {JSON.stringify(note)}
          </>

        );
    }
  }

export default App;








