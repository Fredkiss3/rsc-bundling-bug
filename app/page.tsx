import ClientComponentWithMoment from "#/app/client-component-with-moment";
import { revalidatePath, unstable_noStore } from "next/cache";
import { cookies } from "next/headers";
import { ServerComponent } from "./server-component";
import { SubmitButton } from "./submit-button";

const getRenderCCCondition = () => cookies().get("RENDER_CC")?.value === "1";

async function toggleClientAction() {
    "use server";

    const renderCC = cookies().get("RENDER_CC")?.value;

    if (renderCC === "1") {
        cookies().set("RENDER_CC", "0");
    } else {
        cookies().set("RENDER_CC", "1");
    }

    revalidatePath("/");
}

export default function Home() {
    unstable_noStore();

    const shouldRenderHeavyClientComponent = getRenderCCCondition();

    return (
        <main className="p-5 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">RSC Bundling demo</h1>

            <form action={toggleClientAction}>
                <SubmitButton>
                    {shouldRenderHeavyClientComponent
                        ? "Don't render the CC with moment"
                        : "Render the CC with moment"}
                </SubmitButton>
            </form>

            {shouldRenderHeavyClientComponent && <ClientComponentWithMoment />}

            <ServerComponent />
        </main>
    );
}
