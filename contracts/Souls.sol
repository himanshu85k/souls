pragma solidity >=0.4.22 <0.9.0;

contract Souls {
    struct User {
        mapping(bytes3 => bytes32) ids; // Networkname to social media username, or account addresses
        bytes32 name;
        string bio;
        string avatar; // link to public profile image
        bool isActive;
        address owner;
    }

    mapping(bytes32 => User) public users; // username to Users mapping

    function createUser(
        bytes32 _username,
        bytes32 _name
    ) public {
        require(!users[_username].isActive, "Username already exists");
        User storage newUser = users[_username];
        newUser.name = _name;
        newUser.isActive = true;
        newUser.owner = msg.sender;
    }

    function deleteUser(bytes32 _username) public onlyUserOwner(_username) {
       delete users[_username];
    }

    function updateLinks(
        bytes32 _username,
        bytes3[] memory _networkNames,
        bytes32[] memory _ids
    ) public onlyUserOwner(_username) {
        for (uint256 i = 0; i < _networkNames.length; i++) {
            users[_username].ids[_networkNames[i]] = _ids[i];
        }
    }

    function deleteLink(bytes32 _username, bytes3 _networkName)
        public
        onlyUserOwner(_username)
    {
        delete users[_username].ids[_networkName];
    }

    function updateBio(bytes32 _username, string memory _bio)
        public
        onlyUserOwner(_username)
    {
        users[_username].bio = _bio;
    }

    function updateAvatar(bytes32 _username, string memory _avatar) public onlyUserOwner(_username) {
        users[_username].avatar = _avatar;
    }

    modifier onlyUserOwner(bytes32 _username) {
        require(
            msg.sender == users[_username].owner,
            "You are not the owner"
        );
        _;
    }
}
