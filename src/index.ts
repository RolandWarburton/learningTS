import App from "./app";
import Route from "./interfaces/routes.interface";
import IndexRoute from "./routes/index.route";

// We get the Route[] interface and use that to craft the IndexRoute
// The array of routes is passed into the App
const routes: Route[] = [new IndexRoute()];

const app = new App(routes);

app.listen();
