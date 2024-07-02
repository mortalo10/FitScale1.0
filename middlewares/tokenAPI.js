const dotenv = require("dotenv");
dotenv.config();
const axios = require('axios');

async function obtenerTokenDeAcceso() {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const tokenUrl = 'https://api2.arduino.cc/iot/v1/clients/token';

    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);

        const response = await axios.post(tokenUrl, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = response.data.access_token;
        console.log('Access Token:', accessToken);
        return accessToken;
    } catch (error) {
        console.error('Error al obtener token de acceso:', error.message);
        throw error;
    }
}

module.exports = { obtenerTokenDeAcceso };