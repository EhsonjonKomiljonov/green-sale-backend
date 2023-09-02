import { mainCheckToken } from '../middlewares/main.token.check.js';

export class ApiCheckToken {
  async apiCheckToken(req, res) {
    try {
      const token = req.headers?.authorization;

      const getToken = mainCheckToken(token);

      if (typeof getToken == 'string') throw new Error(getToken);

      return res.send({
        status: 200,
        message: 'authorized',
        data: true,
      });
    } catch (err) {
      return res.send({
        status: 501,
        message: err.message,
        data: false,
      });
    }
  }
}
