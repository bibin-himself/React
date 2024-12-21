import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUsers,
  setLoading,
  setError,
  deleteUser,
} from "../features/userData/usersSlice";

const DataCall = () => {
  
  // useSelector to extract data from the state (e.g., users, loading, error).
  // dispatch with actions (e.g., setUsers, deleteUser) to modify the state

  const { users, loading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        dispatch(setUsers(result));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  const handleEdit = (id) => {
    dispatch(deleteUser(id));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {users ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name}
              <button onClick={() => handleEdit(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Data Found</p>
      )}
    </div>
  );
};

export default DataCall;

// import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";

// const DataCall = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setLoading(true);

//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "https://jsonplaceholder.typicode.com/users"
//         );

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleDelete = (id) =>{
//     setData((userData) => userData.filter((user) => user.id !== id))
//   };

//   if(loading){
//     return <p>Loading...</p>
//   }

//   if(error){
//     return <p>Error: {error}</p>
//   }

//   return (
//     <div>
//         { data ? (
//             <ul>
//                 {
//                     data.filter((user) => user.name.length > 15)
//                     .map((user) => (
//                         <li key={user.id}>{user.name}
//                         <button onClick={() => handleDelete(user.id)}>Delete</button>

//                         </li>
//                     ))
//                 }
//             </ul>
//         ) : (<p>No Data Available</p>) }
//     </div>
//   )
// };

// // FOR listing and filtering

// // {
// //     data.filter((user) => user.name.split(" ")[0].length > 8)
// //     .map((user) => (
// //         <li key={user.id}>{user.name.split(" ")[0]}</li>
// //     ))
// // }

// export default DataCall;
