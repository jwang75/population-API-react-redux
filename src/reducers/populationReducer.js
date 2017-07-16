export default function(state={table:'hide',eighteenCountries:[], ranking:{dob:'',country:'',sex:''}}, action) {
	switch(action.type){
        case 'TOGGLETABLE':
            return {...state, table:action.payload}
            break;
		case 'FETCH_WORLD_POPULATION':
			return {...state, worldPopulation:action.payload}
			break;
		case 'FETCH_USA_POPULATION':
            return {...state, usaPopulation:action.payload}
            break;
        case 'FETCH_ALL_COUNTRIES':
            return {...state, allCountries:[...action.payload.countries]}
            break;
        case 'FETCH_EIGHTEEN_COUNTRY':
            return {...state, eighteenCountries:[...action.payload]}
            break;  
        case 'FETCH_RANKING':
            return {...state, ranking:action.payload}
            break;  
        case 'CLEAR':
            return {...state, ranking:{dob:'',country:'',sex:''}}
            break;
	}

	return state;
}