import App from "./app";
import Route from "./interfaces/routes.interface";
import IndexRoute from "./routes/index.route";
import PageNotFound from "./routes/pageNotFound.route";
import UserRoute from "./routes/user.route";

// We get the Route[] interface and use that to craft the IndexRoute
// The array of routes is passed into the App
const routes: Route[] = [new IndexRoute(), new UserRoute()];

// push the last route which is a 404 page
routes.push(new PageNotFound());

const app = new App(routes);

app.listen();
