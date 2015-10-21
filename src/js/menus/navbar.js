import React from 'react';

export class Navbar extends React.Component {
  render() {
    return <div>
             <nav className="drop-shadow navbar">
               <div className="small-menu-title">MENU</div>
               <a href="/">Home</a>
                 <a href="#/">Farm Designer</a>
                 <a href="#/movement">Controls</a>
                 <a href="#/devices">Devices</a>
                 <a href="#/sequence">Sequences</a>
                 <a href="#/schedule">Schedules</a>
                 <a className="large-menu-right" href="/users/sign_out">Sign out</a>
                 <a className="large-menu-right" href="/users/edit">My Account</a>
                 <button className="red button-like" type="button">Stop*</button>
                 <button className="yellow button-like" type="button">
                   Sync <i className="fa fa-upload"></i>*
                 </button>
                 LAST SYNC: Never
             </nav>
           </div>
  }
}
