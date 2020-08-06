import React from "react";
import { Button, Grid, CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AustinData } from "./AustinData/AustinData";
import { SmallAppBar } from "./SmallAppBar/SmallAppBar";
import { WorldWideDashboard } from "./WorldWideDashboard/WorldWideDashboard";

export const App = () => {
  return (
    <Router>
      <CssBaseline />
      <div className="App">
        <Switch>
          <Route path="/austin">
            <AustinData />
          </Route>
          <Route path="/world">
            <WorldWideDashboard />
          </Route>
          <Route
            render={() => (
              <>
                <SmallAppBar label={"Dashboard hub"} />
                <Grid
                  spacing={2}
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  style={{ marginTop: "16px" }}
                >
                  <Grid item>
                    <Button variant="contained" component={Link} to={"/austin"}>
                      Austin Dashboard
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" component={Link} to={"/world"}>
                      World Dashboard
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};
