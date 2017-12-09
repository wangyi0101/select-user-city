import React, { Component } from 'react';

class Result extends Component {
    constructor(props) {
        super(props)
    }

    filderData () {
        let cities = this.props.data;
        let selectedCity = this.props.city;
        console.log(cities);
        console.log(selectedCity);
        let result = '';
        for( let i = 0; i < cities.length; i++) {
            if(cities[i].city === selectedCity) {
                result = cities[i].result;
            }
        }
        return result;
    }

    render() {
        const result = this.filderData();
        console.log(result);
        return <div>{result}</div>
    }
}

export default Result