let initialState={
    trace1:{},
    trace2:{},
    trace:[],
    modalJobData: [],
    modalNewsData: [],
    modalTweetsData: [],
    getGraphClickCompany : "",
    setChangedLayout: [{ x: 0, y: 0, w: 5, h:3 },{ x: 6, y: 0, w: 5, h:3 }, { x: 0, y: 4, w: 5, h:3 }]
}

const dashboardReducer = (state=initialState,action) => {
    const {type,payload} = action;
    switch(type){
        case 'GET_DASHBOARD_DATA':
            return {
                ...state,
                trace: payload.trace
                // trace1: payload.trace1,
                // trace2: payload.trace2
            }
        case 'GET_DRILLDOWN_DATA':
            return {
                ...state,
                modalJobData: payload.modalJobData,
                modalNewsData: payload.modalNewsData,
                modalTweetsData: payload.modalTweetsData
            }
        case 'GET_GRAPH_CLICK':
            return {
                ...state,
                getGraphClickCompany: payload.selectCompany
            }
        case 'SET_LAYOUT':
            return {
                ...state,
                setChangedLayout: payload.layout
            }
        default:
            return state;
    }
}

export default dashboardReducer;