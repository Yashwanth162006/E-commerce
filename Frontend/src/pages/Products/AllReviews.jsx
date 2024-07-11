import React from "react"
import { NavLink } from "react-router-dom"

function AllReviews(){
    return <div className="all-reviews">
        <p>No reviews add your <NavLink to='*' className='add-review-link'>Review..</NavLink></p>
    </div>
}
export default AllReviews