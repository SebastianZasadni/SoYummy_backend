const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const signup = require('../controllers/auth/signup');
const login = require('../controllers/auth/login');
const logout = require('../controllers/auth/logout');
const current = require('../controllers/auth/current');
const sendNewsletterEmail = require('../controllers/auth/sendNewsletterEmail');

router.post('/signup', signup);
/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     tags:
 *       - User Controller
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Successfully created a new user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the response (success)
 *                 message:
 *                   type: object
 *                   properties:
 *                     createdUser:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           description: The name of the created user
 *                         email:
 *                           type: string
 *                           description: The email of the created user
 *       400:
 *         description: Bad Request - Validation error in request payload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   description: Validation error details
 *       409:
 *         description: Conflict - Email already in use
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating the conflict
 *       500:
 *         description: Server Error
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           default: jasiu
 *           description: The name of the user
 *         email:
 *           type: string
 *           default: jasiu@jasio.pl
 *           description: The email of the user
 *         password:
 *           type: string
 *           default: jasiOo!31
 *           description: The password of the user
 */

router.post('/login', login);
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *       - User Controller
 *     summary: Authenticate and log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Successful login, returns user information and token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Bad Request - Validation error in request payload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   description: Validation error details
 *       401:
 *         description: Unauthorized - Email or password isn't correct
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating the unauthorized access
 *       500:
 *         description: Server Error
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           default: jasiu@jasio.pl
 *           description: The email of the user
 *         password:
 *           type: string
 *           default: jasiOo!31
 *           description: The password of the user
 *     LoginResponse:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: The unique identifier for the user
 *             email:
 *               type: string
 *               description: The email of the user
 *             username:
 *               type: string
 *               description: The name of the user
 *         token:
 *           type: string
 *           description: The JWT token for authentication
 */

router.post('/subscribe', sendNewsletterEmail);
/**
 * @swagger
 * /api/users/subscribe:
 *   post:
 *     tags:
 *       - Newsletter Controller
 *     summary: Subscribe to the newsletter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewsletterSubscription'
 *     responses:
 *       200:
 *         description: Successfully subscribed to the newsletter, email has been sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: Message indicating that the email has been sent
 *       400:
 *         description: Bad Request - Validation error in request payload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   description: Validation error details
 *       500:
 *         description: Server Error
 * components:
 *   schemas:
 *     NewsletterSubscription:
 *       type: object
 *       properties:
 *         email:
 *           default: jasiu@jasiu.pl
 *           type: string
 *           description: The email address for newsletter subscription
 */

router.get('/current', auth, current);
/**
 * @swagger
 * /api/users/current:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User Controller
 *     summary: Get current user information
 *     responses:
 *       200:
 *         description: Successfully retrieved current user information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CurrentUserResponse'
 *       401:
 *         description: Unauthorized - User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating unauthorized access
 *       500:
 *         description: Server Error
 * components:
 *   schemas:
 *     CurrentUserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         token:
 *           type: string
 *           description: The JWT token for authentication
 */

router.get('/logout', auth, logout);
/**
 * @swagger
 * /api/users/logout:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User Controller
 *     summary: Log out the currently authenticated user
 *     responses:
 *       200:
 *         description: Successfully logged out the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating successful user logout
 *       401:
 *         description: Unauthorized - User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indicating unauthorized access
 *       500:
 *         description: Server Error
 */

module.exports = router;