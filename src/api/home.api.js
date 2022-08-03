
import { apiUrL, apiKey } from "../apiVariables";
import axios from "axios";

export const getHomeNews = async ({
    section = ["news"],
    orderBy = "newest",
    searchValue = '',
    page = 1,
    pageSize = 8
} = {}) =>
    await axios.get(
        `${apiUrL}/search?section=${section.join(
            "|"
        )}&order-by=${orderBy}&q=${searchValue}&page=${page}&page-size=${pageSize}&api-key=${apiKey}&show-fields=all`
    )