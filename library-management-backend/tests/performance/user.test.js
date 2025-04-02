import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

// Test configuration
export const options = {
    stages: [
        { duration: '1m', target: 20 }, // Ramp up to 20 users
        { duration: '2m', target: 20 }, // Stay at 20 users
        { duration: '1m', target: 0 },  // Ramp down to 0 users
    ],
    thresholds: {
        errors: ['rate<0.1'], // Error rate should be less than 10%
        http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    },
};

const BASE_URL = 'your_backend_url';
const authToken = 'your_auth_token_here';

// Example for local testing
//const BASE_URL = 'http://localhost:8000/api/v1';
//const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZkNDk1NDVjLWU3ZDUtNDdlMi1hMjBkLWE2NGJjYzNmNTUxNCIsImlhdCI6MTc0MzU2ODc5NiwiZXhwIjoxNzQzNTk3NTk2fQ.ETckk6sI0rdC9jFNI4JynxrmWqcLudh5yQEBJ7zRIVA';

export default function () {

    // Test get user profile
    const profileRes = http.get(`${BASE_URL}/user/profile`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
    });

    check(profileRes, {
        'get profile successful': (r) => r.status === 200,
        'response is valid': (r) => {
            try {
                const body = JSON.parse(r.body);
                return body.success === true &&
                    body.statusCode === 200 &&
                    body.data !== undefined &&
                    body.data.id !== undefined &&
                    body.data.email !== undefined;
            } catch (e) {
                return false;
            }
        }
    }) || errorRate.add(1);

    sleep(1);
} 