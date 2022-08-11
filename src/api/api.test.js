import { getHomeNews } from './home.api'
import { data } from './mock'

beforeEach(() => {
    fetch.resetMocks()
})

it('calls news api "default"', async () => {
    fetch.mockResponseOnce(() =>
        getHomeNews().then(res => {
            expect(res.data.response.results.length).toEqual(8)
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(`https://content.guardianapis.com/search?section=news&order-by=newest&q=&page=1&page-size=8&api-key=7b979b22-ab7e-4d58-b00a-8c747f8fc795&show-fields=all`);

        }).catch(error => {
            expect(error.toBe(false))
        }), JSON.stringify(data)
    )
})

it('calls news api "default" - error and return null"', async () => {
    fetch.mockReject(() =>
        getHomeNews().then(res => {
            expect(res.data.response).toBe(null)
            expect(fetch).toHaveBeenCalledTimes(1);
        })
    )
})


it('calls artical api', async () => {
    fetch.mockResponseOnce(() =>
        getArtical({
            articalID: data.results[0].id
        })().then(res => {
            expect(res.data.response.results.length).toEqual(1)
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith(`https://content.guardianapis.com/search?ids=${data.results[0].id}&api-key=7b979b22-ab7e-4d58-b00a-8c747f8fc795&show-fields=all`);

        }).catch(error => {
            expect(error.toBe(false))
        }), JSON.stringify(data.results[0])
    )
})