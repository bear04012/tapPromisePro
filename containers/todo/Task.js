import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, Image, Dimensions,TouchableOpacity } from 'react-native';
import { Container, Header, Segment, Left, Right, Title, Body, Footer, Content, FooterTab, Button, Icon, Card, CardItem, } from 'native-base';
import { FontAwesome, Entypo, SimpleLineIcons, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Loading from '../../components/Loading';
import moment from 'moment';
import Editing from './Editing';

class Daily extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDay: moment()
    }

  }
  render() {
    
    let dayList = this.props.promises.map((val, i) => {
      let ID = val.id;
      let done = 0;
      let date;

      if (val.data().period == "Daily") {
        this.props.dailyLogs.forEach((log) => {
          if (log.data().id == ID && log.data().today == moment().format("YYYY-MM-DD")) {
            done = log.data().done
            date = this.props.today
          }
        })
      } else if (val.data().period == "Weekly") {
        this.props.weeklyLogs.forEach((log) => {
          if (log.data().id == ID && log.data().today >= moment().subtract(7, 'day').format("YYYY-MM-DD")) {
            done = log.data().done
          }
        })
        date = val.data().startingDay
      } else {
        this.props.monthlyLogs.forEach((log) => {
          if (log.data().id == ID && moment(log.data().today).add(1, 'month').format("YYYY-MM-DD") >= moment().format("YYYY-MM-DD")) {
            done = log.data().done
          }
        })
        date = val.data().startingDate
      }
      


      let bubbles = new Array(10 - done % 10).fill(0);
      let bubbleList = bubbles.map((v, i) => {
        return (
          <TouchableOpacity key={i} onPress={() => {
            
            this.props.popBubble(val, date, done);
            this.props.playSoundTrack();

          }} style={{
            backgroundColor: val.data().color,
            height: 25,
            width: 25,
            borderRadius: 25,
            marginLeft: 10,
            marginBottom: 10,
          }}>
          </TouchableOpacity>
        )
      })
      return (
        <View key={i} style={{ backgroundColor: 'rgba(255,255,255,0.2)', margin: 5, borderRadius: 5,}}>
          <Card  transparent style={{ flex: 1, height: 90, width: "100%", flexDirection: "row", borderColor: "#DB4F6F", }} >
            <CardItem  style={{ flexDirection: "column", paddingBottom: -10, backgroundColor:"transparent"}}>
              <Left>
                {val.data().type == "Fitness" && <Image style={{ width: 35, height: 35 }} source={require('../../img/fitness.png')} />}
                {val.data().type == "Health" && <FontAwesome style={{ fontSize: 30 }} color="white" name="heart" />}
                {val.data().type == "Home" && <Entypo style={{ fontSize: 35 }} color="white" name="home" />}
                {val.data().type == "Hobbies" && <SimpleLineIcons style={{ fontSize:35 }} color="white" name="emotsmile" />}
                {val.data().type == "Work" && <FontAwesome style={{ fontSize: 35 }} color="white" name="book" />}
                {val.data().type == "Social" && <Ionicons style={{ fontSize: 35 }} color="white" name="ios-people" />}
                {val.data().type == "Network" && <Entypo style={{ fontSize: 35 }} color="white" name="network" />}
                {val.data().type == "Write My Own" && <MaterialIcons style={{ fontSize: 35 }} color="white" name="stars" />}
              </Left>
              <Right>
                <TouchableOpacity onPress={() => {
                  this.props.selectID(ID)
                  this.props.openEditing();
                }} style={{ backgroundColor: "#D63E61", width: 40, height: 20, borderRadius: 5, justifyContent: "center", alignItems: "center" }}><Text style={{ color: "white",fontSize:10 }}>Edit</Text></TouchableOpacity>
              </Right>
            </CardItem>
            <CardItem style={{ flex: 1, paddingTop: -10, paddingBottom: -10, backgroundColor: "transparent" }}>
              <View style={styles.bubbleContainer}>
                {bubbleList}
              </View>
            </CardItem>
            <CardItem style={{ alignItems: "flex-start", paddingBottom: -10, backgroundColor: "transparent"  }}>
              <View style={{ flexDirection: "column", }}>
                <View >
                  <Text style={{color:"white",fontSize:10}}>Goal</Text>
                </View>
                <View style={{ justifyContent:"center",alignItems:"center",marginTop:7}}>
                  <Text style={{ fontSize: 15, color: "white",fontWeight:"bold" }}>{val.data().goals}</Text>
                </View>
                <View style={{ justifyContent: "center", alignItems: "center",marginTop:7 }}>
                  <Text style={{ fontSize: 15, color: "white",fontWeight:"bold" }}>{done}</Text>
                </View>
                {val.data().goals <= done && <Ionicons style={styles.medal} name="ios-medal" color="#FCD116" />}
              </View>
            </CardItem>

          </Card>
        </View>)
  
      });
      return (
      <View>
        
        {this.props.isEditing ?
          <Editing key={this.props.selectedID}
            closeEditing={this.props.closeEditing}
            tryResetBubble={this.props.tryResetBubble}
            changeStatus={this.props.changeStatus}
            promises={this.props.promises}
            tryDeletePromise={this.props.tryDeletePromise}
            tryEditBubble={this.props.tryEditBubble}
            selectedID={this.props.selectedID} /> :
          <View>{dayList}</View>}
        

      </View>
    )
  }
}


const styles = StyleSheet.create({
  bubbleContainer: {
    paddingVertical: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginLeft:-10,
    backgroundColor:"transparent"
  },
  medal: {
    position: "absolute",
    fontSize: 15,
    right: -12,
    top:-8,
  },
})

export default Daily;