import type { App } from "@eden-test/server";
import { edenTreaty } from "@elysiajs/eden";
import type { Elysia } from "elysia";

const getApiUrl = () => {
  return "http://localhost:8080";
};

export const api = edenTreaty<App>(getApiUrl());
