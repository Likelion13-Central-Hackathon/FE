import type { InfoPayload } from "./infoFormPayload";
import type { ConsiderPayload } from "./considerFormPayload";
import type { BaseResourcePayload } from "./baseResourcePayload";
import type { FormData } from "../../types/form";

import { infoFormPayload } from "./infoFormPayload";
import { considerFormPayload } from "./considerFormPayload";
import { baseResourcePayload } from "./baseResourcePayload";

export type FormRequestBody = InfoPayload &
  ConsiderPayload &
  BaseResourcePayload;

export function submitFormRequestBody(all: FormData): FormRequestBody {
  return {
    ...infoFormPayload(all),
    ...considerFormPayload(all),
    ...baseResourcePayload(all),
  };
}
