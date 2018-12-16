import React, { Component } from 'react';
import CetakFooter from '../components/ctk_footer.js';

class MainHome extends Component {
    kePageLogin(){
        this.props.history.push('/login');    
    }

    render() {
        return (
        <div style={{padding: "5px 50px 50px 50px"}}>
          <div className="hero-body" style={{backgroundColor: "red"}}>
            <div className="container">
              <h1 className="title">
                SELAMAT DATANG
              </h1>
              <h2 className="subtitle">
                Di Permainan berhitung sederhana
              </h2>
            </div>
          </div>
        <div>
        </div>

        <div className="container">
          Permainan ini sangat sederhana sekali. cocok untuk anak SD kelas 1. SELAMAT Mencoba...!!!
          <div className="notification">
            <button className="button is-success"
                onClick={()=>this.kePageLogin()}
            >Ayo perkenalkan dirimu, dan main...</button>
          </div>
          <CetakFooter/>
        </div>

      </div>
      )
    }
}

export default MainHome;