import React, { useEffect, useState } from "react";
import { Button, EditableText, InputGroup, Toaster } from "@blueprintjs/core";

// const AppToaster = Toast.create({
//     position:"top"
// })

function TableApi() {
  const [user, setUser] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newWebsite, setNewWebsite] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => setUser(json));
  }, []);

  function addUser() {
    const name = newName.trim();
    const email = newEmail.trim();
    const website = newWebsite.trim();

    if (name && email && website) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          website,
        }),
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser([...user, data]);
          setNewName("");
          setNewEmail("");
          setNewWebsite("");
        });
    }
  }

  function onChangeHandler(id, key, value) {
    setUser((user) => {
      return user.map((user) => {
        return user.id === id ? { ...user, [key]:value } : user;
      });
    });
  }

  function updateUser(id) {
    const users = user.find((user) => user.id === id);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        users
      }),
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(data => {
      });
  }

  function deleteUser(id){
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(data => {
        setUser((users)=>{
           return users.filter((user)=>user.id !== id)
        })
      }); 
  }

  return (
    <>
      <table className="table container">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Website</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>
                <EditableText
                  onChange={value => onChangeHandler(user.id,"email", value)}
                  value={user.email}
                />
              </td>
              <td>
                <EditableText
                  onChange={value =>
                    onChangeHandler(user.id, "website", value)
                  }
                  value={user.website}
                />
              </td>
              <td>
                <Button
                  className="btn btn-info"
                  onClick={() => updateUser(user.id)}
                >
                  Update
                </Button>
                <Button 
                className="btn btn-danger mx-2"
                onClick={() => deleteUser(user.id)}
                >Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <InputGroup
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter Name...."
              />
            </td>
            <td>
              <InputGroup
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter Email...."
              />
            </td>
            <td>
              <InputGroup
                value={newWebsite}
                onChange={(e) => setNewWebsite(e.target.value)}
                placeholder="Enter Website...."
              />
            </td>
            <td>
              <Button className="btn btn-success" onClick={addUser}>
                Add User
              </Button>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default TableApi;
