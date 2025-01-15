import React from 'react'

const Ratings = (props) => {
  function createStar(count){
    return count>0?<i class="fa-solid fa-star"></i>:<i class="fa-regular fa-star"></i>
  }
  return (
    <div>
      {createStar(props.rating)}
      {createStar(props.rating-1)}
      {createStar(props.rating-2)}
      {createStar(props.rating-3)}
      {createStar(props.rating-4)}
    </div>
  )
}

export default Ratings
