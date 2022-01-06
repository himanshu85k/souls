var Souls = artifacts.require('./Souls.sol');
const TEST_USERNAME = 'testUsername';
const TEST_BIO = 'test bio';
const TEST_NAME = 'testName';
const TEST_AVATAR = 'https://testImageLink.com/23993ad3';

contract("Souls", async (accounts) => {
    var soulsInstance;

    it('creates a user with correct values', async () => {
        soulsInstance = await Souls.deployed();
        await soulsInstance.createUser(hex(TEST_USERNAME), hex(TEST_NAME), { from: accounts[0] });
        console.log('username and name:', hex(TEST_USERNAME), hex(TEST_NAME));
        const testUser = await soulsInstance.users(hex(TEST_USERNAME));
        assert.equal(testUser.isActive, true, 'user is active');
        assert.equal(testUser.name, hex(TEST_NAME), 'name is set correct');
        assert.equal(testUser.owner, accounts[0], 'owner is set correct');
    });

    it('does not allow to create a user with pre-existing userName', async () => {
        try {
            await soulsInstance.createUser(hex(TEST_USERNAME), hex(TEST_NAME), { from: accounts[1] });
        } catch (error) {
            assert(error.message.indexOf('revert Username already exists') >= 0, 'error message must contain proper message');
        }
    })

    it('allows to update bio', async () => {
        await soulsInstance.updateBio(hex(TEST_USERNAME), TEST_BIO, { from: accounts[0] });
        const testUser = await soulsInstance.users(hex(TEST_USERNAME));
        assert.equal(testUser.bio, TEST_BIO, 'bio is set correct');
    })

    it('does not allow others to update a bio of a user he does not own', async () => {
        try {
            await soulsInstance.updateBio(hex(TEST_USERNAME), TEST_BIO, { from: accounts[1] });
        } catch (error) {
            assert(error.message.indexOf('You are not the owner') >= 0, 'error message must contain proper message');
        }
    })

    it('allows to update avatar', async () => {
        await soulsInstance.updateAvatar(hex(TEST_USERNAME), 'https://testImageLink.com/23993ad3', { from: accounts[0] });
        const testUser = await soulsInstance.users(hex(TEST_USERNAME));
        assert.equal(testUser.avatar, 'https://testImageLink.com/23993ad3', 'avatar is set correct');
    })

    it('allows to add links', async () => {
        await soulsInstance.addLink(hex(TEST_USERNAME), hex('youtube'), hex('lorem555'), { from: accounts[0] });
        await soulsInstance.addLink(hex(TEST_USERNAME), hex('instagram'), hex('lorem666'), { from: accounts[0] });
        await soulsInstance.addLink(hex(TEST_USERNAME), hex('twitter'), hex('lorem777'), { from: accounts[0] });
        const links = await soulsInstance.getLinks(hex(TEST_USERNAME));
        assert((links[0][0] == hex('youtube') && links[0][1] == hex('lorem555')), 'first link added');
        assert((links[1][0] == hex('instagram') && links[1][1] == hex('lorem666')), 'second link added');
        assert((links[2][0] == hex('twitter') && links[2][1] == hex('lorem777')), 'third link added');
    })

    it('does not allow to create invalid links', async () => {
        try {
            await soulsInstance.addLink(hex(TEST_USERNAME), hex(''), hex('lorem555'), { from: accounts[0] });
        } catch (error) {
            assert(error.message.indexOf('Network must not be empty') >= 0, 'error message must contaion proper error message');
        }
        try {
            await soulsInstance.addLink(hex(TEST_USERNAME), hex('something'), hex(''), { from: accounts[0] });
        } catch (error) {
            assert(error.message.indexOf('Network\'s Username must not be empty') >= 0, 'error message must contaion proper error message');
        }
    })

    it('allows to delete links', async () => {
        //  remove link
        await soulsInstance.deleteLink(hex(TEST_USERNAME), 1, { from: accounts[0] });
        const links = await soulsInstance.getLinks(hex(TEST_USERNAME));
        assert((links[1][0] == hex('twitter') && links[1][1] == hex('lorem777')), 'second link deleted');
    })
    it('does not allow to delete links of index which is out of bounds', async () => {
        try {
            await soulsInstance.deleteLink(hex(TEST_USERNAME), 4, { from: accounts[0] });
        } catch (error) {
            assert(error.message.indexOf('Index does not exist') >= 0, 'error message must contain proper error message');
        }
    })

    it('allows to delete user', async () => {
        await soulsInstance.deleteUser(hex(TEST_USERNAME), { from: accounts[0] });
        const testUser = await soulsInstance.users(hex(TEST_USERNAME));
        assert(!testUser.isActive, 'user is deleted');
    })
    it('does not allow to delete a non existing user', async () => {
        try {
            await soulsInstance.deleteUser(hex(TEST_USERNAME), { from: accounts[0] });
        } catch (error) {
            assert(error.message.indexOf('You are not the owner') >= 0, 'error message must contain proper error message');
        }
    })
})

function padRight(str, paddingLength) {
    return (str + '0000000000000000000000000000000000000000000000000000000000000000').substring(0, paddingLength);
}

function hex(str, paddingLength = 66) {
    return padRight(web3.utils.asciiToHex(str), paddingLength);
}

/**
 *  await contract.createUser('0x74657374557365726e616d650000000000000000000000000000000000000000', '0x746573744e616d65000000000000000000000000000000000000000000000000');
 * 
 * const testUser = await contract.users('0x74657374557365726e616d650000000000000000000000000000000000000000')
 */