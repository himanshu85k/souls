import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { account, searchUser, web3 } from "../App.js";

function Profile() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [bio, setBio] = useState("");
  const [socialMediaPlatform, setSocialMediaPlatform] = useState("");
  const [socialMediaProfileLink, setSocialMediaProfileLink] = useState("");
  const [links, setLinks] = useState([]);
  const params = useParams();

  useEffect(() => {
    (async (username) => {
      if (username) {
        const userFound = await searchUser(username);
        console.log("User found", userFound);
        const userModified = {
          ...userFound,
          name: web3.utils.hexToAscii(userFound.name),
        };
        setUsername(username);
        console.log("User Modified", userModified);
        setUser(userModified);
        if (account === userModified.owner) {
          setIsOwner(true);
        }
      }
    })(params.username);
  }, []);

  const handleAddLinkClick = (e) => {
    // TODO append the new link to existing links array
  };

  const handleSaveClick = (e) => {
    // TODO 5 save the links to blockchain
  };

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
                    // TODO 4: implement delete handler
                  }
                  <br />
                </>
              );
            })}
          <br />
          {isOwner && (
            <>
            <input type="text" id="socialMediaPlatform" value={socialMediaPlatform} onChange={(e) => setSocialMediaPlatform(e.target.value)}/>
            <input type="text" id="socialMediaProfileLink" value={socialMediaProfileLink} onChange={(e) => setSocialMediaProfileLink(e.target.value)}/>
            <button onClick={handleAddLinkClick}>
              Add Link
              <i class="bi bi-plus"></i>
            </button>
            </>
          )}
          {
            isOwner &&
            <button onClick={handleSaveClick}>Save</button>
          }
        </>
      )}
    </div>
  );
}

export default Profile;
