import React from 'react';
import { connect } from 'react-redux';
import { fetchLaptops, fetchCategories } from '../actions/Laptops';
import { getLaptops } from '../selectors/Laptops';
import { Link } from 'react-router';
import R from 'ramda';
import { addLaptopToBasket } from '../actions/Laptops';
import { ToastContainer, toast } from 'react-toastify';


class Laptops extends React.Component {

    componentDidMount() {
        this.props.fetchLaptops();
        this.props.fetchCategories();
    }

    renderLaptop = (laptop, index) => {
        const { addLaptopToBasket } = this.props;
        const shortDesc = `${R.take(60, laptop.description)}...`;
        let addtocart = () => addLaptopToBasket(laptop.id);
        let notify = () => toast.info("🛒 Added To Cart");



        return (
            <div className='col-sm-4 col-lg-4 col-md-4 book-list' key={index}>
                <div className="thumbnail">
                    <img className='img-thumbnail'
                        src={laptop.image}
                        alt={laptop.name}
                    />
                </div>
                <div className="caption">
                    <h4 className="pull-right">
                        ৳ {laptop.price}
                    </h4>
                    <h4>
                        <Link to={`/Laptops/${laptop.id}`}>
                            {laptop.name}
                        </Link>
                    </h4>
                    <p> {shortDesc}</p>
                    <p className='itemButton'>
                        <button className="btn btn-primary"
                            // onClick={()=>addLaptopToBasket(laptop.id)}>
                            onClick={() => { addtocart(); notify() }}>

                            <ToastContainer
                                autoClose={1000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnVisibilityChange
                                draggable
                                pauseOnHover />
                            Add To Cart
                        </button>
                        <Link to={`/Laptops/${laptop.id}`}
                            className="btn btn-default">
                            Details
                        </Link>
                    </p>
                </div>
            </div>
        );
    };

    render() {
        const { laptops } = this.props;
        return (
            <div>
                <div className="books row">
                    {laptops.map((laptop, index) => {
                        return this.renderLaptop(laptop, index);
                    })}
                </div>
            </div>

        )
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchLaptops: () => dispatch(fetchLaptops()),
    addLaptopToBasket: (id) => dispatch(addLaptopToBasket(id)),
    fetchCategories: () => dispatch(fetchCategories())
});
//ownProps are available here because this component is defined directly on route.
//child componenets must include compose withRoutes
const mapStateToProps = (state, ownProps) => ({
    laptops: getLaptops(state, ownProps)
});

export default connect(mapStateToProps, mapDispatchToProps)(Laptops);