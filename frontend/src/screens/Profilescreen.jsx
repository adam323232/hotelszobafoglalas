import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'

const { TabPane } = Tabs;
const Profilescreen = () => {

    const user = JSON.parse(localStorage.getItem("currentUser"))

    useEffect(() => {
        if (!user) {
            window.location.href='/login'
        }
    }, [])

  return (
    <div className='ml-3 ml-3'>
      <Tabs defaultActiveKey='1'>
        <TabPane tab="Profil" key="1">
            <h1>Profilom</h1>

            <br />

            <h1>Név: {user.user.name}</h1>
            <h1>Email: {user.user.email}</h1>
        </TabPane>
        <TabPane tab="Foglalásaim" key="2">
            <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Profilescreen;

export function MyBookings(){

    const user = JSON.parse(localStorage.getItem("currentUser"))


    useEffect(async () => {

        try {
            const rooms = await (await axios.post('/api/getbookingbyuserid' , {userid : user._id})).data  
            console.log(rooms)   
        } catch (error) {
            console.log(error)
        }

    }, [])

    return (
        <div>
            <h1>Foglalásaim</h1>
        </div>
    )
}
