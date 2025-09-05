const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcrypt');

const AuthController = require('../../api/controllers/AuthController');

describe('AuthController', () => {
    let sandbox;
    let req, res;
    let userSetStub;

    beforeEach(() => {
        sandbox = sinon.createSandbox();

        req = {
            body: {},
            token: null,
            user: null,
            headers: {},
        };

        res = {
            ok: sandbox.spy(),
            badRequest: sandbox.spy(),
            serverError: sandbox.spy(),
            forbidden: sandbox.spy(),
            notFound: sandbox.spy(),
        };

        userSetStub = sandbox.stub();
        global.User = {
            findOne: sandbox.stub(),
            create: sandbox.stub(),
            updateOne: sandbox.stub().returns({ set: userSetStub }),
        };

        global.Token = {
            destroy: sandbox.stub(),
        };

        global.sails = {
            helpers: {
                createNewToken: sandbox.stub(),
                comparePassword: sandbox.stub(),
                verifyToken: sandbox.stub(),
            },
            log: {
                error: sandbox.spy()
            }
        };
    });

    afterEach(() => {
        sandbox.restore();
    });

    //== Tests for the register function
    describe('register', () => {
        it('should register a user successfully', async () => {
            req.body = {
                username: 'Phong Dz',
                password: '123456',
                email: 'phongdz@gmail.com',
                phone: '0123456789'
            };
            User.findOne.resolves(null);
            sandbox.stub(bcrypt, 'hash').resolves('hashedPassword1111');
            const newUser = { id: 1, ...req.body, password: 'hashedPassword1111' };
            User.create.resolves(newUser);
            const tokenInfo = { token: 'token123', expiresAt: 12345 };
            sails.helpers.createNewToken.resolves(tokenInfo);

            await AuthController.register(req, res);

            expect(res.ok.calledOnce).to.be.true;
            expect(User.findOne.calledWith({ or: [{ username: 'Phong Dz' }, { email: 'phongdz@gmail.com' }] })).to.be.true;

            expect(sails.helpers.createNewToken.calledOnceWith({ user: newUser })).to.be.true;

            const responseData = res.ok.firstCall.args[0];
            expect(responseData.err).to.equal(0);
            expect(responseData.data.token).to.equal('token123');
        });

        it('should return a badRequest error if registration information is missing', async () => {
            req.body = { username: 'Phong Dz' };
            await AuthController.register(req, res);
            expect(res.badRequest.calledOnce).to.be.true;
            const responseData = res.badRequest.firstCall.args[0];
            expect(responseData.err).to.equal(1);
            expect(responseData.errMsg).to.equal('Missing data');
        });

        it('should return a badRequest error for an invalid email', async () => {
            req.body = {
                username: 'Phong Dz',
                password: '123456',
                email: 'invalid-email',
                phone: '0123456789'
            };
            await AuthController.register(req, res);
            expect(res.badRequest.calledOnce).to.be.true;
            expect(res.badRequest.firstCall.args[0].err).to.equal(2);
        });

        it('should return a badRequest error if username or email already exists', async () => {
            req.body = { username: 'PhongDz123', password: '123456', email: 'phongdz@gmail.com', phone: '0123456789' };
            User.findOne.resolves({ id: 2, username: 'PhongDz123' });
            await AuthController.register(req, res);
            expect(res.badRequest.calledOnce).to.be.true;
            expect(res.badRequest.firstCall.args[0].err).to.equal(4);
        });
    });

    //== Tests for the login function
    describe('login', () => {
        it('should log in a user successfully', async () => {
            req.body = { username: 'PhongDz123', password: '123456' };
            const fakeUser = { id: 1, username: 'PhongDz123', password: 'hashedPassword123' };
            const tokenInfo = { token: 'token123456', expiresAt: 12345 };
            User.findOne.withArgs({ username: 'PhongDz123' }).resolves(fakeUser);
            sails.helpers.comparePassword.withArgs({ password: '123456', hashedPassword: fakeUser.password }).resolves(true);
            sails.helpers.createNewToken.withArgs({ user: fakeUser }).resolves(tokenInfo);

            await AuthController.login(req, res);

            expect(res.ok.calledOnce).to.be.true;
            const responseData = res.ok.firstCall.args[0];
            expect(responseData.err).to.equal(0);
            expect(responseData.data.token).to.equal('token123456');
        });

        it('should return a badRequest error if username or password is missing', async () => {
            req.body = { username: 'testuser' };
            await AuthController.login(req, res);
            expect(res.badRequest.calledOnce).to.be.true;
            expect(res.badRequest.firstCall.args[0].err).to.equal(1);
        });

        it('should return a badRequest error if the account does not exist', async () => {
            req.body = { username: 'nonexistent', password: 'password123' };
            User.findOne.withArgs({ username: 'nonexistent' }).resolves(null);
            await AuthController.login(req, res);
            expect(res.badRequest.calledOnce).to.be.true;
            expect(res.badRequest.firstCall.args[0].err).to.equal(2);
        });
    });

    //== Tests for the logout function
    describe('logout', () => {
        it('should log out successfully with a valid token', async () => {
            req.token = 'valid-token';
            Token.destroy.withArgs({ token: 'valid-token' }).resolves([{ id: 1 }]);
            await AuthController.logout(req, res);
            expect(res.ok.calledOnce).to.be.true;
            expect(res.ok.firstCall.args[0]).to.deep.equal({ message: 'Logout successful.' });
        });

        it('should return a notFound error if the token does not exist', async () => {
            req.token = 'non-existent-token';
            Token.destroy.withArgs({ token: 'non-existent-token' }).resolves([]);
            await AuthController.logout(req, res);
            expect(res.notFound.calledOnce).to.be.true;
            expect(res.notFound.firstCall.args[0]).to.deep.equal({ message: 'Token does not exist or has been deleted.' });
        });
    });

    //== Tests for the update function
    describe('update', () => {
        const fakeUser = { id: 123, username: 'olduser', email: 'old@test.com', phone: '0123456789' };
        const updateData = { username: 'newuser', email: 'new@test.com', phone: '0987654321' };

        beforeEach(() => {
            req.body = updateData;
            req.user = { id: fakeUser.id };
            req.token = 'valid-token';
            User.findOne.withArgs({ id: fakeUser.id }).resolves(fakeUser);
            sails.helpers.verifyToken.resolves({ isValid: true, isExpired: false });
            userSetStub.resolves({ ...fakeUser, ...updateData });
        });

        it('should update user information successfully', async () => {
            await AuthController.update(req, res);
            expect(res.ok.calledOnce).to.be.true;
            expect(User.updateOne.calledWith({ id: fakeUser.id })).to.be.true;
            expect(userSetStub.calledWith(updateData)).to.be.true;
            const responseData = res.ok.firstCall.args[0];
            expect(responseData.err).to.equal(0);
            expect(responseData.data.username).to.equal(updateData.username);
        });

        it('should return a badRequest error if data is missing', async () => {
            req.body = { username: 'newuser' };
            await AuthController.update(req, res);
            expect(res.badRequest.calledOnce).to.be.true;
            expect(res.badRequest.firstCall.args[0].err).to.equal(1);
        });

        it('should return a notFound error if the user does not exist', async () => {
            User.findOne.withArgs({ id: fakeUser.id }).resolves(null);
            await AuthController.update(req, res);
            expect(res.notFound.calledOnce).to.be.true;
            expect(res.notFound.firstCall.args[0].err).to.equal(3);
        });
    });
});
