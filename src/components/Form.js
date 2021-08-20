import axios from "axios";
import React, { useState, useEffect } from "react";
import '../App.css';
import schema from "../schema";
import * as yup from 'yup';

const initialValues = {
    name: '',
    size: '',
    pepperoni: false,
    sausage: false,
    bacon: false,
    pineapple: false,
    garlic: false,
    chicken: false,
    extraCheese: false,
    special: '',
    quantity: ''
}

const initialErrors = {
    name: '',
    size: '',
    pepperoni: '',
    sausage: '',
    bacon: '',
    pineapple: '',
    garlic: '',
    chicken: '',
    extraCheese: '',
    special: '',
    quantity: ''
}

export default function Form() {
    const [orders, setOrders] = useState([]);
    const [formValues, setFormValues] = useState(initialValues);
    const [ disabled, setDisabled ] = useState(true);
    const [ errors, setErrors ] = useState(initialErrors);

    //////// Post orders data
    const postOrders = (newOrder) => {
        axios.post('https://reqres.in/api/orders', newOrder)
            .then(res => {
                console.log(res.data)
                setOrders([ ...orders, res.data])
                setFormValues(initialValues)
            })
            .catch(err => console.log(err))
    }
    const onSubmit = () => {
        const newOrder = {
            name: formValues.name.trim(),
            size: formValues.size.trim(),
            pepperoni: formValues.pepperoni,
            sausage: formValues.sausage,
            bacon: formValues.bacon,
            garlic: formValues.garlic,
            chicken: formValues.chicken,
            extraCheese: formValues.extraCheese,
            // toppings: ['pepperoni', 'sausage', 'bacon', 'pineapple', 'garlic', 'chicken', 'extraCheese'].filter(item => !!formValues[item]),
            special: formValues.special.trim(),
            quantity: formValues.quantity.trim()
        }
        postOrders(newOrder);
    }

/////////// Value validation
    const validation = (name, values) => {
        yup.reach(schema, name)
            .validate(values)
            .then(() => setErrors({ ...errors, [name]: ''}))
            .catch(err => setErrors({ ...errors, [name]: err.errors[0] }))
    }

///////// Enable Button
    useEffect(() => {
        schema.isValid(formValues).then(valid => setDisabled(!valid))
    }, [formValues])



///////// change and submit
    const change = e => {
        const { name, type, value, checked } = e.target
        const valueToUse = type === 'checkbox' ? checked : value;
        validation(name, valueToUse)
        setFormValues({ ...formValues, [name]: valueToUse})
    }

    const submit = e => {
        e.preventDefault();
        onSubmit()
    }

    return (
        <>
            <div className='form'>
                <h2>Build your own pizza</h2>
                <div className='errors'>
                    {errors.name}
                    {errors.size}
                    {errors.quantity}
                </div>

                <form id='pizza-form' onSubmit={submit}>
                    <label>Your name
                        <input
                            id='name-input'
                            name='name'
                            type='text'
                            placeholder='enter your name...'
                            onChange={change}
                            value={formValues.name}
                        />

                    </label>
                    <br />
                    <label> Size
                        <select name='size' id='size-dropdown' value={formValues.size} onChange={change}>
                            <option value=''>--Select one--</option>
                            <option value='s'>S</option>
                            <option value='m'>M</option>
                            <option value='l'>L</option>
                        </select>
                    </label>
                    <br />
                    <div className='toppings'>
                        Toppings (up to 4)<br />$0.5 for each extra toppings <br/>
                        <label>pepperoni
                            <input
                                name='pepperoni'
                                type='checkbox'
                                checked={formValues.pepperoni}
                                onChange={change}
                            />
                        </label>
                        <label>sausage
                            <input
                                name='sausage'
                                type='checkbox'
                                checked={formValues.sausage}
                                onChange={change}

                            />
                        </label>
                        <label>bacon
                            <input
                                name='bacon'
                                type='checkbox'
                                checked={formValues.bacon}
                                onChange={change}
                            />
                        </label>
                        <label>pineapple
                            <input
                                name='pineapple'
                                type='checkbox'
                                checked={formValues.pineapple}
                                onChange={change}
                            />
                        </label>
                        <label>garlic
                        <input
                            name='garlic'
                            type='checkbox'
                            checked={formValues.garlic}
                            onChange={change}
                        />
                        </label>
                        <label>chicken
                        <input
                            name='chicken'
                            type='checkbox'
                            checked={formValues.chicken}
                            onChange={change}
                        />
                        </label>
                        <label>extra cheese
                        <input
                            name='extraCheese'
                            type='checkbox'
                            checked={formValues.extraCheese}
                            onChange={change}
                        />
                        </label>
                    </div>
                    <label>quantity
                        <input
                            type='text'
                            name='quantity'
                            value={formValues.quantity}
                            onChange={change}
                        />
                    </label><br/>
                    <label>special instructions
                        <input
                            type='text'
                            name='special'
                            id='special-text'
                            value={formValues.special}
                            onChange={change}
                        />
                    </label><br/>
                    <pre>{JSON.stringify(orders, null, 2)}</pre>
                    <button disabled={disabled} id='order-button'>submit order</button>
                </form>
            </div>
            {/* <div className='orders-list'> Orders List
                {orders.map((order, idx) => {
                    return (
                        <div key={idx} className='order-card'>
                            <h3>name: {order.name}</h3>
                            <p>quantity: {order.quantity}</p>
                            <p>size: {order.size}</p>
                            <p>toppings: {order.toppings.map(top => top)}</p>
                            <p>instructions: {order.special}</p>
                        </div>
                    )

                })}
            </div> */}
        </>
    )
}