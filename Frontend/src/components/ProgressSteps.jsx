import React from 'react'
import "./ProgressSteps.css"
import { useLocation } from 'react-router'

const ProgressSteps = () => {
  const location = useLocation();
  return (
    <div className='progress-tracker-container'>
      <div className='progress-tracker'>
        <div className='progress-element'>
          <button style={{backgroundColor: 'rgb(18, 225, 18)',color: 'white'}}><i class="fa-solid fa-check"></i></button>
          <p>Login</p>
        </div>
        <progress value={(location.pathname==='/shipping'||location.pathname==='/placeorder')?1:0} style={(location.pathname==='/shipping'||location.pathname==='/placeorder')?{color: 'rgb(18, 225, 18)'}:{color: 'grey'}}/>
        <div className='progress-element'>
          <button style={(location.pathname==='/shipping'||location.pathname==='/placeorder')?{backgroundColor: 'rgb(18, 225, 18)',color: 'white'}:{color: 'grey',color: 'black'}}><i class="fa-solid fa-check"></i></button>
          <p>Shipping</p>
        </div>
        <progress value={(location.pathname==='/placeorder')?1:0} style={(location.pathname==='/placeorder')?{color: 'rgb(18, 225, 18)'}:{backgroundColor: 'grey'}}/>
        <div className='progress-element'>
          <button style={(location.pathname==='/placeorder')?{backgroundColor: 'rgb(18, 225, 18)',color: 'white'}:{backgroundColor: 'grey',color: 'black'}}><i class="fa-solid fa-check"></i></button>
          <p>Payment</p>
        </div>
      </div>
    </div>
  )
}

export default ProgressSteps
