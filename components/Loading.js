import React, { Component } from 'react';
import { Content, Spinner } from 'native-base';

export default class Loading extends Component {
  render() {
    return (
        <Content contentContainerStyle={{justifyContent:"center",alignItems:"center"}}>
          <Spinner color='green' />
        </Content>
    );
  }
}