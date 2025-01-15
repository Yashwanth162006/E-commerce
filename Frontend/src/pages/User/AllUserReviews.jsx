import React,{useState,useContext,useEffect} from 'react'
import Ratings from '../Products/Ratings'
import './Review.css'
import { ShopContext } from '../../contexts/ShopContext'
const AllUserReviews = (props)=>{
  const [name,setName] = useState('')
  const {loginToken} = useContext(ShopContext)
  useEffect(()=>{
    fetch(`http://127.0.0.1:3000/api/v1/users/getUserByAdmin/${props.userId}`,{
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${loginToken}`
      }
  }).then(response => response.text()).then(data => JSON.parse(data)).then(dataObj => setName(dataObj.name))
  },[])
    return <div className='user-review'>
        <div className='review-info'>
          <div className='user-review-rating'><Ratings rating={props.rating}/></div>
          <p>{props.review}</p>
          <p>Updated At- {props.date.slice(0,10)}</p>
        </div>
        <div className='reviewer-name'>
          <p>Review by- {name.split(' ')[0]}</p>
        </div>
    </div>
}
export default AllUserReviews