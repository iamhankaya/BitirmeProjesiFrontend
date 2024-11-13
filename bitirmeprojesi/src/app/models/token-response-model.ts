import { ResponseModelBase } from "./response-model-base";
import { TokenOptions } from "./token-options";

export interface TokenResponseModel extends ResponseModelBase {
    data:TokenOptions
}
