const express = require("express");
const componentRoute = express.Router();

const {
createComponent,getComponent,updateComponent,deleteComponents,getSingleComponents
} = require("../controller/components/components");

componentRoute.route("/component").post(createComponent);
componentRoute.route("/component").get(getComponent);
componentRoute.route("/component/:id").get(getSingleComponents);
componentRoute.route("/component/:id").put(updateComponent);
componentRoute.route("/component/:id").patch(updateComponent);
componentRoute.route("/component/:id").delete(deleteComponents);

module.exports = componentRoute;