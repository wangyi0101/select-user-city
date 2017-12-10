import React, { Component } from 'react';
import data from '../../data';
import Dropdown from '../dropdown/Dropdown'

class Controller extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cleanData: [],
            selectedCity: '',
            selectedUser: '',
            userList: [],
            cityList: [],
            matchedCityList: [],
            result: ''
        }
        this.handleCityClick = this.handleCityClick.bind(this);
        this.handleUserClick = this.handleUserClick.bind(this);
    }

    componentDidMount() {
        let cleanData = this.cleanData(data);
        let userList = this.buildUserList(cleanData);
        this.setState({
          cleanData: cleanData,
          userList: userList
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

    handleUserClick (event) {
        const selectedUser = event.currentTarget.textContent;
        const data = this.state.cleanData;
        const result = this.buildCityList(selectedUser, data)
        this.setState({
            selectedUser: selectedUser,
            cityList: result.cityList,
            matchedCityList: result.matchedCityList
        })
    }

    buildUserList (data) {
        let users = [];
        for(let i = 0; i < data.length; i++) {
          users.push(data[i].name);
        } 
        return users;
    }

    handleCityClick (event) {
        const selectedCity = event.currentTarget.textContent;
        let matchedCityList = this.state.matchedCityList;
        const result = this.findResult(selectedCity, matchedCityList)
        this.setState({
            selectedCity: selectedCity,
            result: result
        })
        
    } 

    buildCityList (user, data) {
        let result = {
            matchedCityList: [],
            cityList: []
        }

        for (let i = 0; i < data.length; i++) {
            if(data[i].name === user) {
                result.matchedCityList = data[i].cities;
                break;
            }
        }
        if(result.matchedCityList.length > 0) {
            for(let j = 0; j < result.matchedCityList.length; j++) {
                result.cityList.push(result.matchedCityList[j].city);
            }
        }
        return result;
    }

    findResult (selectedCity, matchedCityList) {
        let result = '';

        for(let i = 0; i < matchedCityList.length; i++) {
            if(matchedCityList[i].city === selectedCity) {
                result = matchedCityList[i].result;
            }
        }

        return result;
    }

    render() {
        return (<div> 
            <div>Please select a user
           <Dropdown onClick={this.handleUserClick} list={this.state.userList} />
           </div>
           <div>Please select a city
           <Dropdown onClick={this.handleCityClick} list={this.state.cityList} />
           </div>
           <div>{this.state.result}</div>
        </div>
        )
    }
    
}

export default Controller