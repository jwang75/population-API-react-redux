import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleTable, fetchAllCountries, fetchEighteenCountry} from '../actions/populationActions';

class ShortestName extends React.Component{
	componentDidMount(){
		this.props.fetchAllCountries();
	}
	calculateShortestName(){
		if(this.props.allCountries.length>0){
			var minNum = this.props.allCountries[0].length;
			var countries = [];
			this.props.allCountries.forEach(function(countryArr){
				if(countryArr.length<minNum) minNum=countryArr.length;
			})
			this.props.allCountries.forEach(function(countryArr){
				if(countryArr.length==minNum) countries.push(countryArr);
			})
			return countries;

		}else{
			return [];
		}
	}

	calculateTotalPopulation(countries) {
		return countries.reduce(function(total, countryArr){
			return total+parseInt(countryArr.total);
		},0)
	}

	renderShortestCountry(){
		
		if(this.props.shortestCountryData.length==0){
			this.props.fetchEighteenCountry(this.calculateShortestName());
		}
		const countryList = this.props.shortestCountryData.map(function(countryArr){
			return (
				<tr key={countryArr.country}><td>{countryArr.country}</td><td>{countryArr.total}</td><td>{countryArr.males}</td><td>{countryArr.females}</td></tr>
			)
		})

		return (
			<div className="row">
				<div className="row">
					<div className="row content">
						<h4>Shortest Country Names</h4>
					</div>
					<div className="row content">
						<button onClick={this.handleClick.bind(this)} type="button" className="btn">Fetch</button>
					</div>
			    </div>
				<div className="row">
					<div className="col-md-7 content">
						<p>Total Population of countries: {this.calculateTotalPopulation(this.props.shortestCountryData)}</p>
					</div>
					<div className="col-md-3 content">
						<p>Number of countries: {this.props.shortestCountryData.length}</p>
					</div>
				</div>
				<table className="table">
				    <thead>
				      <tr>
				        <th>Country</th>
				        <th>Total Population</th>
				        <th>Male Population</th>
				        <th>Female Population</th>
				      </tr>
				    </thead>
				    <tbody>
				    	{countryList}
				    </tbody>
	 			</table>
 			</div>
		)
	}

	renderEmpty(){
		var that = this;
		return (
			<div className="row">
				<div className="row content">
					<h4>Shortest Country Names</h4>
				</div>
				<div className="row content">
					<button onClick={this.handleClick.bind(this)} type="button" className="btn">Fetch</button>
				</div>
			</div>
		)
	}

	handleClick(){
		this.props.toggleTable("show");
	}

	render(){
		if(this.props.table==="show"){
			return this.renderShortestCountry();
		}else{
			return this.renderEmpty();
		}
	}
}

function mapStateToProps(state){
	return {
		allCountries: state.population.allCountries,
		shortestCountryData: state.population.eighteenCountries,
		table: state.population.table
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		fetchAllCountries:fetchAllCountries,
		fetchEighteenCountry:fetchEighteenCountry,
		toggleTable:toggleTable
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ShortestName);
