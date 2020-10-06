import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart,setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] =  useState(false);
    const history = useHistory()
    const handleProceedCheckout =()=>{
        //console.log('orderd placed');
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();
        history.push('/Shipment')
    }
    const removeProduct = (productKey)=>{
       // console.log('Remove clicked',productKey);
       const newCart= cart.filter(pd=> pd.key!==productKey);
       setCart(newCart);
       removeFromDatabaseCart(productKey);
    }

    useEffect(()=>{
        //cart
        const savedCart=getDatabaseCart();
        const productKeys = Object.keys(savedCart) ;

    const cartProduct= productKeys.map(key=>{
        const product = fakeData.find(pd=>pd.key===key);
        product.quantity= savedCart[key];
        return product;

    });
    setCart(cartProduct)
        
     //console.log(cartProduct);
    },[])

    let thankyou;
    if(orderPlaced){
        thankyou = <img src={happyImage} alt=""/>

    }


    return (
       
        <div className='twin-container'>
            <h1>cart Items:{cart.length}</h1>
            <div className='product-container'>
            {
               cart.map(pd=> <ReviewItem 
                key={pd.key}
                removeProduct={removeProduct}
                product={pd}></ReviewItem>)
           }
           {
               thankyou
           }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className='main-button'>Proceed Checkout</button>
                </Cart>

            </div>
          
        </div>
    );
};

export default Review;