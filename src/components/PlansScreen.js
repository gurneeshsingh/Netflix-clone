import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from "../features/userSlice";
import { loadStripe } from '@stripe/stripe-js';
import "./PlansScreen.css";
import db from "../firebase";
import { collection } from 'firebase/firestore';


const PlansScreen = () => {
 
    // stripe publishable key 
    const publish_key = process.env.REACT_APP_PUBLISH_KEY

    // state to store the products/plans 
    const [products, setProducts] = useState([]);

    // state to store the current subscription of the logged in user
    const [subscription, setSubscription] = useState(null);

    // get users from redux store 
    const user = useSelector(selectUser);


    // useEffect to get he subscription of the logged in user

    useEffect(() => {
        // first get the logged in user from db
        collection(db,'customers')
            .doc(user.uid)
            .collection('subscriptions')
            .get() // now this returns a promise
            .then(querySnapshot => {
                // querysnapshot has all the subs details , run through them by foreach
                querySnapshot.forEach(async subscription => {
                    try {
                        setSubscription({
                            role: subscription.data().role,
                            // we need current period start and end date
                            current_period_end: subscription.data().current_period_end.seconds,
                            current_period_start: subscription.data().current_period_start.seconds
                        })
                    } catch (err) {
                        console.log(err);
                    }
                })
            })
    }, [user.uid]);
    
    
    // useEffect hook to call a function that will load the products on the screen

    useEffect(() => {
        // use db to get the collection of products , filter active products using where, get returns a promise, use .then to handle it 
        collection(db,'products')
            .where('active', '==', true)
            .get()
            .then(querySnapshot => {
                // create an ampty object
                const products = {};
                // querySnaphot contains all products , runs through all of them using forEach
                querySnapshot.forEach(async productDoc => {
                    try {
                        // link the id of the productdoc to its data
                        products[productDoc.id] = productDoc.data();
                        // get the price 
                        const priceSnap = await productDoc.ref.collection('prices').get();
                        // there an be more than one price , therefore go through the prices 
                        priceSnap.docs.forEach(price => {
                            products[productDoc.id].prices = {
                                priceId: price.id,
                                priceData: price.data()
                            }
                        });

                    } catch (err) {
                        console.log(err);
                    };

                });
                setProducts(products);
            });

    }, []);


    const loadCheckout = async (priceId) => {
        // async because this will redirect to the checkout page from stripe 
        try {
            // get refrence for the customers collection from the db and get the current logged in user from the redux store and create a new collection give any name : checkout_sessions
            const docRef = await collection(db,'customers')
                .doc(user.uid)
                .collection('checkout_sessions')
                .add({
                    price: priceId,
                    // during checkout we need tow routes success and cancel to redirect the customer to , in this case will redirect to the plans page in both case 
                    success_url: window.location.origin,
                    cancel_url: window.location.origin
                });
            // docRef contains the info , use onsnapshot that will listin in realtime and then decide to go to either route after checkout 
            docRef.onSnapshot(async (snap) => {

                // destructure the snap object 
                const { error, sessionId } = snap.data();
                if (error) {
                    // show error message to the customer
                    // inspect cloud function logs in the firevase console
                    alert(`An error occured : ${error.message}`);
                }

                if (sessionId) {
                    // we have a session , redirect to checkout
                    // init stripe
                    const stripe = await loadStripe(publish_key);
                    // redirect to checkout
                    stripe.redirectToCheckout({ sessionId })
                };
            });

        } catch (err) {
            console.log(err);
        }

    }

    return (
        <>
            <div className="plans_screen">
                <br />
                {subscription && <p>Renewal Date : {new Date(subscription.current_period_end * 1000).toLocaleDateString()}</p>}

                {/* since products is an object, map cannot directly work , use object.entries that will return an array with key value pairs , then use map method */}
                {/* destructure the products as its a key value pair inside of map  */}
                {Object.entries(products).map(([productId, productData]) => {

                    const iscurrentPlan = productData.name?.includes(subscription?.role)

                    return (

                        <div key={productId} className={iscurrentPlan ? "plansScreen_disabled" : "plansScreen_allPlans"}>
                            <div className="plans_info">
                                <h2>{productData.name}</h2>
                                <h3>{productData.description}</h3>
                            </div>

                            {/* onclick of  button , only render checkout page from stripe when its not current plan  */}

                            <button onClick={() => !iscurrentPlan && loadCheckout(productData.prices.priceId)}>
                                {/* conditional render currentplan name and subscribe  */}
                                {iscurrentPlan ? 'Current Plan' : 'Subscribe'}
                            </button>
                        </div>

                    )
                })}


            </div>
        </>
    )
}

export default PlansScreen;



// stripe loaded all the plans into the firestore database in products collection , we'll pull those products from the DB here and show them on screen 