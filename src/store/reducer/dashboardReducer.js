let initialState={
    trace1:{},
    trace2:{},
    trace:[],
    modalJobData: [],
    modalNewsData: [],
    modalTweetsData: []
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
        default:
            return state;
    }
}

export default dashboardReducer;