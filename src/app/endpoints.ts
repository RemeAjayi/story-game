import {environment} from "../environments/environment";

export class Endpoints{

    public static CREATE_STORY = environment.baseUrl + '/story';
    public static join_session = environment.baseUrl + '/story/join/';
    public static url = environment.baseUrl;
    public static NEW_PLAYER = environment.baseUrl + '/player';
}

