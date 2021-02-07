import { useEffect } from "react";

function usePersistState({ key, state, setStateMethod }) {
  useEffect(() => {
    let persistedState;
    try {
      persistedState = JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error("Error while parsing persisted data!", e);
    }
    if (persistedState && typeof persistedState === "object")
      setStateMethod(persistedState);
  }, []);

  useEffect(() => localStorage.setItem(key, JSON.stringify(state)), [
    state,
    key,
  ]);
}
export default usePersistState;
