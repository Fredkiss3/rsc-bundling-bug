import ClientComponentWithMoment from "#/app/client-component-with-moment";
import { revalidatePath, unstable_noStore } from "next/cache";
import { cookies } from "next/headers";
import { ServerComponent } from "./server-component";

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
                <button
                    className={
                        "bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
                    }
                >
                    {shouldRenderHeavyClientComponent
                        ? "Don't render the CC with moment"
                        : "Render the CC with moment"}
                </button>
            </form>

            {shouldRenderHeavyClientComponent && <ClientComponentWithMoment />}

            <ServerComponent />
        </main>
    );
}
