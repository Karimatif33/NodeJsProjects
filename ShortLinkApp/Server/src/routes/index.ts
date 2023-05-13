import { Express, Request, Response } from "express";
import {createShortUrl,
   handelRedirect,
  // getShortUrl,
} 
  from '../controller/shortUrlController'
import validate from '../middleware/validateResourse'
import shortUrlSchema from '../Schemas/createShortUrl.schema'


function routes(app: Express){
    app.get("/healthcheck", (req: Request, res: Response) => {
        return res.send("App Is Healthy")
      });
      app.post('/api/url', createShortUrl)
      app.get('/:shortId', handelRedirect)
      // app.get("/api/url/:shortId", getShortUrl);
      // app.get('/api/analytics', getAnalytics)

}
export default routes 