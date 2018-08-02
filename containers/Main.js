import React from 'react';
import { StyleSheet, Text,TouchableOpacity,View } from 'react-native';
import { Container, Header, Segment, Left,Right,Badge,Icon, Footer,FooterTab, Body, Content, Button, Animated,Easing } from 'native-base';
import { FontAwesome, Feather, Ionicons, Entypo } from "@expo/vector-icons";
import { Audio, LinearGradient } from 'expo';
import { db } from "../utils/db";
import Task from './todo/Task';
import GraphList from './graph/GraphList';
import Graph from './graph/Graph';
import AddForm from './AddForm';
import Loading from '../components/Loading';
import Setting from './Setting';
import moment from 'moment';
import Advertisement from './Advertisement';


class Main extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      today:moment(),
      user:this.props.user,
      menu: "Daily",
      promises: [],
      isLoading: true,
      selectedID: "",
      isEditing: false,
      footer: "Lists",
      graph: "Period",
      dailyLogs: [],
      weeklyLogs: [],
      monthlyLogs:[],
      allLogs: [],
      isGraphOpen: false,
      google: this.props.google,
    }

    this.playSoundTrack = this.playSoundTrack.bind(this);
    this.changeMenu = this.changeMenu.bind(this);
    this.tryAddPromise = this.tryAddPromise.bind(this);
    this.popBubble = this.popBubble.bind(this);
    this.tryDeletePromise = this.tryDeletePromise.bind(this);
    this.changeDay = this.changeDay.bind(this);
    this.changeWeek = this.changeWeek.bind(this);
    this.selectID = this.selectID.bind(this);
    this.openEditing = this.openEditing.bind(this);
    this.closeEditing = this.closeEditing.bind(this);
    this.tryResetBubble = this.tryResetBubble.bind(this);
    this.tryEditBubble = this.tryEditBubble.bind(this);
    this.changeFooter = this.changeFooter.bind(this);
    this.changeGraph = this.changeGraph.bind(this);
    this.openGraph = this.openGraph.bind(this);
    this.closeGraph = this.closeGraph.bind(this);
  }

  componentDidMount() {
    db.collection("todolist").where("uid", "==", this.props.user.uid)
      .get().then((querySnapshot) => {
        let promises = [];
        querySnapshot.forEach((doc) => promises.push(doc));
        this.setState({ promises, isLoading: false });
      }).catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    db.collection("log").where("today", "==", moment().format("YYYY-MM-DD"))
      .get().then((querySnapshot) => {
        let dailyLogs = [];
        querySnapshot.forEach((doc) => {
          dailyLogs.push(doc)
        });
        this.setState({ dailyLogs })
      }).catch(function (error) {
        console.log("Error getting documents: ", error);
      })
    db.collection("weeklyLogs").where("today", ">=", moment().subtract(7,'day').format("YYYY-MM-DD"))
      .get().then((querySnapshot) => {
        let weeklyLogs = [];
        querySnapshot.forEach((doc) => {
          weeklyLogs.push(doc)
        });
        this.setState({weeklyLogs})
      })
    db.collection("monthlyLogs").where("today", ">=", moment().subtract(1,'month').format("YYYY-MM-DD"))
      .get().then((querySnapshot) => {
        let monthlyLogs = [];
        querySnapshot.forEach((doc) => {
          monthlyLogs.push(doc)
        });
        this.setState({ monthlyLogs })
      })
    
    let DailyPromise = db.collection("log").get()
    let WeeklyPromise = db.collection("weeklyLogs").get()
    let MonthlyPromise = db.collection("monthlyLogs").get()
    Promise.all([DailyPromise, WeeklyPromise, MonthlyPromise]).then((values) => {
      let allLogs = [];
      values.forEach((querySnapshot,i) => {
        querySnapshot.forEach((doc, i) => {
          allLogs.push(doc);
        })
      })
      this.setState({
        allLogs
      })
    })
  }

  openGraph() {
    this.setState({isGraphOpen:true})
  }
  closeGraph() {
    this.setState({isGraphOpen:false})
  }
  changeGraph(menu) {
    this.setState({graph:menu})
  }
  changeFooter(menu) {
    this.setState({footer:menu})
  }
  selectID(selectedID) {
    this.setState({ selectedID })
  }

  changeDay(day) {
    this.setState({day})
  }

  changeWeek(week) {
    this.setState({week})
  }
  openEditing() {
    this.setState({ isEditing: true });
  }
  closeEditing() {
    this.setState({ isEditing: false });
  }

  async playSoundTrack() {
    const soundObject = new Audio.Sound();
    try {
      console.log("played")
      await soundObject.loadAsync(require('../components/mp3/pop.wav'));
      await soundObject.playAsync();
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  }

  changeMenu(menu) {
    this.setState({menu})
  }

  tryEditBubble(id, obj) {
    db.collection("todolist").doc(id).update({
      period: obj.period,
      typeDetail: obj.typeDetail,
      type: obj.type,
      detail: obj.detail,
      color: obj.color,
      goals:obj.goals,
    }).then(() => {
      let promises = this.state.promises.map((val) => {
        if (val.id != id) {
          return (val);
        } else {
          return {
            id: id,
            data: function () {
              return {
                ...val.data(),
                period: obj.period,
                typeDetail: obj.typeDetail,
                type: obj.type,
                detail: obj.detail,
                color: obj.color,
                goals: obj.goals,
              }
            }
          }
        }
      })
      this.setState({ promises });
      console.log("Document successfully updated!");
      })
      .catch((e) => (
        console.error("Error updating document: ", e)
      ))
  }

  popBubble(obj, timestamp, done) {
    
    let data = {};
    data.completed = false;
    data.done = ++done;
    data.uid = this.state.user.uid
    if (obj.data().goals <= done) {
      data.completed = true;
      let update = {};
      // this.setState(prev => {
      //   update.completed = prev.completed+1
      //   return { completed: prev.completed + 1 }
      // },
      //   () => {
      //     db.collection("users").doc(this.state.user.uid).update(update)
      // })
    }
    data.id = obj.id;
    data.today = moment(timestamp).format("YYYY-MM-DD");
    data.goals = obj.data().goals;
    let doc = { data: () => data };
    console.log(doc.data().goals)
    
    if (obj.data().period == "Daily") {
      this.setState(prev => {
        if (done == 1) {
          return {
            dailyLogs: [...prev.dailyLogs, doc]
          }
        } else {
          return {
            dailyLogs: prev.dailyLogs.map(l => {
              if (l.data().id === obj.id) {
                return doc;
              } else {
                return l;
              }
            })
          }
        }
      }, () => {
        db.collection("log").where("id", "==", obj.id).where("today", "==", moment(timestamp).format("YYYY-MM-DD"))
          .get().then((querySnapshot) => {
            let ID;
            // querySnapshot.forEach((doc) => { ID = doc.id; })
            if (querySnapshot.size > 0)
              ID = querySnapshot.docs[0].id
            console.log(ID);
            if (!!ID) {
              db.collection("log").doc(ID).update(data)
            } else {
              db.collection("log").add(data)
            }
          })
      });
      
    } else if (obj.data().period == "Weekly") {
      this.setState(prev => {
        if (done == 1) {
          return {
            weeklyLogs: [...prev.weeklyLogs, doc]
          }
        } else {
          return {
            weeklyLogs: prev.weeklyLogs.map(l => {
              if (l.data().id === obj.id) {
                return doc;
              } else {
                return l;
              }
            })
          }
        }
      }, () => {
        db.collection("weeklyLogs").where("id", "==", obj.id).where("today", ">=", moment().subtract(7, 'day').format("YYYY-MM-DD"))
          .get().then((querySnapshot) => {
            let ID;

            if (querySnapshot.size > 0)
              ID = querySnapshot.docs[0].id
            console.log(ID);

            if (!!ID) {
              db.collection("weeklyLogs").doc(ID).update(data)
              // .then(() => {
              //   let doc = { id: ID, data: () => data };
              // this.setState(prevState => ({ logLists: [...prevState.logLists, doc] }));

              // })
            } else {
              db.collection("weeklyLogs").add(data)
              // .then((docRef) => {
              //   console.log("Document successfully updated!");
              // let doc = { id: docRef.id, data: () => data };
              // this.setState(prevState => ({ logLists: [...prevState.logLists, doc] }));
              // })
            }
          })
      })
    } else {
      this.setState(prev => {
        if (done == 1) {
          return {
            monthlyLogs: [...prev.monthlyLogs, doc]
          }
        } else {
          return {
            monthlyLogs: prev.monthlyLogs.map(l => {
              if (l.data().id === obj.id) {
                return doc;
              } else {
                return l;
              }
            })
          }
        }
      }, () => {
        db.collection("monthlyLogs").where("id", "==", obj.id).where("today", ">=", moment().subtract(1, 'month').format("YYYY-MM-DD"))
          .get().then((querySnapshot) => {
            let ID;

            if (querySnapshot.size > 0)
              ID = querySnapshot.docs[0].id
            console.log(ID);

            if (!!ID) {
              db.collection("monthlyLogs").doc(ID).update(data)
              // .then(() => {
              //   let doc = { id: ID, data: () => data };
              // this.setState(prevState => ({ logLists: [...prevState.logLists, doc] }));

              // })
            } else {
              db.collection("monthlyLogs").add(data)
              // .then((docRef) => {
              //   console.log("Document successfully updated!");
              // let doc = { id: docRef.id, data: () => data };
              // this.setState(prevState => ({ logLists: [...prevState.logLists, doc] }));
              // })
            }
          })
      })
    }
  }
  tryResetBubble(id, obj) {
    let data = {};
    data.done = 0;
    let doc = { data: () => data };
    if (obj.period == "Daily") {
      this.setState(prev => {
        return {
          dailyLogs: prev.dailyLogs.map(l => {
            if (l.data().id === id) {
              return doc;
            } else {
              return l;
            }
          })
        }
      }, () => {
        db.collection("log").where("id", "==", id).where("today", "==", moment().format("YYYY-MM-DD"))
          .get().then((querySnapshot) => {
            let ID;
            // querySnapshot.forEach((doc) => { ID = doc.id; })
            if (querySnapshot.size > 0)
              ID = querySnapshot.docs[0].id
            db.collection("log").doc(ID).update(data)
          })
      });
    } else if (obj.period == "Weekly") {
      this.setState(prev => {
        return {
          weeklyLogs: prev.weeklyLogs.map(l => {
            if (l.data().id === id) {
              return doc;
            } else {
              return l;
            }
          })
        }
      }, () => {
        db.collection("weeklyLogs").where("id", "==", id).where("today", ">=", moment().subtract(7, 'day').format("YYYY-MM-DD"))
          .get().then((querySnapshot) => {
            let ID;
            // querySnapshot.forEach((doc) => { ID = doc.id; })
            if (querySnapshot.size > 0)
              ID = querySnapshot.docs[0].id
            db.collection("weeklyLogs").doc(ID).update(data)
          })
      });
    } else {
      this.setState(prev => {
        return {
          monthlyLogs: prev.monthlyLogs.map(l => {
            if (l.data().id === id) {
              return doc;
            } else {
              return l;
            }
          })
        }
      }, () => {
        db.collection("monthlyLogs").where("id", "==", id).where("today", ">=", moment().subtract(1, 'month').format("YYYY-MM-DD"))
          .get().then((querySnapshot) => {
            let ID;
            // querySnapshot.forEach((doc) => { ID = doc.id; })
            if (querySnapshot.size > 0)
              ID = querySnapshot.docs[0].id
            db.collection("monthlyLogs").doc(ID).update(data)
          })
      });
    }

  }

  tryDeletePromise(id) {
    db.collection("todolist").doc(id).delete().then(() => {
      let promises = this.state.promises.filter((val) => (val.id != id))
      this.setState({promises})
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
    
    db.collection("log").where("id", "==", id)
    .get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        db.collection("log").doc(doc.id).delete();
        })
      })
    db.collection("weeklyLogs").where("id", "==", id)
      .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          db.collection("weeklyLogs").doc(doc.id).delete();
        })
      })
    db.collection("monthlyLogs").where("id", "==", id)
      .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          db.collection("monthlyLogs").doc(doc.id).delete();
        })
      })
    
  }

  tryAddPromise(obj) {
    let data = {
      uid: this.state.user.uid,
      period: obj.period,
      type: obj.type,
      detail: obj.detail,
      color: obj.color,
      goals:obj.goals,
      typeDetail: obj.typeDetail,
      startingDay: moment(obj.startingDay).format("YYYY-MM-DD"),
      startingDate: moment().set('date', obj.startingDate).format("YYYY-MM-DD")
    };
    db.collection("todolist").add(data)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        let newDoc = {
          id: docRef.id,
          data: () => data
        }
        this.setState(prevState => ({ promises: [...prevState.promises, newDoc] }));
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  }

  render() {
    const { menu, promises, isLoading, footer, selectedID, dailyLogs, allLogs,weeklyLogs,monthlyLogs } = this.state;
    let pinks = ['#e05773', '#df5773', '#7c5773'];
    let blues = ['#175673','#5f5773','#435735']
    return (
      
      <Container>
        <LinearGradient
          colors={pinks}
          start={[0, 0]}
          end={[1,1]}
          style={{
            left: 0,
            right: 0,
            top: 0,
            height: "100%",
          }}>
        <Header transparent hasSegment style={{height:80}}>
          <Left>
            {(this.state.menu == "Add Form" || this.state.menu == "Setting") &&
              (<TouchableOpacity style={styles.back} onPress={() => this.changeMenu("Daily")}>
                <Ionicons name="ios-arrow-back" color="white" style={{ fontSize: 30 }} />
              </TouchableOpacity>)}
            {/* {((this.state.menu == "Daily" || this.state.menu == "Weekly" || this.state.menu == "Monthly")&&(!this.state.isEditing)) &&
              (<TouchableOpacity onPress={() => this.changeMenu("Setting")}>
                <Feather name="settings" style={{ fontSize: 25,marginLeft:5 }} />
              </TouchableOpacity>)
            } */}
            {(this.state.isEditing) &&
              (<TouchableOpacity style={styles.back} onPress={() => this.closeEditing()}>
                <Ionicons name="ios-arrow-back" color="white" style={{ fontSize: 30 }} />
              </TouchableOpacity>)}
            {(this.state.isGraphOpen && this.state.footer=="GraphList") && 
              <TouchableOpacity onPress={this.closeGraph} style={styles.back} >
                <Ionicons name="ios-arrow-back" color="white" style={{ fontSize: 30 }} />
              </TouchableOpacity>
            }
          </Left>
          <Body>
            {((this.state.menu == "Daily" || this.state.menu == "Weekly" || this.state.menu == "Monthly")&&this.state.footer=="Lists" &&this.state.isEditing==false) &&
              (<Segment color="white" style={{backgroundColor:"transparent"}}>
                <Button style={{
                  width: 70,
                  justifyContent: 'center',
                  backgroundColor: this.state.menu == "Daily" ? "white" : 'rgba(255,255,255,0.2)',
                  borderColor: "white",
                }} onPress={() => this.changeMenu("Daily")} first active={this.state.menu == "Daily"} >
                  <Text style={{ color: this.state.menu == "Daily" ? "#D63F5F" : "white",fontFamily:"noto-sans-bold",fontSize:12}}>Daily</Text>
                </Button>
                <Button style={{
                  width: 70,
                  justifyContent: 'center',
                  backgroundColor: this.state.menu == "Weekly" ? "white" : 'rgba(255,255,255,0.2)',
                  borderColor: "white",
                }} onPress={() => this.changeMenu("Weekly")} active={this.state.menu == "Weekly"} >
                  <Text style={{ color: this.state.menu == "Weekly" ? "#D63F5F" : "white", fontFamily: "noto-sans-bold", fontSize: 12}}>Weekly</Text>
                </Button >
                <Button style={{
                  width: 70,
                  justifyContent: 'center',
                  backgroundColor: this.state.menu == "Monthly" ? "white" : 'rgba(255,255,255,0.2)',
                  borderColor: "white",
                }} onPress={() => this.changeMenu("Monthly")} last active={this.state.menu == "Monthly"}  >
                  <Text style={{ color: this.state.menu == "Monthly" ? "#D63F5F" : "white", fontFamily: "noto-sans-bold", fontSize: 12 }}>Monthly</Text>
                </Button>
              </Segment>)}
              {this.state.menu == "Add Form" && (<Text style={{ color: "white", fontFamily: "noto-sans-bold", fontSize: 15 }}> Add Form </Text>)}
              {this.state.footer == "User" && <Text style={{ color: "white", fontFamily: "noto-sans-bold", fontSize: 15 }}> User </Text>}
            {/* {(this.state.isGraphOpen && this.state.footer=="GraphList") && 
              (<Segment>
                <Button style={styles.segment} onPress={() => this.changeGraph("Period")} first active={this.state.graph == "Period"} >
                  <Text>Period</Text>
                </Button>
                <Button style={styles.segment} onPress={() => this.changeGraph("Type")} last active={this.state.graph == "Type"} >
                  <Text>Type</Text>
                </Button>
              </Segment>)} */}
              {this.state.isEditing && <Text style={{ color: "white", fontFamily: "noto-sans-bold", fontSize: 15  }}>Edit Form</Text>}
              {(this.state.footer == "GraphList" && !this.state.isGraphOpen) && <Text style={{ color: "white", fontFamily: "noto-sans-bold", fontSize: 15  }}>Graph List</Text>}
              
            }
            
          </Body>
          <Right>
            {((this.state.menu == "Daily" || this.state.menu == "Weekly" || this.state.menu == "Monthly")&&(!this.state.isEditing)&&(this.state.footer=="Lists"))  && 
              (<TouchableOpacity onPress={() => this.changeMenu("Add Form")}>
                <Feather name="plus" color="white" style={{ fontSize: 30 }} />
              </TouchableOpacity>)}
            
          </Right>
        </Header>
        
        
        {isLoading &&
          <Content>
            <Loading />
          </Content>
        }

        {!isLoading &&
            <Content padder>
          {( footer == "Lists") && <Task key={promises.length}
            promises={promises.filter((val) => val.data().period == this.state.menu)}
            dailyLogs={dailyLogs}
            weeklyLogs={weeklyLogs}
            monthlyLogs={monthlyLogs}
            popBubble={this.popBubble}
            today={this.state.today}
            tryDeletePromise={this.tryDeletePromise}
            playSoundTrack={this.playSoundTrack}
            selectID={this.selectID} menu={this.state.menu}
            openEditing={this.openEditing}
            selectedID={selectedID}
            isEditing={this.state.isEditing}
            closeEditing={this.closeEditing}
            tryResetBubble={this.tryResetBubble}
            tryEditBubble={this.tryEditBubble}
            changeMenu={this.changeMenu} />}
            {footer == "User" && <Setting allLogs={this.state.allLogs.filter((val) => val.data().uid == this.state.user.uid)} google={this.state.google} user={this.state.user} />}  
            {footer == "GraphList" && <GraphList isGraphOpen={this.state.isGraphOpen} openGraph={this.openGraph} closeGraph={this.closeGraph} promises={promises}/>}
            {menu == "Add Form" && <AddForm tryAddPromise={this.tryAddPromise} changeMenu={this.changeMenu} today={this.state.today} />}
            <Advertisement />
          </Content>
        }

          {((menu == "Daily" || menu == "Weekly" || menu == "Monthly") && (this.state.isEditing == false)) && <Footer style={{ borderColor: "transparent", height: 60, backgroundColor: 'rgba(255,255,255,0.2)'}}>
          <FooterTab style={{backgroundColor:"transparent"}} >
              <Button style={{ borderRadius:0,height: '100%', backgroundColor: footer == "Lists" ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)'}} onPress={() => {
              this.changeFooter("Lists")
              this.closeGraph();
            }} active={footer == "Lists"} badge vertical>
            
              <Feather style={{ fontSize: 30 }} color="white" name="list" />
              <Text style={{color:"white"}}>Lists</Text>
            </Button>
              <Button style={{ borderRadius: 0, height:'100%',backgroundColor: footer == "GraphList" ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)' }} onPress={() => this.changeFooter("GraphList")} active={footer == "GraphList"} vertical>
              <Entypo style={{ fontSize: 25 }} color="white" name="bar-graph" />
              <Text style={{ color: "white" }}>Graph</Text>
            </Button>
              <Button style={{ borderRadius: 0, height: '100%', backgroundColor: footer == "User" ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)' }} onPress={() => {
              this.changeFooter("User")
              this.closeGraph();
            }} active={footer == "User"} badge vertical>
             
              <Icon style={{ fontSize: 30,color:"white" }} name="person" />
              <Text style={{ color: "white" }}>User</Text>
            </Button>
          </FooterTab>
        </Footer> }
        
        </LinearGradient>
      </Container>
      
      
    )
  }
}


const styles = StyleSheet.create({
  segment: {
    width: 70,
    justifyContent: 'center',
    backgroundColor: "#DC617D",
    borderColor: "white",
  },
  back: {
    marginLeft: 10,
    height: 30,
    width: 30,
    paddingLeft:10,
    paddingRight: 10,
  },
  footerButton: {
    backgroundColor: "transparent",
  }


})

export default Main;