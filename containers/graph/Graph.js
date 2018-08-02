import React from 'react';
import { db } from '../../utils/db';
import { StyleSheet, Text, TouchableOpacity, View,Dimensions,ScrollView } from 'react-native';
import { Container, Header, Segment, Left, Right, Badge, Icon, Footer, FooterTab, Body, Content, Button, Animated, Easing } from 'native-base';
import moment from 'moment';
import { Ionicons } from "@expo/vector-icons";
import Calendar from '../../components/Calendar';
import LineGraph from './LineGraph.js';
import { Svg, Constants, Line } from 'expo';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay:moment(),
      completedLogs: [],
      monthRecord: [],
      maxGoals:-1,
    }
    this.generateMonth = this.generateMonth.bind(this);
  }

  componentDidMount() {
    if (this.props.period == "Daily") {
      db.collection("log").where("id", '==', this.props.promiseID)
        .get().then((querySnapshot) => {
          let cloneDay = this.state.selectedDay.clone();
          let monthRecord = [];
          let maxGoals=0;
          querySnapshot.forEach((doc, i) => {
            if (cloneDay.format("M") == moment(doc.today).format("M") && cloneDay.format("YYYY") == moment(doc.today).format("YYYY"))
              monthRecord.push(doc.data());
          })
          monthRecord.sort((a, b) => {
            if (a.today > b.today) {
              return 1;
            } else if (a.today < b.today) {
              return -1;
            } else {
              return 0
            }
          })

          monthRecord.forEach((val) => {
            if (maxGoals < val.goals) maxGoals = val.goals;
          });

          this.setState({
            monthRecord,
            maxGoals
          })
        }).catch(function (error) {
          console.log("Error getting documents: ", error);
        });

      db.collection("log").where("id", '==', this.props.promiseID).where("completed", '==', true)
        .get().then((querySnapshot) => {
          let completedLogs = [];
          querySnapshot.forEach((doc) => completedLogs.push(doc));
          this.setState({ completedLogs })
        }).catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    } else if (this.props.period == "Weekly") {
      db.collection("weeklyLogs").where("id", '==', this.props.promiseID)
        .get().then((querySnapshot) => {
          let cloneDay = this.state.selectedDay.clone();
          let monthRecord = [];
          let maxGoals = 0;
          querySnapshot.forEach((doc, i) => {
            if (cloneDay.format("M") == moment(doc.today).format("M") && cloneDay.format("YYYY") == moment(doc.today).format("YYYY"))
              monthRecord.push(doc.data());
          })
          monthRecord.sort((a, b) => {
            if (a.today > b.today) {
              return 1;
            } else if (a.today < b.today) {
              return -1;
            } else {
              return 0
            }
          })

          monthRecord.forEach((val) => {
            if (maxGoals < val.goals) maxGoals = val.goals;
          });

          this.setState({
            monthRecord,
            maxGoals
          })
        }).catch(function (error) {
          console.log("Error getting documents: ", error);
        });

      db.collection("weeklyLogs").where("id", '==', this.props.promiseID).where("completed", '==', true)
        .get().then((querySnapshot) => {
          let completedLogs = [];
          querySnapshot.forEach((doc) => completedLogs.push(doc));
          this.setState({ completedLogs })
        }).catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    } else {
      db.collection("monthlyLogs").where("id", '==', this.props.promiseID)
        .get().then((querySnapshot) => {
          let cloneDay = this.state.selectedDay.clone();
          let monthRecord = [];
          let maxGoals = 0;
          querySnapshot.forEach((doc, i) => {
            if (cloneDay.format("M") == moment(doc.today).format("M") && cloneDay.format("YYYY") == moment(doc.today).format("YYYY"))
              monthRecord.push(doc.data());
          })
          monthRecord.sort((a, b) => {
            if (a.today > b.today) {
              return 1;
            } else if (a.today < b.today) {
              return -1;
            } else {
              return 0
            }
          })

          monthRecord.forEach((val) => {
            if (maxGoals < val.goals) maxGoals = val.goals;
          });

          this.setState({
            monthRecord,
            maxGoals
          })
        }).catch(function (error) {
          console.log("Error getting documents: ", error);
        });

      db.collection("monthlyLogs").where("id", '==', this.props.promiseID).where("completed", '==', true)
        .get().then((querySnapshot) => {
          let completedLogs = [];
          querySnapshot.forEach((doc) => completedLogs.push(doc));
          this.setState({ completedLogs })
        }).catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    }
    

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

  render() {
    const { completedLogs, monthRecord,maxGoals } = this.state;
    
    console.log(this.props.period)
    
    return (
      <View>
        
        
        
        <Calendar completedLogs={completedLogs} />
        <View style={styles.header}><Text style={{ fontSize: 30, color: "white", fontFamily: "noto-sans-bold" }}>{this.props.period}</Text></View>
        <LineGraph monthRecord={monthRecord} maxGoals={maxGoals}/>

        
        

        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    marginLeft:-10,
    width: Dimensions.get("window").width,
    alignItems: "center",
    marginTop:50
  }
})

export default Graph;