/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PayPal from 'react-native-paypal-wrapper';
import BTClient from 'react-native-braintree-xplat'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from 'react-native';


type Props = {};
export default class App extends Component<Props> {

  componentDidMount() {
    BTClient.setup('$sandbox$mz6yj89hx2q549kq$253c14d43aa2c1af61231d2a4c574b57');
    PayPal.initialize(PayPal.NO_NETWORK, "AVItw1y_tnk21qt5nS1IVzGPtnhiAcQnVf-fULd-12XlCeU3OlPKCQsaOfh-6MjN0s5sIlOYmG1cLf7v");
  }
  payWithPayPal(){
    PayPal.pay({
      price: '40.70',
      currency: 'MYR',
      description: 'Your description goes here',
    }).then(confirm => console.log(confirm))
      .catch(error => console.log(error));
  }

  payWithBrainTree(){
        BTClient.showPaymentViewController().then(function(nonce) {
      //payment succeeded, pass nonce to server
    })
    .catch(function(err) {
      //error handling
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Welcome to my first React Native application !</Text>
        <View style={styles.buttonView}>
          <Button style={styles.button}
          onPress={() => {
            this.payWithPayPal()
            }}
            title="Pay with PayPal"
          />
          <Button style={styles.button}
          onPress={() => {
            this.payWithBrainTree()
            }}
            title="Pay with Brain Tree"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 10
  },
  text: {
   color: 'blue',
   fontWeight: 'bold',
   fontSize: 16,
 },
 buttonView: {
   flex: 0.2,
    margin: 20,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
 button:{
   margin:5
 }
});
