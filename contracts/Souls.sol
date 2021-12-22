pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Souls {
    struct User {
        bool isActive;
        bytes32[][] links; // Networkname to social media username
        bytes32 name;
        address owner;
        string bio;
        string avatar; // link to public profile image
    }

    mapping(bytes32 => User) public users; // username to Users mapping

    function createUser(bytes32 _username, bytes32 _name) public {
        require(!users[_username].isActive, "Username already exists");
        User storage newUser = users[_username];
        newUser.name = _name;
        newUser.isActive = true;
        newUser.owner = msg.sender;
    }

    function deleteUser(bytes32 _username) public onlyUserOwner(_username) {
        delete users[_username];
    }

    function addLink(
        bytes32 _username,
        bytes32 _networkName,
        bytes32 _networkUsername
    ) public onlyUserOwner(_username) {
        require(_networkName[0] != 0, "Network must not be empty");
        require(_networkUsername[0] != 0, "Network's Username must not be empty");
        users[_username].links.push([_networkName, _networkUsername]);
    }

    function deleteLink(bytes32 _username, uint256 _index)
        public
        onlyUserOwner(_username)
    {
        require(_index < users[_username].links.length);
        users[_username].links[_index] = users[_username].links[users[_username].links.length - 1];
        users[_username].links.pop();
    }

    function getLinks(bytes32 _username)
        public
        view
        returns (bytes32[][] memory)
    {
        return users[_username].links;
    }

    function updateBio(bytes32 _username, string memory _bio)
        public
        onlyUserOwner(_username)
    {
        users[_username].bio = _bio;
    }

    function updateAvatar(bytes32 _username, string memory _avatar)
        public
        onlyUserOwner(_username)
    {
        users[_username].avatar = _avatar;
    }

    modifier onlyUserOwner(bytes32 _username) {
        require(msg.sender == users[_username].owner, "You are not the owner");
        _;
    }
}
