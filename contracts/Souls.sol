pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Souls {
    struct User {
        bool isActive;
        bytes32 name;
        address owner;
        string bio;
        string avatar; // link to public profile image
        string[][] links; // Networkname to social media username
    }

    mapping(bytes32 => User) public users; // username to Users mapping

    event UserCreatedEvent(bytes32 indexed _username);
    event UserDeletedEvent(bytes32 indexed _username);
    event UserAttributesUpdated(bytes32 indexed _username, bytes32 indexed attribute);

    function createUser(bytes32 _username, bytes32 _name) public {
        require(!users[_username].isActive, "Username already exists");
        User storage newUser = users[_username];
        newUser.name = _name;
        newUser.isActive = true;
        newUser.owner = msg.sender;
        emit UserCreatedEvent(_username);
    }

    function deleteUser(bytes32 _username) public onlyUserOwner(_username) {
        delete users[_username];
        emit UserDeletedEvent(_username);
    }

    function addLink(
        bytes32 _username,
        string memory _networkName,
        string memory _networkUsername
    ) public onlyUserOwner(_username) {
        require(bytes(_networkName).length != 0, "Network must not be empty");
        require(bytes(_networkUsername).length != 0, "Network's Username must not be empty");
        users[_username].links.push([_networkName, _networkUsername]);
        emit UserAttributesUpdated(_username, '0x6164644c696e6b'); // 2nd parameter is bytes32 representation of text 'addLink'
    }

    function deleteLink(bytes32 _username, uint256 _index)
        public
        onlyUserOwner(_username)
    {
        require(_index < users[_username].links.length, "Index does not exist");
        users[_username].links[_index] = users[_username].links[users[_username].links.length - 1];
        users[_username].links.pop();
        emit UserAttributesUpdated(_username, '0x64656c6574654c696e6b'); // 2nd parameter is bytes32 representation of text 'deleteLink'
    }

    function getLinks(bytes32 _username)
        public
        view
        returns (string[][] memory)
    {
        return users[_username].links;
    }

    function updateBio(bytes32 _username, string memory _bio)
        public
        onlyUserOwner(_username)
    {
        users[_username].bio = _bio;
        emit UserAttributesUpdated(_username, '0x75706461746542696f'); // 2nd parameter is bytes32 representation of text 'updateBio'
    }

    function updateAvatar(bytes32 _username, string memory _avatar)
        public
        onlyUserOwner(_username)
    {
        users[_username].avatar = _avatar;
        emit UserAttributesUpdated(_username, '0x757064617465417661746172'); // 2nd parameter is bytes32 representation of text 'updateAvatar'
    }

    modifier onlyUserOwner(bytes32 _username) {
        require(msg.sender == users[_username].owner, "You are not the owner");
        _;
    }
}
