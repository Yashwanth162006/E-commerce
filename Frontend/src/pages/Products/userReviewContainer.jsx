import React,{useContext} from "react"
import { ShopContext } from '../../contexts/ShopContext'
import { NavLink } from "react-router-dom";
function userReviewContainer(){
    const {isLogedIn} = useContext(ShopContext);

    return <div className="user-reviews">
        {isLogedIn?<div className="user-review-input">
            <h4>Rating</h4>
            <select name='rating' id='rating'>
                <option>Select</option>
                <option value='poor'>Poor</option>
                <option value='average'>Average</option>
                <option value='good'>Good</option>
                <option value='excellent'>Excellent</option>
            </select>
            <h4>Comment</h4>
            <textarea type='text'/>
            <button>Submit</button>
        </div>:<div className="not-loged-in"><h3>Please <NavLink to='/login' className="review-to-signIn">sign in</NavLink> to write review</h3></div>}
    </div>
}
export default userReviewContainer