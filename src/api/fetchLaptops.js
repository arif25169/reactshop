
import R from 'ramda';
import request from 'superagent';




export const fetchLaptops = async () => {
    // return new Promise(resolve =>{
    //     resolve(laptops);
    // });

    const { body } = await request.get('https://www.mocky.io/v2/5c7276743300007500760198');
    return body.laptops;
};

export const fetchLaptopById = async id => {
    const { body } = await request.get('https://www.mocky.io/v2/5c7276743300007500760198');
    let laptops = body.laptops;
    return new Promise((resolve, reject) => {
        // console.log("Id in api fetchLaptops " , id);
        const laptop = R.find(R.propEq('id', id), laptops);
        resolve(laptop);
    });
};

export const fetchCategories = async () => {
    // return new Promise(resolve =>{
    //     resolve(mockCategories);
    // });
    const { body } = await request.get('https://www.mocky.io/v2/5c726dac330000750076018c');
    return body.categories;
}