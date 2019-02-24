import React from 'react';
import {connect} from 'react-redux';
import { getTotalBasketPrice,getBasketLaptopsWithCount } from '../selectors/Laptops';
import R from 'ramda';
import {removeLaptopFromBasket,cleanBasket,basketCheckout} from '../actions/Laptops';
import {Link} from 'react-router';

const Basket = ({laptops,totalPrice,
                removeLaptopFromBasket,cleanBasket,
                basketCheckout})=>{
    // console.log(laptops);
    // console.log(totalPrice);
    const isBasketEmpty = R.isEmpty(laptops);
    const renderContent = () => {
        return (
            <div>
                {isBasketEmpty && <div> Your shopping cart is empty </div>}
                <div className="table-responsive">
                    <table className="table-bordered table-striped table-condensed cf">
                        <tbody>
                            {laptops.map((laptop,index)=>(
                                <tr key={index}
                                    className="item-checout">
                                    <td className="first-column-checkout">
                                        <img className="img-thumbnail"
                                            src={laptop.image}
                                            alt={laptop.name}  
                                        />
                                    </td>
                                    <td>{laptop.name}</td>
                                    <td>৳ {laptop.price}</td>
                                    <td>{laptop.count}</td>
                                    <td>
                                        <span className="delete-cart"
                                        onClick={()=>removeLaptopFromBasket(laptop.id)}></span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {
                    R.not(isBasketEmpty) &&
                    <div className="row">
                        <div className="pull-right total-user-checkout">
                            <b>Total: </b>
                            ৳{totalPrice}
                        </div>
                    </div>
                }
            </div>
            )
        };

        const renderSidebar = ()=>{
            return(
                <div>   
                    <Link
                        className="btn btn-info"
                        to="/"
                    >
                    <span className="glyphicon glyphicon-info-sign"/>
                    <span> Continue Shopping</span>
                    </Link>
                    {
                        R.not(isBasketEmpty) &&
                        <div>
                            <button className="btn btn-danger"
                                    onClick={()=>cleanBasket()}        
                            >
                            <span className="glyphicon glyphicon-trash"/>
                            Clean Cart
                            </button>
                            <button
                                className="btn btn-success"
                                onClick={()=>basketCheckout(laptops)}
                            >
                            <span className="glyphicon glyphicon-envelope"/>
                            Checkout
                            </button>
                        </div>
                    }
                </div>
            );
        };

    return(
        <div className="view-container">
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        {renderContent()}
                    </div>
                    <div className="col-md-3 btn-user-checkout">
                        {renderSidebar()}
                    </div>
                </div>
            </div>
        </div>
    );
    };


const mapStateToProps = (state)=>({
    laptops: getBasketLaptopsWithCount(state),
    totalPrice: getTotalBasketPrice(state)
});

const mapDispatchToProps = (dispatch)=>({
    removeLaptopFromBasket: (id)=>dispatch(removeLaptopFromBasket(id)),
    cleanBasket: ()=>dispatch(cleanBasket()),
    basketCheckout: (laptops)=>dispatch(basketCheckout(laptops))
});

export default connect(mapStateToProps,mapDispatchToProps)(Basket);