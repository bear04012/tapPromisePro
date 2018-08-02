import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { Picker,Form,Item,Label,Input, Segment,List, ListItem,Switch, Right, Body, Content, Button, Icon } from 'native-base';
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import moment from 'moment'


class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today:this.props.today,
      period: "Daily",
      typeDetail: "",
      type:"",
      detail: "",
      color: "",
      goals: -1,
      startingDay: "",
      startingDate: -1,
      
    }
    this.changePeriod = this.changePeriod.bind(this);
    this.toggleEvery = this.toggleEvery.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.toggleDays = this.toggleDays.bind(this);
    this.toggleWeeks = this.toggleWeeks.bind(this);
  }
  changePeriod(period) {
    this.setState({period})
  }
  toggleEvery() {
    this.setState(prevState => ({every:!prevState.every}))
  }
  changeColor(color) {
    this.setState({ color });
  }
  toggleDays(num) {
    let newDays = [...this.state.days];
    newDays[num] = !this.state.days[num];
    this.setState({days:newDays})
  }
  toggleWeeks(num) {
    let newWeeks = [...this.state.weeks];
    newWeeks[num] = !this.state.weeks[num];
    this.setState({ weeks: newWeeks })
  }

  render() {
    const { period, type,typeDetail, detail, bubbles,goals, color,startingDay,startingDate } = this.state;
    const { tryAddPromise, changeMenu } = this.props;
    let cloneDay1 = moment().clone();
    let cloneDay2 = moment().clone();
    let cloneDay3 = moment().clone();
    let cloneDay4 = moment().clone();
    let cloneDay5 = moment().clone();
    let cloneDay6 = moment().clone();
    let cloneDay7 = moment().clone();

    
    // let monthClone = moment().clone();
    // let totalDays = parseInt(monthClone.add(1, 'month').set('date', 0).format('DD'));
    // let monthStartingDates = new Array(totalDays).fill(0).map((_, i) => {
    //   <Picker.Item key={i} label={i + 1 + ""} value={i+1}/>
    // })
    return (
      <Content style={styles.container}>
        <List style={{ backgroundColor: 'rgba(255,255,255,0.2)',borderRadius:5 }} >
          <ListItem style={{ backgroundColor: 'rgba(255,255,255,0.4)',borderRadius:5}} itemDivider>
            <Text style={{color:"white",fontWeight:"bold"}}> Today </Text>
          </ListItem>
          <ListItem >
            <Body>
              <Text style={{ color:"white"}}> {moment(this.props.today).format("MMM Do YY")} </Text>
            </Body>
          </ListItem>
          <ListItem style={{ backgroundColor: 'rgba(255,255,255,0.4)',}} itemDivider>
            <Text style={{ color: "white", fontWeight: "bold" }}> Select Period </Text>
          </ListItem>
          <ListItem icon>
            <Body>
              <Text style={{ color: "white" }}>Select</Text>
            </Body>
            <Right>
              <Segment color="white" style={{backgroundColor:"transparent",}}>
                <Button style={{
                  width: 80,
                  justifyContent: 'center',
                  backgroundColor: period == "Daily" ? "white" : "#DC617D",
                  borderColor: "white",
                }} onPress={() => this.changePeriod("Daily")} first active={period=="Daily"} >
                  <Text style={{ color: period == "Daily" ? "#D63F5F" : "white" }}>Daily</Text>
                </Button>
                <Button style={{
                  width: 80,
                  justifyContent: 'center',
                  backgroundColor: period == "Weekly" ? "white" : "#DC617D",
                  borderColor: "white",
                }} onPress={() => this.changePeriod("Weekly")} active={period == "Weekly"}>
                  <Text style={{ color: period == "Weekly" ? "#D63F5F" : "white" }}>Weekly</Text>
                </Button >
                <Button style={{
                  width: 80,
                  justifyContent: 'center',
                  backgroundColor: period == "Monthly" ? "white" : "#DC617D",
                  borderColor: "white",
                }} onPress={() => this.changePeriod("Monthly")} last active={period == "Monthly"} >
                  <Text style={{ color: period == "Monthly" ? "#D63F5F" : "white" }}>Monthly</Text>
                </Button>
              </Segment>
            </Right>
          </ListItem>  
          {/* <ListItem style={styles.list} icon>
            <Body>
              {period == "Daily" && <Text style={{ color: "white" }}>Every Day</Text>}
              {period == "Weekly" && <Text style={{ color: "white" }}>Every Week</Text>}
              {period == "Monthly" && <Text style={{ color: "white" }}>Every Month</Text>}
            </Body>
            <Right>
              <Switch onTintColor="white" onValueChange={this.toggleEvery} value={every} />
            </Right>
          </ListItem> */}
          {period == "Weekly" && 
            <Item picker style={{ marginLeft: 15, justifyContent: "space-between", }}>
              <Label style={{ color: "white" }}>Starting From:</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                placeholder="day"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                textStyle={{ color: "white" }}
                selectedValue={moment(startingDay).format("ddd")}
                onValueChange={(day) => this.setState({ startingDay: day })}
              >
                <Picker.Item label="Sun" value={cloneDay1.day(0).format()} />
                <Picker.Item label="Mon" value={cloneDay2.day(1).format()} />
                <Picker.Item label="Tue" value={cloneDay3.day(2).format()} />
                <Picker.Item label="Wed" value={cloneDay4.day(3).format()} />
                <Picker.Item label="Thu" value={cloneDay5.day(4).format()} />
                <Picker.Item label="Fri" value={cloneDay6.day(5).format()} />
                <Picker.Item label="Sat" value={cloneDay7.day(6).format()} />
              </Picker>
            </Item>
          }
          {period == "Monthly" &&
            <Item picker style={{ marginLeft: 15, justifyContent: "space-between", }}>
              <Label style={{ color: "white" }}>Starting From:</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                placeholder="date"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                textStyle={{ color: "white" }}
                selectedValue={startingDate}
                onValueChange={(date) => this.setState({ startingDate: date })}
              >
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2" value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
                <Picker.Item label="5" value={5} />
                <Picker.Item label="6" value={6} />
                <Picker.Item label="7" value={7} />
                <Picker.Item label="8" value={8} />
                <Picker.Item label="9" value={9} />
                <Picker.Item label="10" value={10} />
                <Picker.Item label="11" value={11} />
                <Picker.Item label="12" value={12} />
                <Picker.Item label="13" value={13} />
                <Picker.Item label="14" value={14} />
                <Picker.Item label="15" value={15} />
                <Picker.Item label="16" value={16} />
                <Picker.Item label="17" value={17} />
                <Picker.Item label="18" value={18} />
                <Picker.Item label="19" value={19} />
                <Picker.Item label="20" value={20} />
                <Picker.Item label="21" value={21} />
                <Picker.Item label="22" value={22} />
                <Picker.Item label="23" value={23} />
                <Picker.Item label="24" value={24} />
                <Picker.Item label="25" value={25} />
                <Picker.Item label="26" value={26} />
                <Picker.Item label="27" value={27} />
                <Picker.Item label="28" value={28} />
                <Picker.Item label="29" value={29} />
                <Picker.Item label="30" value={30} />
              </Picker>
            </Item>
          }
          <ListItem style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} itemDivider>
            <Text style={{ color: "white", fontWeight: "bold" }}> Make a Promise </Text>
          </ListItem>
          <Form style={{ marginTop: 5 }}>
            <Item picker style={{ marginLeft: 15, justifyContent: "space-between", }}>
              <Label style={{color:"white"}}>Type:</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                placeholder="Type"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                textStyle={{color:"white"}}
                selectedValue={type}
                onValueChange={(text) => this.setState({ type: text })}
              >
                <Picker.Item label="Fitness" value={"Fitness"} />
                <Picker.Item label="Health" value={"Health"} />
                <Picker.Item label="Home" value={"Home"} />
                <Picker.Item label="Hobbies" value={"Hobbies"} />
                <Picker.Item label="Work" value={"Work"} />
                <Picker.Item label="Social" value={"Social"} />
                <Picker.Item label="Network" value={"Network"} />
                <Picker.Item label="Write My Own" value={"Write My Own"} />
              </Picker>
            </Item>
            {type == "Write My Own" &&
              (<Item fixedLabel style={{ justifyContent: "space-between" }}>
              <Label style={{ color: "white" }}>Write My Own :</Label>
              <Input value={typeDetail} style={{color:"white"}} placeholderTextColor="#bfc6ea" onChangeText={(text) => this.setState({ typeDetail: text })} />
              </Item>)}
            <Item picker style={{ marginLeft: 15, justifyContent: "space-between" }}>
              <Label style={{ color: "white" }}>Goals</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                placeholder="Goals"
                placeholderStyle={{ color: "#bfc6ea" }}
                textStyle={{ color: "white" }}
                placeholderIconColor="#007aff"
                selectedValue={goals}
                onValueChange={(text) => this.setState({ goals: text })}
              >
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2" value={2} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="4" value={4} />
                <Picker.Item label="5" value={5} />
                <Picker.Item label="6" value={6} />
                <Picker.Item label="7" value={7} />
                <Picker.Item label="8" value={8} />
                <Picker.Item label="9" value={9} />
                <Picker.Item label="10" value={10} />
                <Picker.Item label="11" value={11} />
                <Picker.Item label="12" value={12} />
                <Picker.Item label="13" value={13} />
                <Picker.Item label="14" value={14} />
                <Picker.Item label="15" value={15} />
              </Picker>
            </Item>
            <Item fixedLabel style={{ justifyContent: "space-between" }} last>
              <Label style={{ color: "white" }}>Detail:</Label>
              <Input value={detail} style={{color:"white"}} placeholder="Meaning of Each Bubble" placeholderTextColor="#bfc6ea" onChangeText={(text)=> this.setState({detail:text})}/>
            </Item>
          </Form>
          <ListItem style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} itemDivider>
            <Text style={{ color: "white", fontWeight: "bold" }}> Edit Bubble </Text>
          </ListItem>
        
        <View style={{justifyContent:"center",alignItems:"center",marginTop:20}}>
          <Text style={{fontSize:15,color:'white'}}>The Bubble Color Should be</Text>
        </View>
          <View style={styles.balls}>
          {color == "#FFFFFF" ?
              (<View style={{ backgroundColor: "gray", borderRadius: 10 }}><View style={{ width: 20, height: 20, borderRadius: 20, backgroundColor: "#FFFFFF", margin: 10, }}></View></View>) :
              (<TouchableOpacity onPress={() => this.changeColor("#FFFFFF")} style={{ width: 20, height: 20, borderRadius: 20, backgroundColor: "#FFFFFF", margin: 10, }}></TouchableOpacity>)}
          {color == "#dd3f5f" ?
              (<View style={{ backgroundColor: "gray", borderRadius: 10 }}><View style={{ width: 20, height: 20, borderRadius: 20, backgroundColor: "#dd3f5f", margin: 10, }}></View></View>) :
              (<TouchableOpacity onPress={() => this.changeColor("#dd3f5f")} style={{ width: 20, height: 20, borderRadius: 20, backgroundColor: "#dd3f5f", margin: 10, }}></TouchableOpacity>)}
          {color == "#aec5e6" ?
              (<View style={{ backgroundColor: "gray", borderRadius: 10 }}><View style={{ width: 20, height: 20, borderRadius: 20, backgroundColor: "#aec5e6", margin: 10, }}></View></View>) :
              (<TouchableOpacity onPress={() => this.changeColor("#aec5e6")} style={{ width: 20, height: 20, borderRadius: 20, backgroundColor: "#aec5e6", margin: 10, }}></TouchableOpacity>)}
          {color == "#75c5b3" ?
              (<View style={{ backgroundColor: "gray", borderRadius: 10 }}><View style={{ width: 20, height: 20, borderRadius: 20, backgroundColor: "#75c5b3", margin: 10, }}></View></View>) :
              (<TouchableOpacity onPress={() => this.changeColor("#75c5b3")} style={{ width: 20, height: 20, borderRadius: 20, backgroundColor: "#75c5b3", margin: 10, }}></TouchableOpacity>)}
          {color == "#f2e093" ?
              (<View style={{ backgroundColor: "gray", borderRadius: 10 }}><View style={{ width: 20, height: 20, borderRadius: 20, backgroundColor: "#f2e093", margin: 10, }}></View></View>) :
              (<TouchableOpacity onPress={() => this.changeColor("#f2e093")} style={{ width: 20, height: 20, borderRadius: 20, backgroundColor: "#f2e093", margin: 10, }}></TouchableOpacity>)}
          {color == "#f2a9c9" ?
              (<View style={{ backgroundColor: "gray", borderRadius: 10 }}><View style={{ width: 20, height: 20, borderRadius: 20, backgroundColor: "#f2a9c9", margin: 10, }}></View></View>) :
              (<TouchableOpacity onPress={() => this.changeColor("#f2a9c9")} style={{ width: 20, height: 20, borderRadius: 20, backgroundColor: "#f2a9c9", margin: 10, }}></TouchableOpacity>)}
          {color == "#f7bb8a" ?
              (<View style={{ backgroundColor: "gray", borderRadius: 10 }}><View style={{ width: 20, height: 20, borderRadius: 20, backgroundColor: "#f7bb8a", margin: 10, }}></View></View>) :
              (<TouchableOpacity onPress={() => this.changeColor("#f7bb8a")} style={{ width: 20, height: 20, borderRadius: 20, backgroundColor: "#f7bb8a", margin: 10, }}></TouchableOpacity>)}
          {color == "#b0a7d1" ?
              (<View style={{ backgroundColor: "gray", borderRadius: 10 }}><View style={{ width: 20, height: 20, borderRadius: 20, backgroundColor: "#b0a7d1", margin: 10, }}></View></View>) :
              (<TouchableOpacity onPress={() => this.changeColor("#b0a7d1")} style={{ width: 20, height: 20, borderRadius: 20, backgroundColor: "#b0a7d1", margin: 10, }}></TouchableOpacity>)}
        </View>
        
        <View style={{justifyContent:"center",alignSelf:"center",marginBottom:20}}>
          <Button onPress={() => {
            if (type == "" || bubbles == -1 || detail == "" || color == "") return;
            tryAddPromise(this.state);
            changeMenu("Daily");
          }} style={{ width: 100, height: 40, justifyContent: "center", alignItems: "center",marginTop:10 }} light>
            <Text style={{ color: '#D63F5F', fontSize: 20 }}> Submit </Text>
          </Button>
          </View>
        </List>
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    marginLeft: -10,
    marginTop: -10,
    padding:5
  },

  day: {
    width: 40,
    justifyContent: "center",
    height:30,
  },
  week: {
    width: 70,
    justifyContent: "center",
    height:30,
  },
  balls: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    borderBottomWidth: 1,
    paddingBottom:15,
    borderColor:'silver'
  },
})

export default AddForm;