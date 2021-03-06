import React, {Component} from 'react';
import {SkyLightStateless} from 'react-skylight';
import moment from "moment";
import {toggleModal, addHabitSite, toggleStatsModal, updateDailyRecordAdd} from "../actions/index";
import {addDailyRecord} from "../../../../../event/src/backendActions/index";
import { connect } from 'react-redux';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {approximateColor1ToColor2ByPercent, getRecordsModifiersStyles, getRecordsModifier} from "../helpers/index";


class HabitsTrackerHeader extends Component {
	constructor() {
		super();
		this.state = {webUrl: "", choice:0, duration:0, selectedDay: null, selectedCompleted: 0, selectedIncomplete: 0};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChoiceChange = this.handleChoiceChange.bind(this);
		this.handleWebUrlChange = this.handleWebUrlChange.bind(this);
		this.handleDurationChange = this.handleDurationChange.bind(this);
		this.handleDayClick = this.handleDayClick.bind(this);
    this.handleStatsPanel = this.handleStatsPanel.bind(this);
	};

	handleSubmit(event) {
		let atMost = (this.state.choice == 0);
		this.props.addHabitSite(this.state.webUrl, atMost, this.state.duration);

    if (this.props.pastRecords.length == 0) {
      if (atMost) {
        this.props.addDailyRecord(new moment(), 1, 0);
      }
      else {
        this.props.addDailyRecord(new moment(), 1, 0);
      }
    }
    else {
      this.props.updateDailyRecordAdd(new moment(), atMost);
    };

		this.props.toggleModal();
		event.preventDefault();
	};

	handleChoiceChange(event) {
		this.setState({choice: event.target.value});
	};

	handleWebUrlChange(event) {
		this.setState({webUrl: event.target.value});
	};

	handleDurationChange(event) {
		this.setState({duration: parseInt(event.target.value)});
	};

  handleDayClick(day) {
  	this.setState({
  		selectedDay: day,
  		selectedCompleted: 0,
  		selectedIncomplete: 0
  	});
    this.props.pastRecords.forEach(record => {
    	var dateObj = new moment(record.date);
    	if (dateObj.get('year') === day.getFullYear() && dateObj.get('month') === day.getMonth() && dateObj.get('date') === day.getDate()) {
    		this.setState({
    			selectedCompleted: record.completed,
    			selectedIncomplete: record.incomplete
    		})
    	}
    });
  };

  handleStatsPanel(event) {
    this.props.toggleStatsModal();
    this.setState({selectedDay:null});
  }

	render() {


		return (
		  <div>
	     	<button className="mdc-button mdc-ripple-upgraded mdc-theme--text-primary-on-dark" type="button" onClick={this.props.toggleModal}>
          <span className="fa fa-plus"></span>
        </button>
        <button className="mdc-button mdc-ripple-upgraded mdc-theme--text-primary-on-dark" type="button" style={{float:"right"}} onClick={this.props.toggleStatsModal}>
        	<span className="fa fa-calendar"></span>
        </button>

      	{/* MODAL FOR ADDING OF NEW SITE TO TRACK */}
				<SkyLightStateless
          isVisible={this.props.showAddSiteModal}
          onCloseClicked={this.props.toggleModal}
          onOverlayClicked={this.props.toggleModal}
          title="Add a new goal!"
        >	
        	<form onSubmit={this.handleSubmit}>
	          <div className="form-group">
	          	<label>Website address (a website that starts with "http://" or "https://")</label>
	          	<input type="url" className="form-control" onChange={this.handleWebUrlChange} placeholder="http://www.example.com" required pattern="https?://.+"/>
	          </div>
	          <div className="form-group">
	          	<label>This website is to be visited daily for: </label>
	          	<select value={this.state.choice} className="form-control" onChange={this.handleChoiceChange}>
	          		<option value="0">at most</option>
	          		<option value="1">at least</option>
	          	</select>
	          </div>
	          <div className="form-group">
	          	<label>Duration (in minutes)</label>
	          	<input type="number" className="form-control" onChange={this.handleDurationChange} placeholder="15" required/>
	          </div>
	          <button type="submit" className="btn btn-primary">Submit</button>	
	        </form>
	        
        </SkyLightStateless>

      	{/* MODAL FOR DISPLAYING OF STATISTICS */}
				<SkyLightStateless
          isVisible={this.props.showStatsModal}
          onCloseClicked={this.handleStatsPanel}
          onOverlayClicked={this.handleStatsPanel}
          title="Your progress for the past 42 days"
        >	
        	<div className="text-center">
  		      <DayPicker 
  		      	fixedWeeks 
  		      	canChangeMonth={false}
  		      	modifiers={getRecordsModifier(this.props.pastRecords)}
  		      	modifiersStyles={getRecordsModifiersStyles(this.props.pastRecords)} 
  		      	onDayClick={this.handleDayClick}
			      />
        		{this.state.selectedDay 
      				? (<p>On <strong>{this.state.selectedDay.toLocaleDateString()}</strong>,
      						you fulfilled <label style={{fontWeight: "bold", color: "green"}}>{this.state.selectedCompleted}</label> habits and
      						failed to fulfill <label style={{fontWeight: "bold", color: "red"}}>{this.state.selectedIncomplete}</label> habits.</p>)
      				: (<p>Nothing selected</p>)}			            
        	</div>
        </SkyLightStateless>

		  </div>
		)
	}
}


const mapStateToProps = state => {
  return {
  	showAddSiteModal: state.habitsTracker.showAddSiteModal,
  	showStatsModal: state.habitsTracker.showStatsModal,
  	pastRecords: state.habitsTracker.pastRecords,
  }
}

/**
  All moment (date) objects dispatched here will become a date string instead.
**/
const mapDispatchToProps = dispatch => {
  return {
    toggleModal: () => {
      dispatch(toggleModal());
    },
    toggleStatsModal: () => {
    	dispatch(toggleStatsModal());
    },
    addHabitSite: (url, atMost, duration) => {
    	dispatch(addHabitSite(url, atMost, duration));
    },
    updateDailyRecordAdd: (date, atMost) => {
    	dispatch(updateDailyRecordAdd(date, atMost));
    },
    addDailyRecord: (date, completed, incompleted) => {
      dispatch(addDailyRecord(date, completed, incompleted));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HabitsTrackerHeader)
