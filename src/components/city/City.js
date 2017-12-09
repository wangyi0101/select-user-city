import React, { Component } from 'react';
import Result from '../result/Result'

class City extends Component {
    constructor(props) {
       super(props) 
       this.state = {
           selectedCity: ''
       }
       this.onClick = this.onClick.bind(this);
    }

    filterData () {
      let data = this.props.data;
      let user = this.props.user;
      let filterResult = {
          cities: [],
          filteredCity: []
      };
      
      for(let i = 0; i < data.length; i++) {
          if(data[i].name === user) {
              filterResult.cities = data[i].cities;
              break;
          }
      }
      if(filterResult.cities.length > 0) {
          for(let j = 0; j < filterResult.cities.length; j++) {
            filterResult.filteredCity.push(filterResult.cities[j].city);
          }
      }

      return filterResult;
    }

    buildCityList () {
        let tempResult = this.filterData();
        let cities = tempResult.filteredCity;
        if(cities.length > 0) {
            return cities.map((item, index) => {
                return <p key={index}><a onClick={this.onClick}>{item}</a></p>
            })
        } else {
            return <div></div>
        }
    }

    onClick (event) {
        const selectedCity = event.currentTarget.textContent;
        this.setState({
            selectedCity: selectedCity
        })
    }

    render() {   
      const options = this.buildCityList();
      const cities = this.filterData().cities;
      return (
          <div>
            <div>Please select a City
                {options}
            </div>
            <div>
                <Result city={this.state.selectedCity} data={cities}/>
            </div>
          </div>
      );
    }
}

export default City;
