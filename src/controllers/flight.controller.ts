import { Request, Response } from "express";
import { query } from "../config/db";
import {
    getCountByOriginDestinationQuery,
    getFlightsQuery,
    getTotalUniqueFlightsQuery,
} from "../queries/queries";

export const getFlights = async (request: Request, response: Response) => {
    const page = parseInt(request.query.page as string) || 1;
    const limit = 6;
    const offset = (page - 1) * limit;

    try {
        const [rows] = await query(getFlightsQuery, [limit, offset]);
        response.json(rows);
    } catch (error) {
        response.status(500).send({ error });
    }
};

export const getTotalUniqueFlights = async (
    request: Request,
    response: Response
) => {
    try {
        const [rows] = await query(getTotalUniqueFlightsQuery);
        response.json(rows);
    } catch (error) {
        response.status(500).send({ error });
    }
};

export const getCountByOriginDestination = async (
    request: Request,
    response: Response
) => {
    const page = parseInt(request.query.page as string) || 1;
    const limit = 6;
    const offset = (page - 1) * limit;

    try {
        const [rows] = await query(getCountByOriginDestinationQuery, [
            limit,
            offset,
        ]);
        response.json(rows);
    } catch (error) {
        response.status(500).send({ error });
    }
};
