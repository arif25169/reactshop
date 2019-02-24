import R from 'ramda';


export const getLaptopsById = (state, id) => R.prop(id, state.laptop);


export const getLaptops = (state, ownProps) => {
    // const laptops = R.map(id=>getLaptopsById(state,id),state.LaptopsPage.ids);
    // return laptops;

    const activeCategoryId = getActiveCategoryId(ownProps);
    // console.log("activeCategoryId " , activeCategoryId);
    const applyCategory = (item) => {
        // console.log("Item ", item);

        return R.equals(
            activeCategoryId,
            R.prop('categoryId', item)
        );
    };
    const applySearch = (item) => {
        return R.contains(
            state.LaptopsPage.search,
            R.prop('name', item),
            // console.log(item)
        )
    };
    const laptops = R.compose(
        //   console.log(R.filter(applySearch)),
        R.filter(applySearch),
        R.when(R.always(activeCategoryId), R.filter(applyCategory)),
        R.map(id => getLaptopsById(state, id))
    )(state.LaptopsPage.ids);
    return laptops;
};

export const getRenderedLaptopLength = state => R.length(state.LaptopsPage.ids);

export const getTotalBasketPrice = state => {

    const laptops = R.map(id => getLaptopsById(state, id), state.Basket);
    //console.log("Laptops are " , laptops);
    let total = 0;
    return laptops.reduce((total, laptop) => {
        return total + laptop.price;
    }, total);
    // console.log("Laptop total is ", phnTotal);
};

export const getTotalBasketCount = state => {
    return state.Basket.length;
};

export const getCategories = (state) => {
    // console.log(" fething categories from state " ,R.values(state.Categories));
    return R.values(state.Categories);
};

export const getActiveCategoryId = ownProps => {
    // console.log("ownProps " , ownProps);
    return R.path(['params', 'id'], ownProps);
};

export const getBasketLaptopsWithCount = (state) => {
    const uniqueIds = R.uniq(state.Basket);

    const laptopCount = (id) => {
        return (
            R.compose(
                R.length,
                R.filter(basketId => R.equals(id, basketId))
            )(state.Basket)
        );
    };
    const laptopWithCount = (laptop) => {
        return R.assoc('count', laptopCount(laptop.id), laptop);
    };
    const laptops = R.compose(
        R.map(laptopWithCount),
        R.map(id => getLaptopsById(state, id))
    )(uniqueIds);
   // console.log("Laptops in basket are ", laptops);
    return laptops;
};

