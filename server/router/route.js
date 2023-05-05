import { Router } from 'express';

const router = Router();

import * as controller from '../controllers/appControllers.js'

// POST
router.route('/register').post(controller.register);
router.route('/registerMail').post();
router.route('/authenticate').post((req, res) => res.end());
router.route('/login').post(controller.verifyUser, controller.login);

// GET
router.route('/user/:username').get(controller.getUser);
router.route('/generateOTP').get(controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyOTP);
router.route('/createResetSession').get(controller.createResetSession);

// PUT
router.route('/updateuser').put(controller.updatUser);
router.route('/resetPassword').put(controller.resetPassword);

export default router;