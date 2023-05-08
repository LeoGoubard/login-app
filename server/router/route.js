import { Router } from 'express';

const router = Router();

import * as controller from '../controllers/appControllers.js'
import { Auth, localVariables } from '../middleware/auth.js';
import registerMail from '../controllers/mailer.js';

// POST
router.route('/register').post(controller.register);
router.route('/registerMail').post(registerMail);
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.end());
router.route('/login').post(controller.verifyUser, controller.login);

// GET
router.route('/user/:username').get(controller.getUser);
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP);
router.route('/createResetSession').get(controller.createResetSession);

// PUT
router.route('/updateuser').put(Auth, controller.updatUser);
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword);

export default router;