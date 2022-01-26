import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchUser, web3 } from "../App.js";

function Profile() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  const [bio, setBio] = useState("");
  const params = useParams();

  useEffect(() => {
    (async (username) => {
      if (username) {
        const userFound = await searchUser(username);
        console.log("User found", userFound);
        /**
         * bool isActive;
        bytes32 name;
        address owner;
        string bio;
        string avatar; // link to public profile image
        bytes32[][] links;
         */
        const userModified = {
          ...userFound,
          name: web3.utils.hexToAscii(userFound.name),
          links: (userFound.links || []).map((item) => [
            web3.utils.hexToAscii(item[0]),
            web3.utils.hexToAscii(item[1]),
          ]),
        };
        setUsername(username);
        console.log("User Modified", userModified);
        setUser(userModified);
      }
    })(params.username);
  }, []);

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };
  const handleLinkCopyClick = (e, index) => {
    // TODO 1 copy the link at index clicked
  };
  const handleLinkClick = (e, index) => {
    // TODO 1 open the link clicked at index
  };
  return (
    <div>
      {/* TODO 1 while adding links show a dropdown of popular social media websites and show a field to enter username */}
      {/* TODO 1 provide a way to update the avatar: <img src={user.avatar}></img><i onClick={}></i> */}
      {user && user.isActive && (
        <>
          Username: {username}
          <br />
          Name: {user.name}
          <br />
          Owner: {user.owner} {isOwner && "(You)"}
          <br />
          Bio: {user.bio}
          <br />
          Links:{" "}
          {user.links &&
            user.links.map((link, index) => {
              return (
                <>
                  {link[0]}:
                  <span
                    onClick={() => {
                      // open the link when clicked
                      return handleLinkClick(index);
                    }}
                  >
                    {link[1]}
                  </span>
                  <i
                    className="bi bi-clipboard"
                    onClick={() => {
                      return handleLinkCopyClick(index);
                    }}
                    // show copy link button
                  ></i>
                  {
                    isOwner && <i className="bi bi-x"></i>
                    // TODO 4: implement delete handlerd
                  }
                  <br />
                </>
              );
            })}
          <br />
          {isOwner && (
            <button>
              Add Link
              <i class="bi bi-plus"></i>
            </button>
            // TODO 5: provide input fields to enter new social media name and link
          )}
        </>
      )}
    </div>
  );
}

export default Profile;
