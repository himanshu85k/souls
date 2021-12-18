var Souls = artifacts.require('./Souls.sol');
const TEST_USERNAME = 'testUserName';
const TEST_BIO = 'test bio';
const TEST_NAME = 'testName';
const TEST_AVATAR = 'https://testImageLink.com/23993ad3';

contract("Souls", async (accounts) => {
    var soulsInstance;

    it('creates a user with correct values', async () => {
        soulsInstance = await Souls.deployed();
        await soulsInstance.createUser(hex(TEST_USERNAME), hex(TEST_NAME), { from: accounts[0] });
        const testUser = await soulsInstance.users(hex(TEST_USERNAME));
        assert.equal(testUser.isActive, true, 'user is active');
        assert.equal(testUser.name, padRight(hex(TEST_NAME), 66), 'name is set correct');
        assert.equal(testUser.owner, accounts[0], 'owner is set correct');
    });

    it('does not allow to create a user with pre-existing userName', async () => {
        try {
            await soulsInstance.createUser(hex(TEST_USERNAME), hex(TEST_NAME), { from: accounts[1] });
        } catch (error) {
            assert(error.message.indexOf('revert Username already exists') >= 0, 'error message must contain proper return message');
        }
    })

    it('allows to update bio', async () => {
        await soulsInstance.updateBio(hex(TEST_USERNAME), TEST_BIO, { from: accounts[0] });
        const testUser = await soulsInstance.users(hex(TEST_USERNAME));
        assert.equal(testUser.bio, TEST_BIO, 'bio is set correct');
    })
    // TODO test Links:
    //  add links
    //  add 1 link
    //  remove link
    //  remove link which does not
    //  update link

    it('allows to update avatar', async () => {
        await soulsInstance.updateAvatar(hex(TEST_USERNAME), 'https://testImageLink.com/23993ad3', { from: accounts[0] });
        const testUser = await soulsInstance.users(hex(TEST_USERNAME));
        assert.equal(testUser.avatar, 'https://testImageLink.com/23993ad3', 'avatar is set correct');
    })
    it('allows to delete user', async () => {
        await soulsInstance.deleteUser(hex(TEST_USERNAME, { from: accounts[0] }));
        const testUser = await soulsInstance.users(hex(TEST_USERNAME));
        assert(!testUser.isActive, 'user is deleted');
    })
})

function padRight(str, paddingLength) {
    return (str + '0000000000000000000000000000000000000000000000000000000000000000').substring(0, paddingLength);
}

function hex(str) {
    return web3.utils.asciiToHex(str);
}
