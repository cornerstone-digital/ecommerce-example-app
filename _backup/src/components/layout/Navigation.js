import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (path) => push(path)
}, dispatch)

const Navigation = (props) => {
  console.log(props);

  const changePage = (path) => {
    console.log(path);
    props.changePage(path);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <button className="navbar-brand" onClick={() => changePage('/')}>Redux Shopping Basket Demo</button>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <button className="nav-link" onClick={() => changePage('/')}>Home
                <span className="sr-only">(current)</span>
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => changePage('/basket')}>Basket</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default connect(null, mapDispatchToProps)(Navigation);