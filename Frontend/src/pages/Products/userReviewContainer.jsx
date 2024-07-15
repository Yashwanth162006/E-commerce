import React,{useContext,useEffect,useState} from "react"
import { ShopContext } from '../../contexts/ShopContext'
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Review from '../User/Review'
function userReviewContainer(){
    const {isLogedIn,loginToken} = useContext(ShopContext);
    const [isReviewed,setIsReviewed] = useState(false)
    const [form,setForm] = useState({})
    const [review,setReview] = useState([])
    const {_id} = useParams()
    function handleForm(event){
        setForm({...form,
            [event.target.name]: event.target.value
        })
    }
    useEffect(()=>{
        fetch(`http://127.0.0.1:3000/api/v1/reviews/exists/${_id}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${loginToken}`
            }
        }).then(response => response.text())
        .then(data => JSON.parse(data))
        .then(dataObj => {
            if(dataObj.message === 'Can write only one review'){
                setIsReviewed(true)
            }
        })
    },[])
    async function handleSubmit(event){
        event.preventDefault()
        const response = await fetch(`http://127.0.0.1:3000/api/v1/reviews/${_id}`,{
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${loginToken}`
            }
        })
        const data = await response.text()
        const dataObj = JSON.parse(data)
        if(dataObj.status === 'fail'){
            toast(dataObj.message)
        }else if(dataObj.status === 'success'){
            toast('Successful')
            setTimeout(()=>location.reload(),1500)
        }
    }
    useEffect(()=>{
        fetch(`http://127.0.0.1:3000/api/v1/reviews/userReview/${_id}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${loginToken}`
            }
        }).then(response => response.text())
        .then(data => JSON.parse(data))
        .then(dataObj => {
            if(dataObj.status === 'success'){
                setReview(dataObj.data.review)
        }
        })
    },[])
    function createReview(review){
        return <Review rating={review.rating} review={review.review} date={review.createdAt}/>
    }
    return <div className="user-reviews">
        {isLogedIn?review.length!==0?review.map(createReview):<form className="user-review-input" onSubmit={handleSubmit}>
            <h4>Rating</h4>
            <select name='rating' id='rating' defaultValue={form.rating} onChange={handleForm}>
                <option>Select</option>
                <option value='1'>1 (Poor)</option>
                <option value='2'>2 (Average)</option>
                <option value='3'>3 (Good)</option>
                <option value='4'>4 (Very Good)</option>
                <option value='5'>5 (Excellent)</option>
            </select>
            <h4>Comment</h4>
            <textarea type='text' name='review' value={form.review} onChange={handleForm}/>
            <button>Submit</button>
        </form>:<div className="not-loged-in"><h3>Please <NavLink to='/login' className="review-to-signIn">sign in</NavLink> to write review</h3></div>}
    </div>
}
export default userReviewContainer