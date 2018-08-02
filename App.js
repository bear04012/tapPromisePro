import React from 'react';
import { Container, Header, Title, Body, Footer, Content, FooterTab, Button, Icon, Spinner } from 'native-base';
import {StyleSheet, Text, View, ScrollView, ImageBackground, Image, Dimensions,AsyncStorage } from 'react-native';
import { Constants, Google,Font } from 'expo';
import Main from './containers/Main';
import { firebase,db } from './utils/db';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      entered: false,
      isLoggingIn: false,
      google:false,
    }

    this.googleLogin = this.googleLogin.bind(this);
    this.deviceLogin = this.deviceLogin.bind(this);
    this.displayData = this.displayData.bind(this);
  }

  componentDidMount() {
    Font.loadAsync({
      'noto-sans': require('./Fonts/noto-sans.ttf'),
      'noto-sans-bold':require('./Fonts/noto-sans-bold.ttf')
    });

    this.displayData()
      .then((uid) => {
        console.log(uid)
        let user = {
          uid
        };
        db.collection("users").doc(uid).get()
          .then((doc) => {
            if (doc.exists) {
              console.log("hi")
              this.setState({ user });
            }
          })
      });

    firebase.auth().onAuthStateChanged(userInfo => {
      
      if (userInfo) {
        this.setState({ google: true })
        if (!this.state.user) {
          db.collection("users").where("googleUID", "==", userInfo.uid).get()
            .then((querySnapshot) => {
              let user = {};
              console.log(querySnapshot.size);
              if (querySnapshot.size > 0) {
                user.uid = querySnapshot.docs[0].id;
                this.setState({ user, isLogginIn: false });
              } else {
                db.collection("users").add({ googleUID: userInfo.uid })
                  .then((docRef) => {
                    let user = {
                      uid: docRef.id
                    }
                    AsyncStorage.setItem('UID', docRef.id);
                    this.setState({ user, isLoggingIn: false })
                  })
              }
            })   
        } else {
          db.collection("users").doc(this.state.user.uid).get()
            .then((doc) => {
              if (doc.exists) {
                db.collection("users").doc(this.state.user.uid).update({ googleUID: userInfo.uid });
              }
          })
        }
        
        // db.collection("users").doc(this.state.user.uid).get()
        //   .then((doc) => {
        //     if (doc.exists) {
        //       db.collection("users").doc(this.state.user.uid).update({ googleUID: userInfo.uid })
        //     } else {
        //       db.collection("users").where("googleUID", "==", userInfo.uid).get()
        //         .then((querySnapshot) => {
        //           let user = {};
        //           console.log(querySnapshot.size);
        //           if (querySnapshot.size > 0) {
        //             user.uid = querySnapshot.docs[0].id;
        //             this.setState({ user, isLogginIn: false });
        //           } else {
        //             db.collection("users").add({ googleUID: userInfo.uid })
        //               .then((docRef) => {
        //                 let user = {
        //                   uid: docRef.id
        //                 }
        //                 AsyncStorage.setItem('uid', docRef.id);
        //                 this.setState({ user, isLoggingIn: false })
        //               })
        //           }
        //       })
        //     }
            
        // })
      } else {
        console.log("log out detected")
        this.setState({ user: undefined, entered: false })
      }
    });

  }


  displayData() {
    return AsyncStorage.getItem('UID');
  }

  deviceLogin() {
    this.setState({ isLogginIn: true })
    db.collection("users").add({ date: new Date() })
      .then((docRef) => {
        let user = {
          uid:docRef.id
        }
        AsyncStorage.setItem('UID', docRef.id);
        this.setState({user})
    })
  }

  async googleLogin() {
    this.setState({ isLoggingIn: true })
    try {
      const result = await Google.logInAsync({
        // androidClientId: YOUR_CLIENT_ID_HERE,
        iosClientId: '643025550778-aecigmifcsf56suitiing7na1idc3g7l.apps.googleusercontent.com',
        androidClientId:"643025550778-e0f9onpt3k8p6rsue238oeu187nhh80f.apps.googleusercontent.com",
        androidStandaloneAppClientId: "643025550778-dcabktp3585cmsshulkq9hbuc2lndeh1.apps.googleusercontent.com",
        scopes: ['profile', 'email'],
        iosStandaloneAppClientId: "643025550778-ckfmbjaho7prm79ki4atosc0agvk1hv1.apps.googleusercontent.com"
      });
      if (result.type === 'success') {
        let credential = firebase.auth.GoogleAuthProvider.credential(null, result.accessToken)
        firebase.auth().signInAndRetrieveDataWithCredential(credential)
      } else {
        // cancelled
        this.setState({ isLoggingIn: false });
      }
    } catch (e) {
      // error
      this.setState({ isLoggingIn: false });
    }
  }

  render() {
    console.log("user",this.state.user)
    if (this.state.entered) {
      return <Main user={this.state.user} google={this.state.google} usedGoogle={this.usedGoogle} />
    }

    const loginBtn = (
      <Button iconLeft primary onPress={this.googleLogin}>
        {
          this.state.isLoggingIn ?
            <React.Fragment>
              <Spinner />
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, marginHorizontal: 10 }}>Processing login....</Text>
            </React.Fragment>
            :
            <React.Fragment>
              <Icon type="FontAwesome" name='google' />
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, marginHorizontal: 10 }}>Login With Google  </Text>
            </React.Fragment>
        }
      </Button>
    )
    const deviceLoginBtn = (
      <Button iconLeft dark style={{marginTop:20}} onPress={this.deviceLogin}>
        {
          this.state.isLoggingIn ?
            <React.Fragment>
              <Spinner />
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, marginHorizontal: 10 }}>Processing login....</Text>
            </React.Fragment>
            :
            <React.Fragment>
              <Icon type="MaterialCommunityIcons" name='human-male' />
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, marginHorizontal: 10 }}>Sign In as a Guest  </Text>
            </React.Fragment>
        }
      </Button>
    )

    return (
      <Container>
        <Body style={styles.mainBody}>
          <View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#e05773',
              opacity: 2
            }}
          ></View>
          <ImageBackground
            source={require('./img/mainbg.jpg')}
            style={{
              width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',
            }}
            opacity={0.5}>
            {/* <Icon name="bug" /> */}
            <Text
              style={{
                fontSize: 40, color: '#ff99CC',
                textShadowColor: 'white',
                textShadowRadius: 2,
                textShadowOffset: { width: 2, height: 2 }
              }}
            >Tap Promise {this.state.accessToken}</Text>
            <View style={{ alignSelf: 'center', marginTop: 200 }} >
              {
                !this.state.user ?
                  <View>
                    {loginBtn}
                    {deviceLoginBtn}
                  </View>
                  :
                  <View style={{ width: Dimensions.get('window').width / 3, alignItems: 'center' }}>
                    <Image source={{ url: this.state.user.photoURL }} style={{ width: 80, height: 80, marginBottom: 5 }} />
                    <Button block color="#e05773" onPress={() => this.setState({ entered: true })}>
                      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, marginHorizontal: 10 }} >Enter</Text>
                    </Button>
                  </View>
              }
            </View>
          </ImageBackground>
        </Body>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  mainBody: {
    alignSelf: 'stretch',
    justifyContent: 'center',
  }
});
