"use strict"

import axios from 'axios';

export function toggleTable(context) {
	return {
		type: "TOGGLETABLE",
		payload: context
	}
}

export function fetchWorld() {
	const url = "http://api.population.io/1.0/population/World/today-and-tomorrow/";
	return function(dispatch){
		axios.get(url).then(function(response){
			dispatch({
				type:'FETCH_WORLD_POPULATION',
		        payload:response.data
		    })
		})
	}
}

export function fetchUSA() {
	const url = "http://api.population.io/1.0/population/United States/today-and-tomorrow/";
	return function(dispatch){
		axios.get(url).then(function(response){
			dispatch({
				type:'FETCH_USA_POPULATION',
		        payload:response.data
		    })
		})
	}
}

export function fetchAllCountries() {
	const url = "http://api.population.io/1.0/countries";
	return function(dispatch){
		axios.get(url).then(function(response){
			dispatch({
				type:'FETCH_ALL_COUNTRIES',
		        payload:response.data
		    })
		})
	}
}

export function fetchEighteenCountry(countries) {
	const countryPromise = countries.map(function(country){
		const url = "http://api.population.io:80/1.0/population/2017/"+country+"/18/";
		return axios.get(url);
	})
	return function(dispatch){
		axios.all(countryPromise).then(function(response){
			console.log(response);
		    var eighteenCountries = response.map(function(countryArr){
				return countryArr.data[0]
			})
			console.log(eighteenCountries);
			dispatch({
				type:"FETCH_EIGHTEEN_COUNTRY",
				payload:eighteenCountries
			})
		})

	}
}

export function fetchRanking(dob, country, sex) {
	const url = "http://api.population.io/1.0/wp-rank/"+dob+"/"+sex+"/"+country+"/today/";
	return function(dispatch){
		axios.get(url).then(function(response){
			dispatch({
				type:'FETCH_RANKING',
		        payload:response.data
		    })
		})
	}
}

export function clearRanking() {
	return {
		type: "CLEAR"
	}
}

