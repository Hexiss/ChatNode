'use strict';

const { getAllV, getOneV, SetV, UpdateV, DeleteV } = require('../validations/myAppV');
const { getAllC, getOneC, SetC, UpdateC, DeleteC } = require('../controllers/myAppC');

async function routes (fastify) {
    const defRoutes = [
        {
            method: 'GET',
            url: `/`,
            schema: getAllV,
            handler: getAllC
        },
        {
            method: 'GET',
            url: `/:id`,
            schema: getOneV,
            handler: getOneC
        },
    // ....
    ];
    // Add all routes into Fastify router system
    for (const route of defRoutes) {
    fastify.route(route);
    }
}

module.exports = routes;
