import React from 'react';
import { Link } from 'gatsby'
import { Dropdown } from 'react-bootstrap'

import './scss/navStyles.scss'


export default function Nav({logo, years, orderYears}){
    return (
        <div className="navClass">
            <ul>
              <Link to="/">  
                <img 
                  alt="logo"
                  className="logo"
                  src={logo}
                />
              </Link>
              <li>
                <Link to="/bio/">
                  BIO
                </Link>
              </li>
              <li>
                <Link to={`/${orderYears[0]}/`}>
                  {orderYears[0]}
                </Link>
              </li>


              <Dropdown className="dropdownmenu">
                <Dropdown.Toggle variant="flat">
                  Older Work
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {
                    years.map((year, index) => (
                      <li
                        key={index}
                        className="list-of-years"
                      >
                          <Link  to={`/${year.node.yeartitle}/`}>{year.node.yeartitle}</Link>
                        </li>
                    ))
                  }
                </Dropdown.Menu>
              </Dropdown>

              <li>
                <Link to={`/curatorial/`}>
                  Curatorial Work
                </Link>
              </li>
            </ul>
        </div>
    )
}