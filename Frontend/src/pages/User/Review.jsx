import React, { useContext } from 'react'
import Ratings from '../Products/Ratings'
import './Review.css'
import { useParams } from 'react-router'
import { ShopContext } from '../../contexts/ShopContext'
import { toast } from 'react-toastify'
const Review = (props)=>{
  const {_id} = useParams()
  const {loginToken} = useContext(ShopContext)
  async function deleteReview(){
    const response = await fetch(`http://127.0.0.1:3000/api/v1/reviews/${_id}`,{
      method: 'DELETE',
      headers: {
         'Authorization': `Bearer ${loginToken}`
      }
    })
    const data = await response.text()
    const dataObj = JSON.parse(data)
    if(dataObj.status === 'fail'){
      toast('Failed to delete the review')
    }else if(dataObj.status === 'success'){
      toast(dataObj.message)
      setTimeout(()=>location.reload(),1500)
    }
  }
    return <div className='user-review'>
        <div className='review-info'>
          <div className='user-review-rating'><Ratings rating={props.rating}/></div>
          <p>{props.review}</p>
          {console.log(props)}
          <p>Updated At- {props.date.slice(0,10)}</p>
        </div>
        <div className='review-edit-options'>
          <i class="fa-regular fa-pen-to-square"></i>
          <i class="fa-solid fa-trash-can" onClick={deleteReview}></i>
        </div>
    </div>
}
export default Review