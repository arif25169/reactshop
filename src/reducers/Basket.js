import R from 'ramda';
const initialState = [];

export default (state=initialState,action)=>{
    switch(action.type){
        case 'ADD_LAPTOP_TO_BASKET':
        // console.log("Inside basket reducer");
        // console.log(R.append(action.payload,state))
        // console.log((state))
            return(
                R.append(action.payload,state)
               
            );
        case 'REMOVE_LAPTOP_FROM_BASKET':
            return(
                R.without(R.of(action.payload),state)
            );
        case 'CLEAN_BASKET':
            return initialState;
        default:
            return state;
    }
};