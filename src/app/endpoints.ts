import {environment} from "../environments/environment";

export class Endpoints{

    public static CREATE_STORY = environment.baseUrl + '/story';
    public static JOIN_SESSION = environment.baseUrl + '/story/join/';
    public static BASE = environment.baseUrl;
    public static NEW_PLAYER = environment.baseUrl + '/player';
    public static UPLOAD_STORY_IMAGE = environment.baseUrl + '/story/upload';
}

