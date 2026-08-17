"use client";

import { useActionState } from "react";
import BespokeEverythingLogo from "../components/BespokeEverythingLogo";
import BrandGrid from "../components/BrandGrid";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink text-white">
      <BrandGrid className="brand-grid-dark" />

      <div className="section-inner relative w-full max-w-md py-16">
        <div className="flex justify-center">
          <BespokeEverythingLogo
            variant="dark"
            layout="stacked"
            showTagline={false}
            className="text-[1.35rem]"
          />
        </div>

        <form action={formAction} className="mt-12 space-y-5">
          <label className="block">
            <span className="eyebrow">Username</span>
            <input
              name="username"
              type="text"
              autoComplete="username"
              required
              className="mt-3 w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold"
            />
          </label>

          <label className="block">
            <span className="eyebrow">Password</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-3 w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold"
            />
          </label>

          {state.error ? (
            <p className="text-sm text-red-300" role="alert">
              {state.error}
            </p>
          ) : null}

          <button type="submit" className="btn-primary w-full" disabled={pending}>
            {pending ? "Signing in…" : "Enter"}
          </button>
        </form>
      </div>
    </main>
  );
}
