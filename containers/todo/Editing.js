import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Picker, Form, Item, Label, Input, Segment, List, ListItem, Switch, Right, Body, Content, Button, Icon } from 'native-base';
import { FontAwesome, Entypo, SimpleLineIcons, Ionicons, MaterialIcons } from "@expo/vector-icons";

class Editing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      period: "",
      typeDetail: "",
      type: "",
      detail: "",
      color: "",
      goals: -1,
    }

    this.changeColor = this.changeColor.bind(this);
    this.changePeriod = this.changePeriod.bind(this);
  }

  componentDidMount() {
    let filteredPromise = this.props.promises.filter((val) => val.id == this.props.selectedID);
    let data = filteredPromise[0].data();
    let title;
    if (data.type == "Write My Own") {
      title = data.typeDetail;
    } else {
      title = data.type;
    }
    this.setState({
      period: data.period,
      typeDetail: data.typeDetail,
      type: data.type,
      detail: data.detail,
      color: data.color,
      goals:data.goals
    })
  }

  changePeriod(period) {
    this.setState({ period })
  }

  changeColor(color) {
    this.setState({ color });
  }

  render() {
    const { period, type, typeDetail, detail, goals, color } = this.state;
    let filteredPromise = this.props.promises.filter((val) => val.id == this.props.selectedID);
    let data = filteredPromise[0].data();
    let title;
    if (data.type == "Write My Own") {
      title = data.typeDetail;
    } else {
      title = data.type;
    }

    console.log("hello",this.state);
    
    return (
      <View>
        <List style={{ margin: -5, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 5 }} >
          <ListItem style={{ backgroundColor: 'rgba(255,255,255,0.4)', borderRadius:5 }} itemDivider>
            <Text style={{ color: "white", fontWeight: "bold" }}> Edit Promise Info </Text>
          </ListItem>
          <ListItem icon>
            <Body>
              <Text style={{ color: "white" }}>Select</Text>
            </Body>
            <Right>
              <Segment style={{ backgroundColor: "transparent" }}>
                <Button style={{
                  width: 80,
                  justifyContent: 'center',
                  backgroundColor: period == "Daily" ? "white" : "#DC617D",
                  borderColor: "white",
                }} onPress={() => this.changePeriod("Daily")} first active={period == "Daily"} >
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
          <Form>
            <Item picker style={{ marginLeft: 15, justifyContent: "space-between" }}>
              <Label style={{ color: "white" }}>Type:</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                placeholder="Type"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                textStyle={{ color: "white" }}
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
              (<Item stackedLabel last>
                <Label style={{ color: "white" }}>Write My Own</Label>
              <Input style={{color:"white"}} placeholder={typeDetail} placeholderTextColor="#DF607D" onChangeText={(text) => this.setState({ typeDetail: text })} />
              </Item>)}
            <Item stackedLabel last>
              <Label style={{ color: "white" }}>Ball Explanation</Label>
              <Input placeholder={detail} style={{color:"white"}} placeholderTextColor="#DF607D" onChangeText={(text) => this.setState({ detail: text })}/>
            </Item>
          </Form>
          <ListItem style={{ backgroundColor: 'rgba(255,255,255,0.4)', }} itemDivider>
            <Text style={{ color: "white", fontWeight: "bold" }}> Edit Ball</Text>
          </ListItem>
          <ListItem icon>
            <Label style={{color:"white"}}>Ball Color</Label>
          </ListItem>
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
          <ListItem style={{ backgroundColor: 'rgba(255,255,255,0.4)', }} itemDivider>
            <Text style={{ color: "white", fontWeight: "bold" }}> Reset/Complete</Text>
          </ListItem>
          <Form>
            <Item stackedLabel>
              <Label style={{ color: "white" }}>Goals</Label>
              <Input keyboardType="number-pad" style={{color:"white"}} placeholder={goals + ""} placeholderTextColor="#DF607D" onChangeText={(text) => this.setState({ goals: text })}/>
            </Item>
          </Form>
          <ListItem>
            <Button style={{ flex: 1, justifyContent: "center", alignItems: "center" }} light onPress={() => {
              this.props.tryEditBubble(this.props.selectedID, this.state);
              this.props.closeEditing();
            }}>
              <Text style={{ color: '#D63F5F' }}>Submit</Text>
            </Button>

          </ListItem>
          <ListItem>
            <Button style={{flex:1,justifyContent:"center",alignItems:"center"}} light onPress={() => {
              this.props.tryResetBubble(this.props.selectedID,this.state)
              this.props.closeEditing();
            }}>
              <Text style={{ color: '#D63F5F' }}>Reset</Text>
            </Button>
            <Button style={{ flex: 1, justifyContent: "center", alignItems: "center" }} light onPress={() => {
              this.props.tryDeletePromise(this.props.selectedID,this.state);
              this.props.closeEditing();
            }}>
              <Text style={{ color: '#D63F5F' }}>Completed</Text>
            </Button>
          </ListItem>
        </List>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    marginLeft: -15,
    marginTop: -10,
  },
  balls: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    paddingBottom: 15,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor:'silver',
  },
})

export default Editing;