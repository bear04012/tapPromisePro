import React from 'react'; 
import { StyleSheet, Text, View, TouchableOpacity,Dimensions } from 'react-native';
import { Container, Header, Button, Accordion, ListItem, Icon, Spinner } from 'native-base';
import { Constants, Svg,Google } from 'expo';
import { firebase, db } from '../utils/db';
import moment from 'moment';

class Setting extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      completed: -1,
      monthComplete: -1,
      monthLogs: -1,
      rank: undefined,
      google:this.props.google
    }
    this.googleLogin = this.googleLogin.bind(this);
  }

  componentDidMount() {
    let monthComplete = 0;
    let monthLogs = 0;
    let completed = 0;
    let rank; 
    let achivement;
    this.props.allLogs.forEach((val) => {
      if (val.data().completed) {
        completed++;
      }
      if (parseInt(moment(val.data().today).format("M")) == parseInt(moment().format("M"))) {
        if (val.data().completed) {
          monthComplete++;
          monthLogs++;
        } else {
          monthLogs++;
        }
        
      }
    })
    if (monthComplete > 10) {
      rank = "Newbie"
    } else if (monthComplete > 30) {
      rank = "Jr.Member"
    } else if (monthComplete > 50) {
      rank = "Member"
    } else if (monthComplete > 100) {
      rank = "Full Member"
    } else if (monthComplete > 150) {
      rank = "Sr.Member"
    } else if (monthComplete > 200) {
      rank = "Hero Member"
    } else if (monthComplete > 250) {
      rank ="Legendary"
    } else {
      rank ="Brand New"
    }
    this.setState({
      monthComplete,
      monthLogs,
      completed,
      rank
    })
  }
  signout() {
    firebase.auth().signOut();
  }

  async googleLogin() {
    this.setState({ isLoggingIn: true })
    try {
      const result = await Google.logInAsync({
        // androidClientId: YOUR_CLIENT_ID_HERE,
        iosClientId: '643025550778-aecigmifcsf56suitiing7na1idc3g7l.apps.googleusercontent.com',
        androidClientId: "643025550778-e0f9onpt3k8p6rsue238oeu187nhh80f.apps.googleusercontent.com",
        androidStandaloneAppClientId: "643025550778-dcabktp3585cmsshulkq9hbuc2lndeh1.apps.googleusercontent.com",
        scopes: ['profile', 'email'],
        iosStandaloneAppClientId: "643025550778-ckfmbjaho7prm79ki4atosc0agvk1hv1.apps.googleusercontent.com"
      });
      if (result.type === 'success') {
        let credential = firebase.auth.GoogleAuthProvider.credential(null, result.accessToken)
        firebase.auth().signInAndRetrieveDataWithCredential(credential)
        this.setState({google:true})
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

    const dataArray = [
      { title: "Rank", content: this.state.rank },
      { title: "Total Complete", content: this.state.completed },
      { title: "This Month", content: this.state.monthComplete+"/"+this.state.monthLogs },
      
    ];
    
    const linkBtn = (
      <Button iconLeft block light style={{marginTop:20}} onPress={this.googleLogin}>
        {
            <React.Fragment>
              <Icon type="FontAwesome" name='google' />
              <Text style={{ color: '#D63F5F', fontWeight: 'bold', fontSize: 15, marginHorizontal: 10 }}>Link with Google  </Text>
            </React.Fragment>
        }
      </Button>
    )


    return (
      <View>
        
        <ListItem style={{ backgroundColor: 'rgba(255,255,255,0.4)', height: 40, borderTopRightRadius: 5, borderTopLeftRadius: 5 }} itemDivider>
          <Text style={{color:"white"}}>Completed</Text>
        </ListItem>
        <Accordion style={{}} headerStyle={{ backgroundColor: 'rgba(255,255,255,0.2)' }} contentStyle={{ backgroundColor: "transparent",color:"white"}} dataArray={dataArray} />
          {/* <Svg height={Dimensions.get("window").height / 2} width={Dimensions.get("window").width}>
            <Svg.Text
              fill="none"
              stroke="black"
              fontSize="50"
              fontWeight="bold"
              x={Dimensions.get("window").width / 2}
              y="40"
              textAnchor="middle"
            >Completed</Svg.Text>
            
            <Svg.Circle
              cx={Dimensions.get("window").width/2}
              cy={Dimensions.get("window").height/4}
              r={100}
              strokeWidth={2.5}
              stroke="#e74c3c"
              fill="white"
            />
            <Svg.Text
              fill="purple"
              stroke="purple"
              fontSize="100"
              fontWeight="bold"
              x={Dimensions.get("window").width / 2}
              y={Dimensions.get("window").height / 4+30}
              textAnchor="middle"
            >{this.props.completed}</Svg.Text>
          </Svg>  */}
        
        {!this.state.google && linkBtn}
        
      </View>
    )
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    marginTop:50
  },
});


export default Setting;