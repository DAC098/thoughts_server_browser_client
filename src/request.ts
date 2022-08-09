import { cloneInteger, cloneString } from "./util/clone"

export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type Path = URL | string;

export interface ResponseJSON<T = any> {
    type?: string,
    message: string
    date: string,
    data?: T
}

export type JSONResponse<T> = T extends ResponseJSON ? T : ResponseJSON<T>;

export class RequestError extends Error {
    private status_: number;
    private request_: Response;
    private type_: string;

    constructor(type: string, message: string, status?: number, request?: Response) {
        super(message);
        this.type_ = type;
        this.status_ = status ?? 500;
        this.request_ = request;

        try {
            Error.captureStackTrace(this);
        } catch(e) {}
    }

    get status() {
        return this.status_;
    }

    get request() {
        return this.request_;
    }

    get type() {
        return this.type_;
    }

    public toJson() {
        return {
            error: "RequestError",
            status: cloneInteger(this.status_),
            type: cloneString(this.type_),
            message: cloneString(this.message)
        }
    }
}

export function getNewRequest(method: Method, url: Path, headers: HeadersInit, body?: BodyInit) {
    if (typeof url === "string") {
        url = new URL(url, window.location.origin);
    }

    return new Request(url.toString(), {
        method,
        headers,
        body
    });
}

async function handleResponse<T = any>(response: Response) : Promise<{body: JSONResponse<T>, response: Response, status: number}> {
    const content_type = response.headers.get("content-type");
    const body = content_type && content_type.includes("application/json") ?
        (await response.json() as JSONResponse<T>) :
        await response.text();

    if (typeof body === "string") {
        throw new RequestError(
            "UnexpectedContentType",
            "body of request was an unexpected type",
            response.status,
            response
        );
    }

    if (response.ok) {
        return {
            body, response,
            status: response.status
        }
    } else {
        let t = "unknown";
        let m = null;

        if (typeof body === "object") {
            t = body.type;
            m = body.message;
        }

        throw new RequestError(
            t, m, response.status, response
        );
    }
}

async function sendJSON<T = any>(method: Method, url: Path, body: any) {
    const request = getNewRequest(method, url, {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }, JSON.stringify(body));
    const response = await fetch(request);

    return await handleResponse<T>(response);
}

export const json = {
    get: async<T = any> (url: Path) => {
        const request = getNewRequest("GET", url, {
            "Accept": "application/json"
        });
        const response = await fetch(request);

        return await handleResponse<T>(response);
    },
    post: <T = any> (url: Path, body: any) => sendJSON<T>("POST", url, body),
    put: <T = any> (url: Path, body: any) => sendJSON<T>("PUT", url, body),
    delete: <T = any> (url: Path, body?: any) => sendJSON<T>("DELETE", url, body),
    patch: <T = any> (url: Path, body: any) => sendJSON<T>("PATCH", url, body)
}

window["request"] = {
    json
}