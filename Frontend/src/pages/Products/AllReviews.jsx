import React, { useEffect, useState,useContext } from "react"
import { NavLink } from "react-router-dom"
import {ShopContext} from "../../contexts/ShopContext"
import {useParams} from 'react-router-dom'
import AllUserReviews from '../User/AllUserReviews'

function AllReviews(){
    const [reviewList,setReviewList] = useState([])
    const {loginToken} = useContext(ShopContext)
    const {_id} = useParams()
    useEffect(()=>{
        fetch(`https://e-com-backend-4zqj.onrender.com/api/v1/reviews/${_id}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${loginToken}`
            }
        }).then(response => response.text())
        .then(data => JSON.parse(data))
        .then(dataObj => setReviewList(dataObj.data.reviews))
    },[])
    function createReview(review){
        console.log(reviewList)
        return <AllUserReviews rating={review.rating} review={review.review} date={review.createdAt} userId={review.refToUser}/>
    }
    return <div className="all-reviews">
        {reviewList.length===0?<p>No reviews add your <NavLink className='add-review-link'>Review..</NavLink></p>:reviewList.map(createReview)}
    </div>
}
export default AllReviews
