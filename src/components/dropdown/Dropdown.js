import React  from 'react';

function Dropdown (props) {
    let {list, onClick} = props;
    return list.map((item, index) => {
        return <p key={index}><a onClick={onClick}>{item}</a></p>
    })
}

export default Dropdown