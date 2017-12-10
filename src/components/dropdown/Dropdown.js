import React  from 'react';
import './Dropdown.css';

function Dropdown (props) {
    let {list, onClick} = props;
    return list.map((item, index) => {
        return <p key={index} onClick={onClick}>{item}</p>
    })
}

export default Dropdown