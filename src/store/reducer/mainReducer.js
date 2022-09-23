// import OntologyReducer from './ontologyReducer';
import dashboardReducer from './dashboardReducer';

import {combineReducers} from 'redux';


const MainReducer = combineReducers({
    // ontology: OntologyReducer,
    dashboard: dashboardReducer
    
})

export default MainReducer;