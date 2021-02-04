import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import Header from "components/Header/";
import Products from "pages/Products/";
import Product from "pages/Product/";
import { FilterProvider } from "hooks/useFilters";

function App() {
  return (
    <div className="App min-h-screen flex-col">
      <Header />
      <main className="mt-20">
        <Switch>
          <Route path="/" exact>
            <FilterProvider>
              <Products />
            </FilterProvider>
          </Route>
          <Route path="/:id" component={Product} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
