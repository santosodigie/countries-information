const fetch = require('node-fetch');
const request = require("supertest");
const { response } = require('/Users/santosodigie/countries-information/server/server');
const app = require('/Users/santosodigie/countries-information/server/server');

// Mock node-fetch to avoid making real HTTP requests
jest.mock('node-fetch', () => jest.fn());

// tests for the /countries endpoint
describe('/countries endpoint', () => {
    it('returns a list of all countries', async () => {
        const mockCountries = [
            { name: { common: 'Finland' }, capital: 'Helsinki' },
            { name: { common: 'Sweden' }, capital: 'Stockholm' }
        ];
        // setting up fetch to return a successful response with mock data when called
        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockCountries),
        });

        const response = await request(app).get('/countries');

        expect(response.statusCode).toBe(200); // assertion to check if status code is 200
        expect(response.body).toEqual(mockCountries); // assertion to check if response body matches mock data
        expect(fetch).toHaveBeenCalledTimes(1); // assertion to check if fetch was called exactly once
        expect(fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/all'); // assertion to check if fetch was called with the correct URL
    });

    it('returns a 500 error if the API calls fails', async () => {

        fetch.mockRejectedValueOnce(new Error('API is down'));
        const response = await request(app).get('/countries');

        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({ message: "Error retrieving countries data"})
    })
})

describe('/country:name', () => {
    it('returns data for a particular country', async () => {
        const mockCountry = { name: { common: 'Spain' }, capital: 'Madrid' };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockCountry),
        });
        // get request to endpoint
        const response = await request(app).get('/country/Spain');

        // Asserions
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockCountry);
    });

    it('returns a 500 error if there are issues fetching the data', async () => {

        fetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
            json: () => Promise.resolve({ message: "Country not found" }),
        });

        const response = await request(app).get('/country/Atlantis')

        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ message: "Country not found" });
    })
})