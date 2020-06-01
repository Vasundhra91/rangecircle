import React from 'react';
import DropDown from '../layout/AircraftType'
import AirportCode from '../layout/AirportCode'
import WindAdjusted from '../layout/Wind'
import RangeSlider from '../layout/RangeSlider'
import GoogleMap from '../layout/GoogleMap'
import 'bootstrap-4-react';
import 'react-rangeslider/lib/index.css';


class App extends React.Component {
  state = { MaapData: [], selectedvalue: '', MapRangeValue: 0, AirportValue: 0 }
  ddloption = (id) => {
    this.setState({
      selectedvalue: id
    })
  }
  airportEnteredValue = (id) => {
    if (id !== undefined) {
      this.setState({
        AirportValue: id
      })
    } else {
      this.setState({
        AirportValue: 0
      })
    }
    // console.log("event"+ JSON.stringify(id))
  }
  sliderValue = (id) => {
    this.setState({
      MapRangeValue: id.value
    })
    console.log(this.state.selectedvalue+"tttt"+id.value)
  }
  handleClickEvent = () => {
    fetch('/users', {
      method: 'POST',
      body: JSON.stringify({ name: "run" }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(MaapData => this.setState({ MaapData }))
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error))
  }

  render() {
    //  console.log("M:" + JSON.stringify(this.state.MaapData));
    return (
      <>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-sm-12 col-md-12 col-xs-12 border table_header">
            < h2 >Range Master</h2 >
          </div>
        </div>
        <div className="row">
          <div style={{display:"none"}} className="col-lg-4 col-xl-4 col-md-4 col-xs-4 col-sm-4  border">
            <WindAdjusted />
          </div>
          <div className="col-lg-4 col-xl-4 col-md-4 col-xs-4 col-sm-4  border ">
            <DropDown ddlselectedoption={this.ddloption} />
          </div>
          <div className="col-lg-4 col-xl-4 col-md-4 col-xs-4 col-sm-4  border">
                <AirportCode airportSelectedValue={this.airportEnteredValue} />
              <div className="col-lg-1 col-xl-1 col-md-1 col-sm-1 col-xs-1 invisible ">
                <div className="form-group">
                  <input type="submit" value="Run EXE file" className="btn btn-primary" onClick={this.handleClickEvent} />
                </div> </div>
            </div>
          </div>
        <div className="row">
          <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8 border">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-sm-12 col-md-12 col-xs-12">
                <h4>Range (Sector Distance) NM</h4 >
              </div>
            </div>
              <RangeSlider rangevalue={this.state.selectedvalue} MapsliderValue={this.sliderValue} />
              <GoogleMap rangeArgvalue={this.state.MapRangeValue} firttimeRangeValue={this.state.selectedvalue} airportArgvalue={this.state.AirportValue} />
          </div>
        </div>
      </>
    );
  }
}
export default App;
