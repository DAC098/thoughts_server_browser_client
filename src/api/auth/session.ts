import { json } from "../../request"
import { urlFromString } from "../../util/url"
import { User } from "../types"

export interface PostLogin {
    username: string,
    password: string
}

export interface PostSessionArgs {
    post: PostLogin
}

export async function post({post}: PostSessionArgs) {
    return await json.post<User>(urlFromString("/auth/session"), post);
}

export interface DeleteSessionArgs {}

export async function del({}: DeleteSessionArgs) {
    return await json.delete(urlFromString("/auth/session"), {});
}