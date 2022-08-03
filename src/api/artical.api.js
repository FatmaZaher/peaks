
import { apiUrL, apiKey } from "../apiVariables";
import axios from "axios";

export const getArtical = async ({
    articalID = ''
} = {}) =>
    await axios.get(
        `${apiUrL}/search?ids=${articalID}&api-key=${apiKey}&show-fields=all`
    )