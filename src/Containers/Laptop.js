import React from 'react';
import { connect } from 'react-redux';
import { fetchLaptopById, addLaptopToBasket } from '../actions/Laptops';
import { getLaptopsById } from '../selectors/Laptops';
import R from 'ramda';
import BasketCart from './BasketCart';
import { Link } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

class Laptop extends React.Component {

    componentDidMount = () => this.props.fetchLaptopById(this.props.params.id);

    renderFields = () => {
        const { laptop } = this.props;
        const columnFields = R.compose(
            R.toPairs,
            R.pick([
                'cpu',
                'camera',
                'speed',
                'weight',
                'display',
                'battery',
                'memory'
            ])
        )(laptop);
        // console.log("columnFields ", columnFields);
        return columnFields.map(([key, value]) => {
            return (
                <div className='column' key={key}>
                    <div className='ab-details-title'>
                        <p className="details"> {key}:  </p>
                    </div>
                    <div className='ab-details-info'>
                        <p> {value} </p>
                    </div>
                </div>
            );

        });
    };

    renderContent = () => {
        const { laptop } = this.props;
        return (
            <div>
                <div className='thumbnail'>
                    <div className="col-md-6">
                        <img className='img-thumbnail'
                            src={laptop.image}
                            alt={laptop.name}
                        />

                    </div>
                    <div className="col-md-6">
                        {this.renderFields()}
                    </div>
                </div>
                <div className='caption-full'>
                    <h4 className='pull-right'>
                        ৳ {laptop.price}
                    </h4>
                    <h4>
                        {laptop.name}
                    </h4>
                    <p>
                        {laptop.description}
                    </p>
                </div>
            </div>
        );
    };

    renderSideBar = () => {

        const { laptop, addLaptopToBasket } = this.props;
        let addtocart = () => addLaptopToBasket(laptop.id);
        let notify = () => toast.info("🛒 Added To Cart");
        return (
            <div>
                <div>
                    <BasketCart />
                    <div className='form-group'>
                        <h1>{laptop.name}</h1>
                        <h2>৳{laptop.price}</h2>
                    </div>
                </div>
                <Link to="/"
                    className="btn btn-info btn-block">
                    Back to Store
                </Link>
                <button type="button"
                    className="btn btn-success btn-block"
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
            </div>
        );
    };

    render() {
        // console.log(this.props.laptop);
        const { laptop } = this.props;
        return (
            <div className='view-container'>
                <div className='container'>
                    <div className='col-md-9'>
                        {laptop && this.renderContent()}
                    </div>
                    <div className='col-md-3'>
                        {laptop && this.renderSideBar()}
                    </div>
                </div>
            </div>
        );
    }
}

// export default Laptop;
const mapDispatchtoProps = (dispatch) => ({
    fetchLaptopById: (id) => { dispatch(fetchLaptopById(id)) },
    addLaptopToBasket: (id) => { dispatch(addLaptopToBasket(id)) }
});

const mapStateToProps = (state) => ({
    laptop: getLaptopsById(state, state.LaptopPage.id)
});

export default connect(mapStateToProps, mapDispatchtoProps)(Laptop);