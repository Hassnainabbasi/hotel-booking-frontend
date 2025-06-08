import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch
    const {user} =  useSelector((state) => state.auth)
  return (
    <div>
    <h1 className="heading center">Dashboard</h1>
    </div>
  )
}

export default Dashboard