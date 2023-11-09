import AbTestClientA from "#/app/ab-test-client-a";
import AbTestClientB from "#/app/ab-test-client-b";
import { WrapperForHeavyComponent } from "#/app/wrapper-for-heavy-component";
import { unstable_noStore } from "next/cache";
import dynamic from "next/dynamic";

const ClientComponent = dynamic(() => import("#/app/client-component"), {
  ssr: false,
});

const getSomeCondition = () => false;

const getUserTestSegment = () => (Math.random() > 0.5 ? "a" : "b");

const getShouldRenderHeavyComponent = () => Math.random() > 0.5;

export default function Home() {
  unstable_noStore();

  const shouldRenderClientComponent = getSomeCondition();
  const userSegment = getUserTestSegment();
  const shouldRenderHeavyComponent = getShouldRenderHeavyComponent();

  return (
    <>
      <h1>Hello world</h1>
      {shouldRenderClientComponent && <ClientComponent></ClientComponent>}
      {userSegment === "a" ? (
        <AbTestClientA></AbTestClientA>
      ) : (
        <AbTestClientB></AbTestClientB>
      )}
      {shouldRenderHeavyComponent && (
        <WrapperForHeavyComponent></WrapperForHeavyComponent>
      )}
    </>
  );
}
