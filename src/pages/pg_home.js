import React, { Component } from 'react';
import './StylePages.css';
import logo from '../logo.svg';
import CetakFooter from '../components/ctk_footer.js';
import axios from 'axios';

class MainHome extends Component {
  constructor(props){
    super(props);
    this.state={
      SdgLoding:true, PsnErr:"",
      ListPemain:[],
    }
  }

  kePageLogin(){
    this.props.history.push('/login');    
  }

  TampilkanData(){
    if(this.state.SdgLoding){
      return(            
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src={logo} className="App-logo" alt="logo" /> 
            </figure>
          </div>
          <div className="media-content">Loading...  </div>
        </div>
      )
    }else if(this.state.PsnErr !==""){
      return(            
        <div className="media">{this.state.PsnErr}</div>
      )
    }else{
      let children = [];
      let vListPemain = this.state.ListPemain;
      console.log(vListPemain)
      for(let i=0; i < vListPemain.length; i++) {
          let Nama= vListPemain[i].Nama;
          let GambarURL= vListPemain[i].GambarURL;
          children.push(
            <div className="column is-half" key={i}>
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <img src={GambarURL} alt="Placeholder image"/>
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4">{Nama}</p>
                  <p className="subtitle is-6">***@***.***</p>
                </div>
              </div>
            </div>
          )
      }
      if(children.length>0){
        return(            
          <div>Ini Daftar Pemain yang telah ikut bermain
            <div className="media">
              <div className="columns is-multiline" style={{width:"100%"}}>{children}</div>
            </div>
          </div>
        )
      }
  
    }
  }
  
  componentDidMount(){
    axios.get("https://reqres.in/api/users")
    .then(resp =>{
      let data = resp.data.data;
      let vListPemain = data.map(TiapIndex => {
          return{
            Nama: TiapIndex.first_name,
            GambarURL: TiapIndex.avatar,
          }
        });
      this.setState({
        SdgLoding:false,
        ListPemain: vListPemain,
      })
    })
    .catch(err =>{
      this.setState({
        SdgLoding:false,
        PsnErr:err.message
      })
    })
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
          <div className="notification">{this.TampilkanData()}
          </div>
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