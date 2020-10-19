import M from 'materialize-css'
import '../../styles/UserList.scss'

import React, { useEffect, useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { usePaginatedQuery } from 'react-query'





import { AuthContext } from '../../contexts/subContexts/AuthContext'
import { AllUserContext } from '../../contexts/subContexts/AllUserContext'



import UserListItem from './UserListItem'





const getAllUsers = async ()=>{
  

  const allUserRes = await fetch('http://localhost:5000/user/all');
  const allUserData = await allUserRes.json();

  console.log(allUserData);
  return allUserData
}





function UserList() {
  useEffect(()=>{
    M.AutoInit();
  }, [])





  const { userData, setUserData } = useContext(AuthContext)
  const { allUsers, setAllUsers } = useContext(AllUserContext)
  // const [allUsers, setAllUsers] = useState([1,2,3,4,5,6,7,8,9])
  const history = useHistory()
  


  const { resolvedData, latestData, status } = usePaginatedQuery("allusers", getAllUsers)
  if(resolvedData) setAllUsers(resolvedData);





  // if(!userData._id) history.push('/login')

  return (
    <div className="container myUserListPage">
      <h6 className="blue-text">All users</h6>


      <ul>
        {
          allUsers[0] && allUsers.map((item, index)=>{
            return (
              <Link to={ "/userProfile/" + index } key={ index } >
                <UserListItem item={ item } />
              </Link>
            )
          })
        }
      </ul>



    </div>
  )
}

export default UserList
