import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchUser } from "../App.js";

function Profile() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  const [bio, setBio] = useState("");
  const params = useParams();

  useEffect(() => {
    (async (username) => {
      if (username) {
        const user = await searchUser(username);
        setUser(user);
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
          Username: {username}<br/>
          Name: {user.name}<br/>
          Owner: {user.owner} {isOwner && "(You)"}<br/>
          Bio: {user.bio}<br/>
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
                    // show delete link option
                  }
                  <br/>
                </>
              );
            })}
            <br/>
          {isOwner && (
            <button>
              Add Link
              <i class="bi bi-plus"></i>
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Profile;
