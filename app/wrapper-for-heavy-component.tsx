"use client";

import dynamic from "next/dynamic";

const LazyHeavyClientComponent = dynamic(
  () => import("#/app/heavy-client-component")
);

export const WrapperForHeavyComponent = () => (
  <LazyHeavyClientComponent></LazyHeavyClientComponent>
);
