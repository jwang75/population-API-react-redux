import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchWorld, fetchUSA} from '../actions/populationActions';


class PopulationToday extends React.Component{
	componentDidMount(){
		this.props.fetchWorld();
		this.props.fetchUSA();
	}

	render(){
		if(typeof this.props.USA === "undefined"){
			return (<div><p>afeasfsa</p></div>)
		}
		else{
			return(
				<div className="row">			
					<div className="panel panel-default col-md-6">
					  <div className="panel-heading">World Population As of today</div>
					  <div className="panel-body">
					    {this.props.World.total_population[0].population}
					  </div>
					</div>					
				    <div className="panel panel-default col-md-6">
						<div className="panel-heading">USA Population As of today</div>
						 <div className="panel-body">
						   {this.props.USA.total_population[0].population}
						 </div>
					</div>				
			    </div>
		    )
		}
	}
}


function mapStateToProps(state){
	return {
		World: state.population.worldPopulation,
		USA: state.population.usaPopulation
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		fetchWorld:fetchWorld,
		fetchUSA:fetchUSA
	}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(PopulationToday);


