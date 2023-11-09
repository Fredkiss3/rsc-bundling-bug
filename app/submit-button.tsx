"use client";
import * as React from "react";
import { useFormStatus } from "react-dom";
import { LoadingSpinner } from "./loading-spinner";

export type SubmitButtonProps = {
    children: React.ReactNode;
};

export function SubmitButton({ children }: SubmitButtonProps) {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
            disabled={pending}
        >
            {pending && <LoadingSpinner />} {children}
        </button>
    );
}
