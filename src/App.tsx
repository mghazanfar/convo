import { useState } from "react";
import { Container } from "./components/container";
import { ItemsContextProvider } from "./store/items";

function App() {
  const [items, setItems] = useState([]);
  return (
    <ItemsContextProvider value={{ items, updateItems: setItems } as any}>
      <Container />
    </ItemsContextProvider>
  );
}

export default App;
