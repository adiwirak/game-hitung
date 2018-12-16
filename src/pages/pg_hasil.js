import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'

import CetakUser from '../components/ctk_user.js';
import CetakFooter from '../components/ctk_footer.js';

class PgHasil extends Component {
  TampilkanScore(){
    let hasil=this.props.BykBenar/this.props.BykSoal*100;
    if(isNaN(hasil)) hasil="Maaf, g bs dihitung!"
    console.log(this.props.BykBenar,"/",this.props.BykSoal,"=",hasil)
    let Warna="green"
    if ( isNaN(hasil) || (hasil<35) ) Warna="red"
    else if (hasil<75) Warna ="yellow"
    return (
      <h2 className="title" style={{color: Warna}} >score :  {hasil}</h2>
    )
  }  
  
  kePageHome(){
    this.props.history.push('/');    
  }

  showMainLayout(){
      return (
        <div style={{padding: "5px 50px 50px 50px"}}>
        <CetakUser/>
        <div className="hero-body" style={{backgroundColor: "#336699"}}>
          <div className="container">
            <h1 className="title">
              Tugas Anda Sudah Selesai!
            </h1>
            <h2 className="subtitle" style={{color: "yellow"}} >
              Soal demi soal telah anda jawab. Dan saatnya, system memberitaukan hasil nilai anda
            </h2>
          </div>
        </div>
        <div className="notification">
        Data Pemain :
        <table className="table is-striped"><tbody>
            <tr><td>Nama</td>
            <td align="center" width="10px">:</td>
            <td>{this.props.nama}
            </td></tr>
            <tr><td>Alamat Email</td>
            <td width="10px">:</td>
            <td>{this.props.email}
            </td></tr>
            <tr><td align="right">Nomer Handphone</td>
            <td align="center" width="10px">:</td>
            <td>{this.props.phone_numb}
            </td></tr>
        </tbody></table>
        {
          this.TampilkanScore()
        } 
        </div>
        <div className="notification" style={{textAlign: "center"}}  >
            <button className="button is-success"
                onClick={()=>this.kePageHome()}
            >Main Lagi...</button>
          </div>
        <CetakFooter/>
      </div>
      )
    }

    render() {
      if(!this.props.sdh_daftar){
        return(<Redirect to="/" />)
      } else 
        return this.showMainLayout();
    }
}

const mapStateToProps = (state) => {
  return state.pemain;
};

export default connect(mapStateToProps, null)(PgHasil);
