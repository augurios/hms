// https://internal.facilities.med.harvard.edu/XML/energy.asp?BuildingLetter=A&Range=W&Start=05/20/2017
import axios from 'axios'
//import parser from 'xml2json'
var parseString = require('xml2js').parseString;
// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
export const FETCH_ENERGY = 'FETCH_ENERGY'

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
  return {
    type    : COUNTER_INCREMENT,
    payload : value
  }
}

export const getEnergy = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      axios.get('/energy-day.xml', {
		    params: {
		      BuildingLetter: 'A',
		      Range: 'W',
		      Start: '05/20/2017'
		    }
		  })
		  .then(function (response) {
			  
			  //console.log('response', response)
			  parseString(response.data, function (err, result) {
				 console.log('parsed response', result)
				var dayResult = {
						labels: [],
						data: []
					}
				
				 
				for (var i = 0; i < result.Energy.HistoricalEnergy["0"].data["0"].elec["0"].value.length; i++) { 
					if(i === 0 || i === result.Energy.HistoricalEnergy["0"].data["0"].elec["0"].value.length - 1) {
						dayResult.labels.push("12:00:00 AM");
						
					} else {
						var hourObj = result.Energy.HistoricalEnergy["0"].data["0"].elec["0"].value[i].$.date.split(" ");
						var hour = hourObj[1]+" "+hourObj[2];
						dayResult.labels.push(hour);
					}
				}
				
				for (var ii = 0; ii < result.Energy.HistoricalEnergy["0"].data["0"].elec["0"].value.length; ii++) {
					dayResult.data.push(result.Energy.HistoricalEnergy["0"].data["0"].elec["0"].value[ii]._)
					
				}
				
				  console.log('condensed', dayResult )
			  
			   dispatch({ type    : FETCH_ENERGY,
			  			  energy : dayResult });
			  resolve()
			});
		    
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
    })
  }
}



/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
	    
        dispatch({
          type    : COUNTER_DOUBLE_ASYNC,
          payload : getState().counter
        })
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  increment,
  getEnergy,
  doubleAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
	
  [FETCH_ENERGY] : (state, action) => state.graphDatas.labels = action.energy.labels,
  [COUNTER_INCREMENT]    : (state, action) => state + action.payload,
  [COUNTER_DOUBLE_ASYNC] : (state, action) => state * 2
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
		graphDatas: {
		labels: [],
		 datasets: [
	    {
	      label: 'Today',
	      data: [],
	      backgroundColor: '#be2239',
	      hoverBackgroundColor: '#be2239',
	      stack: 1,
	    }
	  ],
	},
	counter: 0
}
export default function counterReducer (state = initialState, action) {
	console.log('reducer', state, action);
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
