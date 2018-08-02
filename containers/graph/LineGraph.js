import React from 'react';
import { db } from '../../utils/db';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';
import moment from 'moment';
import { Ionicons } from "@expo/vector-icons";
import { Svg, Constants, Line } from 'expo';


class LineGraph extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: moment(),

    }
  }
  render() {
    const { monthRecord,maxGoals } = this.props;
    console.log(maxGoals);
    let labels = new Array(11).fill(0).map((val, i) => {
      return (
        <Svg.Text
          key={i}
          fill="white"
          stroke="none"
          fontSize="10"
          fontWeight="normal"
          x="0"
          y={(Dimensions.get("window").height / 2) - (i * 30)}
        // textAnchor="middle"
        >
          {i*10+"%"}
        </Svg.Text>
      )
    })
    let originDone = 0;
    let originGoal = 0

    monthRecord.forEach((val,i) => console.log(val))
    let lines = monthRecord.map((val, i) => {
      if (i > 0) {
        originDone = monthRecord[i - 1].done
        originGoal = monthRecord[i - 1].goals
      } else {
      }
      return (
        <Svg.G key={i}>

          <Svg.Line
            x1={i == 0 ? 25 : i * 50}
            x2={(i + 1) * 50}
            y1={(Dimensions.get('window').height / 2) - (originDone/maxGoals * 300)}
            y2={(Dimensions.get('window').height / 2) - (val.done/maxGoals * 300)}
            stroke="white"
            strokeWidth="2"
          > </Svg.Line>

          <Svg.Line
            x1={i == 0 ? 25 : i * 50}
            x2={(i + 1) * 50}
            y1={(Dimensions.get('window').height / 2) - (originGoal/maxGoals * 300)}
            y2={(Dimensions.get('window').height / 2) - (val.goals/maxGoals * 300)}
            stroke="lightgray"
            strokeWidth="2"
          > </Svg.Line>

          <Svg.Text
            fill="white"
            stroke="none"
            fontSize="10"
            fontWeight="bold"
            x={(i+1)*50}
            y={10}
            textAnchor="middle"
          >{`${val.done}/${val.goals}`}</Svg.Text>

        </Svg.G>
      )

    })

    let dates = monthRecord.map((val, i) => {

      return (
        <View key={i} style={{ marginLeft: 17, marginTop: 10, }}>
          <Text style={{ color: "white" }}>{moment(val.today).format("MM/D")}</Text>
        </View>
      )
    })

    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(255,255,255,0.2)', borderTopRightRadius: 5, borderTopLeftRadius: 5 }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.generateMonth(-1)}>
              <Ionicons name="ios-arrow-back" style={{ fontSize: 30, marginRight: 20, color: "white" }} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, color: "white" }}>{this.state.selectedDay.format('MMMM YYYY')}</Text>
            <TouchableOpacity onPress={() => this.generateMonth(1)}>
              <Ionicons name="ios-arrow-forward" style={{ fontSize: 30, marginLeft: 20, color: "white" }} />
            </TouchableOpacity>
            <View style={styles.lineContainer}>
              <View style={{ borderBottomWidth: 1, borderColor: "lightgray", width: 40 }}>
                <Text style={{ color: "white" }}>Goals</Text>
              </View>
              <View style={{ borderBottomWidth: 1, borderColor: "white", width: 40, marginTop: 5, }}>
                <Text style={{ color: "white" }}> Done</Text>
              </View>
            </View>
          </View>
        </View>
        <ScrollView horizontal>
            <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', paddingBottom: 20, paddingLeft: 20, borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
              <Svg height={Dimensions.get('window').height / 2} width={Dimensions.get('window').width + 500}>
                {labels}
                <Svg.Line
                  x1="25"
                  y1="0"
                  x2="25"
                  y2={(Dimensions.get('window').height / 2)}
                  stroke="white"
                  strokeWidth="2"
                />
                {lines}
                <Svg.Line
                  x1="25"
                  y1={(Dimensions.get('window').height / 2) - 1}
                  x2={Dimensions.get("window").width + 500}
                  y2={(Dimensions.get('window').height / 2) - 1}
                  stroke="white"
                  strokeWidth="2"
                />
              </Svg>



              <View style={{ flexDirection: "row", marginLeft: 20 }}>
                {dates}
              </View>
            </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:10
  },
  lineContainer: {
    position: "absolute",
    height: 80,
    right: -90,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
});



export default LineGraph;