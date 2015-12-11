import React from 'react';
import { Navbar } from '../components/navbar';
import { Link } from 'react-router';

export var Login = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar/>
        <div className="all-content-wrapper">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
              <div className="widget-wrapper">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="widget-header">
                      <h5>Login</h5>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="widget-content">
                      <div className="input-group">
                        <label>Email</label>
                        <input type="text"></input>
                        <label>Password</label>
                        <input type="password"></input>
                      </div>
                      <div className="row">
                        <div className="col-xs-6">
                          <p className="auth-link">
                            <Link to={ "route_for_resetting_password" }>Reset password</Link>
                          </p>
                          <p className="auth-link">
                            <Link to={ "create_account" }>Create an account</Link>
                          </p>
                        </div>
                        <div className="col-xs-6">
                          <button className="button-like button green login">
                            Login
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
              <div className="widget-wrapper">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="widget-header">
                      <h5>Create an Account</h5>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="widget-content">
                      <div className="input-group">
                        <label>Email</label>
                        <input type="text"></input>
                        <label>Password</label>
                        <input type="password"></input>
                        <label>Verfy Password</label>
                        <input type="password"></input>
                      </div>
                      <div className="row">
                        <div className="col-xs-6">
                          <p className="auth-link">
                            Already have an account? <Link to={ "login" }>Login here</Link>
                          </p>
                        </div>
                        <div className="col-xs-6">
                          <div className="auth-button">
                            <button className="button-like button green create-account">
                              Create Account
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
