import React, { Component } from 'react';
import { connect } from "react-redux";

import { css } from 'emotion';

const styles = {
  panel: {
    backgroundColor: '#00ffff',
    display: "flex",
    justifyContent: 'space-between',
  },
  item:{
    width:"100%", textAlign:"center",
  }
};

class CetakFooter extends Component {
  shouldComponentUpdate (nextProps, nextState){
    return this.props.IPnya !== nextProps.IPnya;
  }
  
  CetakIPAddr(){
    let s=this.props.IPnya
    if(s!=="") return(<span  className={css(styles.item)}>IP anda: {s}</span>)
  }

  render() {
    return (
      <footer className={css(styles.panel)}>
        {this.CetakIPAddr()}        
        <span className={css(styles.item)}>Copyright Adi Wira K @ 2018</span>
     </footer> 
       
      )
    }
}

const mapStateToProps = (state) => {
    return {
      IPnya: state.pemain.ippemain,
    };
  };
  
export default connect(mapStateToProps, null)(CetakFooter);
