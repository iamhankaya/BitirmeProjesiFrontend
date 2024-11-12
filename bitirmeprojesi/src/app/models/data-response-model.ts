import { ResponseModelBase } from "./response-model-base";

export interface DataResponseModel<T> extends ResponseModelBase {
    data:T[]
}
