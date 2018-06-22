import React from 'react'
import PropTypes from 'prop-types'
import './totalUsage.scss'
import { Bar } from 'react-chartjs-2'
import lifecycle from 'react-pure-lifecycle';
import axios from 'axios';
import Iframe  from 'react-iframe'
var parseString = require('xml2js').parseString;



const graphData = {
	labels: ["12:00:00 AM", "1:00:00 AM", "2:00:00 AM", "3:00:00 AM", "4:00:00 AM", "5:00:00 AM", "6:00:00 AM", "7:00:00 AM", "8:00:00 AM", "9:00:00 AM", "10:00:00 AM", "11:00:00 AM", "12:00:00 PM", "1:00:00 PM", "2:00:00 PM", "3:00:00 PM", "4:00:00 PM", "5:00:00 PM", "6:00:00 PM", "7:00:00 PM", "8:00:00 PM", "9:00:00 PM", "10:00:00 PM", "11:00:00 PM", "12:00:00 AM"],
	 datasets: [
    {
      label: 'today',
      data: ["91", "83", "83", "84", "85", "90", "104", "120", "125", "137", "143", "149", "147", "145", "141", "134", "128", "120", "112", "106", "0", "0", "0", "0", "0"],
      backgroundColor: '#be2239',
      hoverBackgroundColor: '#be2239',
      stack: 1,
      options: {
	      borderCapStyle: "round"
      }
    },
    {
      label: 'yesterday',
      data: ["91", "83", "83", "84", "85", "90", "164", "150", "115", "117", "133", "119", "147", "45", "141", "134", "128", "120", "112", "106", "0", "0", "50", "0", "0"],
      type: 'line',
      
      
    }
  ],
};

// create your lifecycle methods
const componentWillMount = (props) => {
  console.log('I mounted! Here are my props: ', props);
  //props.getEnergy();
};
 
// make them properties on a standard object
const methods = {
  componentWillMount
};


/*const data = {	
  labels: ['12am', '3am', '3:30am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
  datasets: [
    {
      label: 'Today',
      data: [5922, 1974, 3948, 5922, 7896, 9870, 11844, 11844],
      backgroundColor: '#be2239',
      hoverBackgroundColor: '#be2239',
      stack: 1,
    },
    {
      label: 'Yesterday',
      data: [1974, 5922, 3948, 5922, 7896, 9870, 11844],
      type: 'line'
    }
  ],
}*/

   /*<h4 onClick={() => props.getEnergy()}>Total Usage</h4>*/


export const TotalUsage = (props) => (
  <div className='total-usage container'>
    <div className='row'>
      <div className='col-md-6 col-sm-12'>
      	<Iframe url="/gauge.html"
        width="520px"
        height="520px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
        allowFullScreen/>
		
		<div className='row bottomed'>
			<div className='col-md-6 col-sm-12'>
				<h3>70&deg;</h3>
				<p>Current Temp</p>
			</div>
			<div className='col-md-6 col-sm-12'>
			<h3>44%</h3>
				<p>Current Humidity</p>
			</div>
		</div>
      </div>
      <div className='col-md-6 col-sm-12'>
        <Bar data={ graphData } height={250}/>
      </div>
    </div>
    <div className="row prefoot">
    <div className='col-md-12 col-sm-12'>
		<h4> equivalent energy Units:</h4>
    	<ul className="nav nav-pills">
		  <li className="nav-item">
		    <a className="nav-link " href="#">Co2</a>
		  </li>
		  <li className="nav-item">
		    <a className="nav-link active" href="#">KW</a>
		  </li>
		  <li className="nav-item">
		    <a className="nav-link" href="#">KBTU  </a>
		  </li>
		  <li className="nav-item">
		    <a className="nav-link" href="#">               Oil           </a>
		  </li>
		  
		    <li className="nav-item">
		    <a className="nav-link" href="#">  Trees  </a>
		  </li>        
		  
		
		    <li className="nav-item">
		    <a className="nav-link" href="#">   $    </a>
		  </li>        
            
		  
		  
		    <li className="nav-item">
		    <a className="nav-link" href="#"> Cars  </a>
		  </li>        
     
		</ul>
     </div>
    </div>
    
  </div>
)



TotalUsage.propTypes = {
  getEnergy: PropTypes.func.isRequired,
}


export default lifecycle(methods)(TotalUsage);
