import React, { Component } from 'react';
import './User.css';
import data from '../../data';
import City from '../city/City';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: '',
      cleanData: []
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    let cleanData = this.cleanData(data);
    this.setState({
      cleanData: cleanData
    })
  }

  cleanData(data) {
    let newData = [];
    let visited = new Map();
  
    for (let i = 0; i < data.length; i++) {
      const city = data[i].city;
      const cityInfo = data[i];
      const namesInCity = cityInfo.names;
      for (let j = 0; j < namesInCity.length; j++) {
        const namePair = namesInCity[j];
        const name = namePair.name;
        const result = namePair.result;
        let cityObj = {};
        if(!visited.has(name)) {
          let nameObj = {};
          newData.push(nameObj);
          nameObj.name = name;
          nameObj.cities = [];
          nameObj.cities.push(cityObj);
          cityObj.city = city;
          cityObj.result = result;
          visited.set(name, 0);
        } else {
          for(let l = 0; l < newData.length; l++) {
            if(newData[l].name === name) {
              newData[l].cities.push(cityObj);
              cityObj.city = city;
              cityObj.result = result;
            }
          }
        }
      }
    }
    return newData;
  }

  buildUserList() {
    let data = this.state.cleanData;
    let users = [];
    for(let i = 0; i < data.length; i++) {
      users.push(data[i].name);
    }
    return users.map((item, index)=>{
      return <p key={index} className="item"><a onClick={this.onClick}>{item}</a></p>
    })
  }

  onClick(event) {
     const selectedUser = event.currentTarget.textContent;
     this.setState({
      selectedUser: selectedUser
    })
  }


  render() {
    const options = this.buildUserList();
    return (
      <div>
        <div className="container">Please Select a user
          {options}
        </div>
        <City user={this.state.selectedUser} data={this.state.cleanData}/>
      </div>
    );
  }
}

export default App;
