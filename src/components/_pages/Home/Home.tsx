import React from "react";
import { useStrings } from "../../../customHooks/useStrings";

export default function Home() {
  const strings = useStrings();

  return (
    <main>
      <h1>{strings.title}</h1>
    </main>
  );
}
