import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from "react-redux";
import { Button } from 'bloomer';

import * as AksiUser from '../globalstore/actions/ubah_pemain.js';
import * as AksiApp from '../globalstore/actions/ubah_app.js';

class PgLogin extends Component {
  constructor(props){
    super(props)
    this.state={
      namapemain:"", email:"", nohp:"", validasi:false,
      PindahPage:"",
    }
  }

  AfterLogin(data){
    console.log('Sukses Hit ',data);
    this.setState({PindahPage:"/play1"}) ;  
  }

  ValidasiForm(){
    if (this.state.namapemain==="") return false;
    if (this.state.email==="") return false;
    if (this.state.nohp==="") return false;
    return true;
  }
  
  KlikDaftarXP(){
    if (!this.ValidasiForm()){
      this.setState({validasi: true}) 
      this.refs.Username.focus()
      return;
    }
    let objData = {
      nama: this.state.namapemain,
      email: this.state.email,
      phone_numb: this.state.nohp,      
    };
    this.props.ubahSemuaTtgUser(objData,(x)=>this.AfterLogin(x));
  }

  IsiInput(Obj,mode){
    let Nilai=Obj.target.value;
    //console.log(Nilai)
    switch(mode){
      case 1:
        this.setState({namapemain: Nilai}) 
        break;
      case 2:
        this.setState({email: Nilai}) 
        break;
      default:
        this.setState({nohp: Nilai});
    }
  }
  
  ValidasiIsiInput(mode){
    if(!this.state.validasi) return;
    let Str1="";
    switch(mode){
      case 1:
        if (this.state.namapemain==="") Str1="Nama"
        break;
      case 2:
        if (this.state.email==="") Str1="Email"
        break;
      default:
      if (this.state.nohp==="") Str1="No Handphone"
    }
    if (Str1!=="") return(<font color="#FF0000" size="-1">{Str1} Pemain harus diisi !!!</font>)
  }
  
  componentDidMount(){
    this.props.ResetUser();
    this.props.ResetApp();
  }

  handleKeyPress(event,mode){
    if(event.charCode === 13){
      switch(mode){
        case 2:
          this.refs.email.focus()
          break;
        case 3:
          this.refs.nohp.focus()
          break;
        default:
          this.refs.BSaveUser.focus()
      } 
    }
  }

  render() {
      if(this.state.PindahPage!==""){
        return(
          <Redirect to={this.state.PindahPage} />
        )
      }else  
        return (
        <div style={{padding: "5px 50px 50px 50px"}}>
   <div className="card">
          <div className="card-content">
            <p className="title">Perkenalkan diri anda</p>
            <p className="subtitle"> Agar saya bisa menyapamu lebih enak, dan akan saya ingat dirimu dalam
            database pribadi ku.</p>
            <div className="field">
              <label className="label">Nama Anda</label>
              <div className="control">
                  <input ref="Username" className="input" value={this.state.namapemain}
                  autoFocus
                  onChange={(x)=>this.IsiInput(x,1)}
                  onKeyPress ={(x)=>this.handleKeyPress(x,2)}
                  type="text"  placeholder="Masukkan yg benar ya..."/>
                  {this.ValidasiIsiInput(1)}
              </div>
            </div>
  
            <div className="field">
              <label className="label">Alamat Emailmu</label>
              <div className="control">
                  <input ref="email" className="input" value={this.state.email}
                  onKeyPress={(x)=>this.handleKeyPress(x,3)}
                  onChange={(x)=>this.IsiInput(x,2)} type="text" placeholder="Contoh: jhony_sayang@gmail.com" />
                  {this.ValidasiIsiInput(2)}
              </div>
            </div>   
            <div className="field">
              <label className="label">No Handphone mu</label>
              <div className="control">
                  <input ref="nohp" className="input" value={this.state.nohp}
                  onKeyPress={(x)=>this.handleKeyPress(x,4)}
                  onChange={(x)=>this.IsiInput(x,3)} type="text" placeholder="Contoh: 08xxxx" />
                  {this.ValidasiIsiInput(3)}
              </div>
            </div>   
  
            <footer className="card-footer">
              <p className="card-footer-item register">
              {this.TampilButton()}
              </p>
            </footer>
          </div>
        </div>
          </div>
      )
    }
  
  TampilButton(){
    if(this.props.App.isLoading){
      return(<Button isColor='warning' isLoading>isLoading={true}</Button>)
    }else{
      let Str1=(this.props.App.Msg==="") ? "Let's Go to Play" : this.props.App.Msg+" / Retry";
      return(<button ref="BSaveUser" className="button is-success is-rounded"
        onClick={()=>this.KlikDaftarXP()}>{Str1}...</button>
      )
    }
  }
}

function SaatLogin(objData,OnSukses){
  return (dispatch)=>{

   dispatch(AksiApp.ubahLoading(true,""))
      
   axios.post("http://www.robotrapor.com/api/testlogin.php",objData)
    .then(resp =>{
      console.log(resp)
      objData.sdh_daftar=resp.data.bisamain;
      objData.ippemain=resp.data.iploc;
      //----------
      dispatch(AksiUser.ubahSemuaTtgUser(objData))
      dispatch(AksiApp.ubahLoading(false,""))
      OnSukses(objData)
    })
    .catch(err =>{
      dispatch(AksiApp.ubahLoading(false, err.message))
    })
  }
}

const mapStateToProps = (state) => {
  return  {
    App: state.tentang_app,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ubahSemuaTtgUser: (objData,OnSukses) => dispatch(SaatLogin(objData,OnSukses)),
    ResetApp: () => dispatch(AksiApp.ResetLoadingApp()),
    ResetUser: () => dispatch(AksiUser.ResetUSERApp()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PgLogin)