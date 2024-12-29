import { test, request as apiRequest, expect } from '@playwright/test';

test.describe('API: create cars', () => {
    let requestContext;
    let headers;

    test.beforeAll(async ({ browser }) => {
        requestContext = await apiRequest.newContext();
        const context = await browser.newContext({
            httpCredentials: { username: 'guest', password: 'welcome2qauto', send: 'always' }
        });
        const cookies = await context.cookies();
        const cookiesParsed = cookies.reduce((acc, curr) => `${acc}${curr.name}=${curr.value}; `, '');
        headers = { cookies: cookiesParsed };
    });

    test('Add a new car successfully', async () => {
        const carData = {
            carBrandId: 1,
            carModelId: 1,
            mileage: 15000
        };

        const createCarResponse = await requestContext.post('https://qauto.forstudy.space/api/cars', {
            headers,
            data: carData
        });
        const respJson = await createCarResponse.json();
        console.log('Created car:', respJson);

        expect(createCarResponse.ok()).toBeTruthy();
        expect(createCarResponse.status()).toEqual(201);
        expect(respJson.data).toHaveProperty('id');
        expect(respJson.data.carBrandId).toEqual(1);
        expect(respJson.data.carModelId).toEqual(1);
        expect(respJson.data.mileage).toEqual(15000);
    });

    test('404 Brand not found: invalid carBrandId', async () => {
        const carData = {
            carBrandId: 150, // invalid id
            carModelId: 2, 
            mileage: 12000 
        };

        const response = await requestContext.post('https://qauto.forstudy.space/api/cars', {
            headers,
            data: carData
        });

        const respJson = await response.json();
        console.log('404 Response:', respJson);

        expect(response.status()).toBe(404);
        expect(respJson).toHaveProperty('status', 'error');
        expect(respJson).toHaveProperty('message', 'Brand not found');
    });

     test('400 Invalid car model type: invalid id format', async () => {
        const carData = {
            carBrandId: 2, 
            carModelId: 'invalid', // invalid format
            mileage: 12000 
        };

        const response = await requestContext.post('https://qauto.forstudy.space/api/cars', {
            headers,
            data: carData
        });

        const respJson = await response.json();
        console.log('400 Response:', respJson);

        expect(response.status()).toBe(400);
        expect(respJson).toHaveProperty('status', 'error');
        expect(respJson).toHaveProperty('message', 'Invalid car model type');
    });   

    test('404 Not Found: invalid route', async () => {
        const carData = {
            carBrandId: 1,
            carModelId: 1,
            mileage: 15000
        };

        const response = await requestContext.post('https://qauto.forstudy.space/api/cars-new', {
            headers,
            data: carData
        });

        const respJson = await response.json();
        console.log('404 Response:', respJson);

        expect(response.status()).toBe(404);
        expect(respJson).toHaveProperty('status', 'error');
        expect(respJson).toHaveProperty('message', 'Not found');
    });
    test('400 Bad Request: data is incomplete', async () => {
        const carData = {
            carBrandId: 1, // not all required data
            mileage: 15000      
        };

        const response = await requestContext.post('https://qauto.forstudy.space/api/cars', {
            headers,
            data: carData
        });

        const respJson = await response.json();
        console.log('400 Response (Incomplete Data):', respJson);

        expect(response.status()).toBe(400); 
        expect(respJson).toHaveProperty('status', 'error');
        expect(respJson).toHaveProperty('message', 'Car model id is required');
    });
    test.afterAll(async () => {
        await requestContext.dispose();
    });
});