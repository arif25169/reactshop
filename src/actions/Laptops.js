import {fetchLaptops as fetchLaptopsApi,
        fetchLaptopById as fetchLaptopByIdApi,
        fetchCategories  as fetchCategoriesApi}  from '../api/fetchLaptops';
import {getRenderedLaptopLength} from '../selectors/Laptops';

//console.log(fetchLaptopsApi)
export const fetchLaptops = ()=>{
     
    return async (dispatch) => {
        try{
            dispatch({
                type: 'FETCH_LAPTOP_START'
            });
            const laptops = await fetchLaptopsApi();
            dispatch({
                type: 'FETCH_LAPTOP_SUCCESS',
                payload: laptops
            });
        }catch(err){
            dispatch({
                type: 'FETCH_LAPTOP_FAIL',
                payload: err,
                error: true
            });
        };
    };
};

export const fetchCategories = ()=>{
    
    return async (dispatch,getState)=>{
        // console.log("Fetching entire state ", getState());
        try{
            dispatch({
                type: 'FETCH_CATEGORIES_START'
            });
            const categories = await fetchCategoriesApi();
            dispatch({
                type: 'FETCH_CATEGORIES_SUCCESS',
                payload: categories
            });
        }catch(err){
            dispatch({
                type: 'FETCH_CATEGORIES_FAILURE',
                payload: err,
                error: true
            });
        };
    };
}; 


export const fetchLaptopById = id=>{
    return async (dispatch,getState) => {
        const offset = getRenderedLaptopLength(getState());
        try{
            dispatch({
                type: 'FETCH_LAPTOP_BY_ID_START'
            });
            const laptop = await fetchLaptopByIdApi(id);
            dispatch({
                type: 'FETCH_LAPTOP_BY_ID_SUCCESS',
                payload: laptop
            });
        }catch(err){
            dispatch({
                type: 'FETCH_LAPTOP_BY_ID_FAILURE',
                payload: err,
                error: true
            });
        };
    };
};

export const addLaptopToBasket = id => dispatch => {
    dispatch({
        type: 'ADD_LAPTOP_TO_BASKET',
        payload: id
    });
};

export const searchLaptop = text => dispatch =>{
    console.log("searching ", text);
    dispatch({
        type: 'SEARCH_LAPTOP',
        payload: text
    })};

export const removeLaptopFromBasket = (id)=> async dispatch =>{
    dispatch({
        type: 'REMOVE_LAPTOP_FROM_BASKET',
        payload: id
    });
};   

export const cleanBasket = ()=>dispatch => {
    dispatch({
        type: 'CLEAN_BASKET'
    });
};

export const basketCheckout = (laptops)=> () =>{
    alert(JSON.stringify(laptops));
};