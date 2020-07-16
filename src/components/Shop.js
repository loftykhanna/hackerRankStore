import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import RightPanel from './rightPanel';
import LeftPanel from './leftPanel';

const Shop = (props) => {
    const { items } = props
    const [cart, setCart] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [coupon, setCoupon] = useState(0);

    const updateCart = (action, item)=>{
        let updatedTask  = false;

        let newCart =  cart.map((cartItem)=>{
                if(cartItem.name == item.name){
                    updatedTask = true;
                    cartItem.quantity = action == 'add'? cartItem.quantity + 1 :  cartItem.quantity - 1;
                    if(cartItem.quantity != 0){
                        return cartItem
                    }

                } else
                return cartItem
            }).filter((item)=> !!item)

            if(updatedTask) return newCart
            if(action === 'add')
            return [...newCart, {
                name : item.name,
                totalPrice : item.price,
                quantity : 1
            }];

            return newCart


    }


    const addItem = (item) => {
    console.log(item)

    setCart(prevCart => {
        if(prevCart.length == 0){
            return [{
                name : item.name,
                totalPrice : item.price,
                quantity : 1
            }];
        }
        return updateCart('add', item)
});
    }

    const removeItem = (item) => {
        setCart(updateCart('subtract', item));
    }

    const calcSubTotal = (newCart, tempCoupon) => {
        if (newCart !== undefined && newCart !== null && newCart.length) {
            let subtotal =  newCart.reduce((acc, item)=>{
                return acc + (item.totalPrice * item.quantity)
            }, 0);

        let afterDiscount = parseFloat((subtotal * (tempCoupon? (1 - tempCoupon/100) : 1)).toFixed(2));
         return afterDiscount;   
        }
        return 0
    }

    const handleCouponChange = event => {
        setCoupon(event.target.value);
        setSubTotal(calcSubTotal(cart, event.target.value));
    };

    useEffect(() => {
  setSubTotal(calcSubTotal(cart, coupon));
}, [cart]);

    return (
        <div>
            <Grid className='GridRoot'>
                <LeftPanel items={items} addItem={addItem} removeItem={removeItem}/>
                <Divider orientation="vertical" />
                <RightPanel  tax={5} cart={cart} coupon={coupon}
                    handleCouponChange={handleCouponChange} subTotal={subTotal}/>
            </Grid>
        </div>
    );
}


export default Shop;
