import React from "react"
// or
// import React, {Component} from "react"
import Clock from "./Clock"

// const App = () => {
//   let position = null
//   window.navigator.geolocation.getCurrentPosition(
//     position => console.log(position),
//     error => console.log(error)
//   )

//   return (
//     <div>
//       <h1>{position}</h1>
//       <Clock date={new Date()} />
//     </div>
//   )
// }

// HANDLING ASYNC WITH STATE:
class App extends React.Component {
  constructor(props) {
    super(props)
    // define a state
    this.state = {latitude: null, errorMessage: '', date: new Date}

  }

  isItWarm() {
    const {latitude} = this.state
    const month = new Date().getMonth()

    if(((month > 4 && month <= 9) && latitude > 0) || ((month <= 4 || month > 9) && latitude < 0) || latitude === 0) {
      return true
    } 
    return false
  }

  getClockIcon() {
    if(this.isItWarm()) {
      return "summer.png"
    }
    return "winter.png"
  }

  tick() {
    this.setState({date: new Date()})
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position =>this.setState({latitude: position.coords.latitude}),
      error => console.log({errorMessage: error.message})
    )

  }

  componentDidUpdate(prevState) {
    if(prevState.date !== this.state.date) {
      this.timerId = setInterval(() => this.tick(), 1000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }


  render() {
    const {latitude, errorMessage, date} = this.state
    return (
      <div>
        <h1>{latitude}</h1>
        {errorMessage || 
          <Clock 
            date={date}
            icon={latitude ? this.getClockIcon() : null} />}
      </div>
    )
  }
}

// or 
// class App extends Component

export default App
