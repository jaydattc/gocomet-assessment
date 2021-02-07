import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import Header from "components/Header/";
import Products from "pages/Products/";
import Product from "pages/Product/";
import { FilterProvider } from "hooks/useFilters";
import { SortProvider } from "hooks/useSort";

function App() {
  return (
    <FilterProvider>
      <SortProvider>
        <div className="App min-h-screen flex-col">
          <Header />
          <main className="mt-20">
            <Switch>
              <Route path="/gocomet-assessment" exact>
                <Products />
              </Route>
              <Route path="/gocomet-assessment/:id" component={Product} />
            </Switch>
          </main>
        </div>
      </SortProvider>
    </FilterProvider>
  );
}

export default App;
