import * as React from "react";
import ClientComponentWithJquery from "#/app/client-component-with-jquery";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const getRenderDynamicCCCondition = () =>
    cookies().get("RENDER_DYNAMIC_CC")?.value === "1";

async function toggleDynamicAction() {
    "use server";

    const renderCC = cookies().get("RENDER_DYNAMIC_CC")?.value;

    if (renderCC === "1") {
        cookies().set("RENDER_DYNAMIC_CC", "0");
    } else {
        cookies().set("RENDER_DYNAMIC_CC", "1");
    }

    revalidatePath("/");
}

export function ServerComponent() {
    const shouldRenderDynamicClientComponent = getRenderDynamicCCCondition();

    return (
        <>
            <form action={toggleDynamicAction}>
                <button
                    className={
                        "bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
                    }
                >
                    {shouldRenderDynamicClientComponent
                        ? "Don't render the CC with jquery"
                        : "Render the dynamic CC with jquery"}
                </button>
            </form>

            {shouldRenderDynamicClientComponent && (
                <ClientComponentWithJquery />
            )}
        </>
    );
}
