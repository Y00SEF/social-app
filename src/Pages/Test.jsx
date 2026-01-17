// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { decreaseCounter, increaseCounter } from '../redux/counterSlice';
// import PostCardSkeleton from '../Components/Skeleton/PostCardSkeleton';
// import { getProducts } from '../redux/productsSlice';

// export default function Test() {


//     const { counter, userName } = useSelector((store) => store.countReducer);

//     const { products, isLoading, error } = useSelector(
//       (store) => store.productsReducer
//     );

//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch(getProducts())
//     } , [])

//     return (
//         <div>
//             <h1>Hello</h1>
//             <p>
//                 counter is {counter} and userName is {userName}
//             </p>
//             <button className='me-5' onClick={() => dispatch(increaseCounter(5))}>Increase</button>
//             <button onClick={() => dispatch(decreaseCounter({ amount: 9, content: ' content updated' }))}>Decrease</button>


//             {isLoading ? <PostCardSkeleton /> : <>
//                 {products.map((prod) => <h1 key={prod.id}> {prod.content}</h1>)}
//             </>}
//         </div>
//     );
// }
