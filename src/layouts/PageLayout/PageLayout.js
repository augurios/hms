import React from 'react'
import Select from 'react-select'
import moment from 'moment';
// import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

var options = [
  { value: 'HMS Campus Total Usage', label: 'HMS Campus Total Usage', clearableValue : true },
  { value: 'two', label: 'Two' }
]

function logChange (val) {
  console.log('Selected: ' + JSON.stringify(val))
}

export const PageLayout = ({ children }) => (
  <div className='container-fluid text-center'>
    {/* <h1>React Redux Starter Kit</h1>
    <IndexLink to='/' activeClassName='page-layout__nav-item--active'>Home</IndexLink>
    {' · '}
    <Link to='/counter' activeClassName='page-layout__nav-item--active'>Counter</Link> */}
    <header className='row header'>
      <div className='col-12 col-md-3'>
        <a href="/"><img src='/images/logo-h.png' className='logo' /></a>
      </div>
      <div className='col-12 col-md-6 col-md-vertical-center'>
        <h1>Total Overall Energy Consumption</h1>
      </div>
      <div className='col-12 col-md-3 col-md-vertical-center'>
        <Select
          name='form-field-name'
          value='HMS Campus Total Usage'
          options={options}
          onChange={logChange}
        />
      </div>
      <nav className='col-12 col-md-vertical-center'>
        <ul>
          <li className="active"><a href="total-usage">Total Usage</a></li>
          <li>Electricity</li>
          <li>Cooling</li>
          <li>Heating</li>
          <li>Current Weather</li>
          <li>Historical Usage</li>
        </ul>
      </nav>
    </header>
    <div className='page-layout__viewport'>
      {children}
    </div>
    <footer className='footer row'>
      <div className='col-12 col-sm-6 col-md-vertical-center'>
        <p>{`Copyright ${moment().format('YYYY')} Harvard Medical School. All Rights Reserved.`}</p>
      </div>
      <div className='col-12 col-sm-6 col-md-vertical-center'>
        <a href='#'>Facilities Website</a>
        <a href='#'>About this display</a>
      </div>
    </footer>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
