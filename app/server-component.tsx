import * as React from "react";
import ClientComponentWithJquery from "#/app/client-component-with-jquery";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { SubmitButton } from "./submit-button";

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
                <SubmitButton>
                    {shouldRenderDynamicClientComponent
                        ? "Don't render the CC with jquery"
                        : "Render the dynamic CC with jquery"}
                </SubmitButton>
            </form>

            {shouldRenderDynamicClientComponent && (
                <ClientComponentWithJquery />
            )}
        </>
    );
}
