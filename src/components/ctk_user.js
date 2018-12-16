import React, { Component } from 'react';
import { connect } from "react-redux";

class CetakUser extends Component {
  shouldComponentUpdate (nextProps, nextState){
    return this.props.Pemainnya !== nextProps.Pemainnya;
  }
  
  render() {
        return (
        <div style={{textAlign:"right", width:"100%"}}>
        Hi, {this.props.Pemainnya}... </div>
      )
    }
}

const mapStateToProps = (state) => {
    return {
      Pemainnya: state.pemain.nama,
    };
  };
  
export default connect(mapStateToProps, null)(CetakUser);
