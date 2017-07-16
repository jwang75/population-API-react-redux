import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchAllCountries,clearRanking,fetchRanking} from '../actions/populationActions';

class Ranking extends React.Component{
	componentDidMount(){
		this.props.fetchAllCountries();
	}

	constructor(props) {
	    super(props);
	    this.state = {country: '', dob:'', sex:'male'};
	}

	countryChange(event) {
	  this.setState({country: event.target.value});
	}
	dobChange(event) {
	  this.setState({dob: event.target.value});
	}

	sexChange(event) {
	  this.setState({sex: event.target.value});
	}

	checkRanking() {
		var country = this.state.country;
		var dob = this.state.dob;
		var sex = this.state.sex;
		var date = new Date();
		var yearToday = date.getFullYear();
		var monthToday = date.getMonth()+1;
		var dateToday = date.getDate();
		var arr = dob.split('-');
		if(this.props.allCountries.indexOf(country)<0){
			alert("No country found, first character is capital")
		}else if(dob.length==0||arr[0]>yearToday||(arr[0]==yearToday&&arr[1]>monthToday)||(arr[0]==yearToday&&arr[1]==monthToday&&arr[2]>dateToday)){
			alert("wrong dob, maximum value is today")
		}else {
			this.props.fetchRanking(dob, country, sex);
		}
		
	}

	clear() {
		this.props.clearRanking();
	}

	render(){
		return(
			<div className="row">
				<div className="row">			
					<div className="row content">
						<h4>Check Your Ranking</h4>
					</div>			
				</div>
				<div className="row">
					<form>
						<div className="form-group col-md-4">
					      <label>Name:</label>
					      <input type="text" required value={this.state.country} onChange={this.countryChange.bind(this)} className="form-control" />
					    </div>
						<div className="form-group col-md-4">
							<label>Name:</label>
							<select value={this.state.sex} onChange={this.sexChange.bind(this)} className="form-control">
							    <option>male</option>
							    <option>female</option>
							</select>
						</div>
						<div className="form-group col-md-4">
					      <label>DOB:</label>
					      <input type="date" required value={this.state.dob} onChange={this.dobChange.bind(this)} className="form-control" />
					    </div>
					</form>
					
				</div>
				<div className="row">
					<div className="content col-md-6">
						<button type="button" className="btn btn-primary" onClick={this.checkRanking.bind(this)}>Check</button>
					</div>
					<div className="content col-md-6">
						<button type="button" className="btn btn-primary" onClick={this.clear.bind(this)}>Clear</button>
					</div>
				</div>
				<br /><br />
				<table className="table">
				    <thead>
				      <tr>
				      	<th>Country</th>
				        <th>DOB</th>
				        <th>Gender</th>
				        <th>You rank in the world</th>
				      </tr>
				    </thead>
				    <tbody>
				    	<tr>
					    	<td>{this.props.ranking.country}</td>
					    	<td>{this.props.ranking.dob}</td>
					    	<td>{this.props.ranking.sex}</td>
					    	<td>{this.props.ranking.rank}</td>
				    	</tr>
				    </tbody>
	 			</table>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		allCountries: state.population.allCountries,
		ranking: state.population.ranking,
		countries: state.population.countries
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		fetchRanking:fetchRanking,
		clearRanking:clearRanking,
		fetchAllCountries:fetchAllCountries
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Ranking);