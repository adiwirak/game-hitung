import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import { Progress} from 'bloomer';


import CetakUser from '../components/ctk_user.js';
import CetakFooter from '../components/ctk_footer.js';
import * as AksiUser from '../globalstore/actions/ubah_pemain.js';

class PgPlay extends Component {
  constructor(props){
    super(props);
    this.maxprogresbar=100;
    this.state={
      hit_Ke:this.maxprogresbar,
      WrnaPB1:"info",
      SoalKe:0, SOAL_Str:"", Pilihan:[], jawaban:0,
      JwbUser:0,
    }
  }

  HitungMundur1() {
    let vhit_Ke= this.state.hit_Ke;
    vhit_Ke--;
    let Persen=vhit_Ke/this.maxprogresbar*100;
    let WrnaPB1="info"
    if (Persen<35) WrnaPB1="danger"
    else if (Persen<75) WrnaPB1="warning"
    if(vhit_Ke===0) {
      clearInterval(this.Thread1);
      this.PlayNextSoal()
    }else
      this.setState({ hit_Ke: vhit_Ke , WrnaPB1: WrnaPB1,});
  }
  
  componentWillUnmount(){
    clearInterval(this.Thread1);
    console.log("Bersih2")
  }

  PlayNextSoal(){
    let kunci=this.state.jawaban;
    let jawaban=this.state.JwbUser;
    let vBykSoal=this.props.pemain.BykSoal;
    let vBykBenar=this.props.pemain.BykBenar;
    vBykSoal++;
    if(kunci===jawaban) vBykBenar++;
    this.props.OnNextSoal(vBykSoal,vBykBenar)
    if(this.SoalKe<5){
      vBykSoal=this.SoalKe;
      vBykSoal++;
      this.BuatSoal();
      this.props.history.push('/play'+vBykSoal);    
    }else{
      this.props.history.push('/hasilakhir');    
    }
  }

  BuatSoal(){
    let N1=Math.floor(Math.random() * 10 )+1; 
    let N2=Math.floor(Math.random() * 10 )+1; 
    let jawaban_soal=N1+N2; 
    let Pilihan=[]
    let i;
    for(i=-1; i<3; i++) Pilihan.push(i*(1 + Math.floor(Math.random() * 5 ))+jawaban_soal)
    let Acak=Math.floor(Math.random() * Pilihan.length );
    if(Acak!==1){
      i=Pilihan[Acak];
      Pilihan[Acak]=Pilihan[1]
      Pilihan[1]=i
    }
    this.setState({SoalKe: this.SoalKe,
      hit_Ke:this.maxprogresbar, JwbUser:0,
      SOAL_Str: `${N1} + ${N2} =`, jawaban: jawaban_soal, 
      Pilihan:Pilihan, })
  }

  HandlePilihanUser(e){
    this.setState({ JwbUser: e.currentTarget.value*1, });
  }

  BuatPilihan(){
    let Pilihan=[]
    let ListPilihan=this.state.Pilihan;
    for(let i=0; i<ListPilihan.length; i++){
      let Opsi=ListPilihan[i]
      let sKey=`Idx${i}`;
      Pilihan.push(
        <label key={sKey} >
          <div style={{width:"100%"}}>
            <input type="radio" 
              checked={this.state.JwbUser === Opsi} onChange={(e)=>this.HandlePilihanUser(e)}
              value={Opsi}/> {Opsi}
          </div>
        </label>
    )}
    return Pilihan;
  }

  componentDidMount(){
    this.Thread1 = setInterval( () =>this.HitungMundur1(), 1000);
    this.BuatSoal();
  }

  showPlayLayout(){
    return (
        <div style={{padding: "5px 50px 50px 50px"}}>
        <CetakUser/>
        <div className="hero-body" style={{backgroundColor: "#336699"}}>
          <div className="container">
            <h1 className="title">
              Ini soal yang ke-{this.SoalKe} 
            </h1>
            <h2 className="subtitle" style={{color: "yellow"}} >
              Jawablah dengan benar, tiap soal dibatasi {this.maxprogresbar} detik
            </h2>
          </div>
        </div>
        <table width="100%">
          <tbody>
            <tr>
              <td width="2%"><h2 className="subtitle">{this.SoalKe}.</h2></td>
            <td width="2%"></td>
            <td><h2 className="subtitle">{this.state.SOAL_Str}</h2>
              {this.BuatPilihan()}
            </td></tr>
          </tbody>
        </table>
        
        <div className="notification" style={{textAlign: "center"}}  >
          <Progress isColor={this.state.WrnaPB1} value={this.state.hit_Ke} max={this.maxprogresbar}/>
        </div>

        <div className="notification" style={{textAlign: "center"}}  >
          <button className="button is-success"
                onClick={()=>this.PlayNextSoal()}
            >{(this.SoalKe<5) ? "SOAL BERIKUTNYA...":"LIHAT HASIL"}</button>
        </div>
        <CetakFooter/>
      </div>
      )
    }

    render() {
      this.SoalKe=parseInt(this.props.match.params.idx);
      if(!this.props.pemain.sdh_daftar){
        return(<Redirect to="/" />)
      } else 
        return this.showPlayLayout();
    }
}

const mapStateToProps = (state) => {
  return {
    pemain: state.pemain,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    OnNextSoal: (vBykSoal,vBykBenar) => dispatch(AksiUser.OnNextSoal(vBykSoal,vBykBenar)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PgPlay)