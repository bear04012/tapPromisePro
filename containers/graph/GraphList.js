import React from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { Container, Header, Content, List, Left, Right, Icon, ListItem, Text } from 'native-base';
import Graph from './Graph';
import { Svg, Constants } from 'expo';

class GraphList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fitnessList: [],
      healthList: [],
      homeList: [],
      hobbiesList: [],
      workList: [],
      socialList: [],
      networkList: [],
      writeMyOwnList: [],
      promiseID: undefined,
      period:undefined,
    }

    this.selectID = this.selectID.bind(this);
    this.selectPeriod = this.selectPeriod.bind(this);
  }
  componentDidMount() {
    let fitnessList = []
    let healthList = []
    let homeList = []
    let hobbiesList= []
    let workList = []
    let socialList = []
    let networkList = []
    let writeMyOwnList = []
    this.props.promises.forEach((val) => {
      if (val.data().type == "Fitness") {
        fitnessList.push(val);
      } else if (val.data().type == "Health") {
        healthList.push(val)
      } else if (val.data().type == "Home") {
        homeList.push(val)
      } else if (val.data().type == "Hobbies") {
        hobbiesList.push(val)
      } else if (val.data().type == "Work") {
        workList.push(val)
      } else if (val.data().type == "Social") {
        socialList.push(val)
      } else if (val.data().type == "Network") {
        networkList.push(val)
      } else {
        writeMyOwnList.push(val);
      }
    })
    this.setState({
      fitnessList,
      healthList,
      homeList,
      hobbiesList,
      workList,
      socialList,
      networkList,
      writeMyOwnList
    })
  }

  selectID(ID) {
    this.setState({ promiseID: ID });
    this.props.openGraph();
  }

  selectPeriod(period) {
    this.setState({period})
  }

  render() {
    const { fitnessList, healthList, homeList, hobbiesList, workList, socialList, networkList, writeMyOwnList } = this.state;
    const {isGraphOpen,} = this.props;
    let fitnessTag = fitnessList.map((val, i) => {
      return (
      <ListItem key={i}>
          <TouchableOpacity onPress={() => {
            this.selectPeriod(val.data().period)
            this.selectID(val.id)
          }} style={{ flexDirection: "row" }}>
          <Left>
            <Text>{val.data().detail}</Text>
          </Left>
          <Right>
            <Icon style={{ color: "white" }} name="arrow-forward" />
          </Right>
        </TouchableOpacity>
      </ListItem>
      )
    })
    let healthTag = healthList.map((val, i) => {
      return (
        <ListItem key={i}>
          <TouchableOpacity onPress={() => {
            this.selectPeriod(val.data().period)
            this.selectID(val.id)
          }} style={{ flexDirection: "row" }}>
            <Left>
              <Text>{val.data().detail}</Text>
            </Left>
            <Right>
              <Icon style={{ color: "white" }} name="arrow-forward" />
            </Right>
          </TouchableOpacity>
        </ListItem>
      )
    })
    let homeTag = homeList.map((val, i) => {
      return (
        <ListItem key={i}>
          <TouchableOpacity onPress={() => {
            this.selectPeriod(val.data().period)
            this.selectID(val.id)
          }} style={{ flexDirection: "row" }}>
            <Left>
              <Text>{val.data().detail}</Text>
            </Left>
            <Right>
              <Icon style={{ color: "white" }} name="arrow-forward" />
            </Right>
          </TouchableOpacity>
        </ListItem>
      )
    })
    let hobbiesTag = hobbiesList.map((val, i) => {
      return (
        <ListItem key={i}>
          <TouchableOpacity onPress={() => {
            this.selectPeriod(val.data().period)
            this.selectID(val.id)
          }} style={{ flexDirection: "row" }}>
            <Left>
              <Text>{val.data().detail}</Text>
            </Left>
            <Right>
              <Icon style={{ color: "white" }} name="arrow-forward" />
            </Right>
          </TouchableOpacity>
        </ListItem>
      )
    })
    let workTag = workList.map((val, i) => {
      return (
        <ListItem key={i}>
          <TouchableOpacity onPress={() => {
            this.selectPeriod(val.data().period)
            this.selectID(val.id)
          }} style={{ flexDirection: "row" }}>
            <Left>
              <Text>{val.data().detail}</Text>
            </Left>
            <Right>
              <Icon style={{ color: "white" }} name="arrow-forward" />
            </Right>
          </TouchableOpacity>
        </ListItem>
      )
    })
    let socialTag = socialList.map((val, i) => {
      return (
        <ListItem key={i}>
          <TouchableOpacity onPress={() => {
            this.selectPeriod(val.data().period)
            this.selectID(val.id)
          }} style={{ flexDirection: "row" }}>
            <Left>
              <Text>{val.data().detail}</Text>
            </Left>
            <Right>
              <Icon style={{ color: "white" }} name="arrow-forward" />
            </Right>
          </TouchableOpacity>
        </ListItem>
      )
    })
    let networkTag = networkList.map((val, i) => {
      return (
        <ListItem key={i}>
          <TouchableOpacity onPress={() => {
            this.selectPeriod(val.data().period)
            this.selectID(val.id)
          }} style={{ flexDirection: "row" }}>
            <Left>
              <Text>{val.data().detail}</Text>
            </Left>
            <Right>
              <Icon style={{color:"white"}} name="arrow-forward" />
            </Right>
          </TouchableOpacity>
        </ListItem>
      )
    })
    let writeMyOwnTag = writeMyOwnList.map((val, i) => {
      return (
      <ListItem key={i}>
          <TouchableOpacity onPress={() => {
            this.selectPeriod(val.data().period)
            this.selectID(val.id)
          }} style={{ flexDirection: "row" }}>
          <Left>
            <Text>{val.data().detail}</Text>
          </Left>
          <Right>
            <Icon style={{ color: "white" }} name="arrow-forward" />
          </Right>
        </TouchableOpacity>
      </ListItem>
      )
    })
    return (
      <View>
        {!isGraphOpen ? (<List style={styles.container}>
          {fitnessTag.length > 0 &&
            <ListItem itemHeader first style={{ backgroundColor: 'rgba(255,255,255,0.4)',borderRadius:5 }}>
              <Text style={{ fontWeight: "bold",color:"white" }}>Fitness</Text>
            </ListItem>}
          {fitnessTag}
          {healthTag.length > 0 &&
            <ListItem itemHeader first style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}>
            <Text style={{ fontWeight: "bold", color: "white" }}>Health</Text>
            </ListItem>}
          {healthTag}
          {homeTag.length > 0 &&
            <ListItem itemHeader first style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}>
            <Text style={{ fontWeight: "bold", color: "white" }}>Home</Text>
            </ListItem>}
          {homeTag}
          {hobbiesTag.length > 0 &&
            <ListItem itemHeader first style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}>
            <Text style={{ fontWeight: "bold", color: "white" }}>Hobbies</Text>
            </ListItem>}
          {hobbiesTag}
          {workTag.length > 0 &&
            <ListItem itemHeader first style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}>
            <Text style={{ fontWeight: "bold", color: "white" }}>Work</Text>
            </ListItem>}
          {workTag}
          {socialTag.length > 0 &&
            <ListItem itemHeader first style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}>
            <Text style={{ fontWeight: "bold", color: "white" }}>Social</Text>
            </ListItem>}
          {socialTag}
          {networkTag.length > 0 &&
            <ListItem itemHeader first style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}>
            <Text style={{ fontWeight: "bold", color: "white" }}>Network</Text>
            </ListItem>}
          {networkTag}
          {writeMyOwnTag.length > 0 &&
            <ListItem itemHeader first style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}>
            <Text style={{ fontWeight: "bold", color: "white" }}>Write My Own</Text>
            </ListItem>}
          {writeMyOwnTag}
        </List>) : 
          <Graph promiseID={this.state.promiseID} period={this.state.period} />
      }
      </View>
    )   
  }
}

const styles = StyleSheet.create({
  container: {
    margin: -5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius:5
  }
})


export default GraphList;