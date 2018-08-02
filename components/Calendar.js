import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import { Container, Header, Segment, Left, Right, Badge, Icon, Footer, FooterTab, Body, Content, Button, Animated, Easing } from 'native-base';
import moment from 'moment';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: moment(),
    }

    this.generateMonth = this.generateMonth.bind(this);
    this.generateToday = this.generateToday.bind(this);
  }


  generateMonth(offset) {

    this.setState(state => {
      let cloneDay = state.selectedDay.clone();
      cloneDay.add(offset, 'month');

      return {
        selectedDay: cloneDay
      }
    })
  }

  generateToday() {
    this.setState(
      {
        selectedDay: moment()
      }

    )
  }

  render() {
    const { selectedDay } = this.state;
    const { completedLogs } = this.props;

    let cloneMonth = selectedDay.clone();
    let timeAry = [];
    completedLogs.forEach(val => {
      if (parseInt(moment(val.data().today).format('MM')) == parseInt(cloneMonth.format('MM'))) {
        timeAry.push(val.data().today)
      }
    });
    timeAry.sort((a, b) => {
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0
      }
    })

    timeAry.forEach((val) => console.log(val))


    
    let firstday = parseInt(cloneMonth.startOf('month').format('d'));
    let today = parseInt(moment().format("D"));
    let lastDay = selectedDay.daysInMonth();
    let medalCnt = 0;
    let dates = new Array(firstday + lastDay).fill(0).map((_, i) => {
      
      let num = i - firstday + 1;
      let time=""
      if (medalCnt < timeAry.length) {
        time = moment(timeAry[medalCnt]).format();
      } else {
        time=""
      }
      

      if (num == parseInt(moment(time).format("D")) && parseInt(cloneMonth.format('MM')) == parseInt(moment(time).format('MM'))) {
        medalCnt++;
        return <View key={i} style={styles.oneDay}><Text style={{color:"white"}}>{i - firstday + 1}</Text><Ionicons style={{fontSize:20,marginTop:1,}} color="gold" name="ios-medal" /></View>
      } else if (num > 0) {
        return <View key={i} style={styles.oneDay}><Text style={{ color: "white" }}>{i - firstday + 1}</Text></View>
      } else {
        return <View key={i} style={styles.oneDay}><Text style={{ color: "white" }}></Text></View>
      }
    })

    //----------------------Today-------------------
    // if (i - firstday + 1 === today && parseInt(cloneMonth.format('M')) === parseInt(moment().format('M'))) {
    //   return <View key={i} style={styles.today}><Text >{i - firstday + 1}</Text><Ionicons name="ios-medal-outline" /></View>
    // } else 
    //--------------------------------------------

    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
      <View key={i} style={styles.days}><Text style={{color:"white"}}>{day}</Text></View>
    ))

    return (

      <View style={{ backgroundColor: 'rgba(255,255,255,0.2)',paddingTop:20,paddingBottom:40,borderRadius:5}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.generateMonth(-1)}>
            <Ionicons name="ios-arrow-back" style={{fontSize:30,marginRight:20,color:"white"}} />
          </TouchableOpacity>
            <Text style={{fontSize:20,color:"white"}}>{selectedDay.format('MMMM YYYY')}</Text>
          <TouchableOpacity onPress={() => this.generateMonth(1)}>
            <Ionicons name="ios-arrow-forward" style={{ fontSize: 30,marginLeft:20,color:"white" }} />
          </TouchableOpacity>
        </View>
        <View style={styles.daysContainer}>
          {days}
        </View>
        <View style={styles.dates}>
          {dates}
        </View>
      </View>
    )
      }
    }
    
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom:30,
  },
  today: {
    alignItems:"center",
    backgroundColor: "yellow",
    width: (Dimensions.get("window").width - 21) / 7,
    height: 40,
  },
  daysContainer: {
    flexDirection:"row"
  },
  days: {
    marginLeft:-1,
    alignItems:"center",
    width: (Dimensions.get("window").width - 21) / 7,
    height: 30,
  },
  dates: {
    flexDirection:"row",
    flexWrap: "wrap",
  },
  oneDay: {
    alignItems:"center",
    width: (Dimensions.get("window").width-21)/7,
    height: (Dimensions.get("window").width - 21) / 7,
    marginTop:-1,
    marginLeft: -1,
  },
});

export default Calendar