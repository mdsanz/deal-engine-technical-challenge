import { Request, Response } from "express";
import { query } from "../config/db";
import {
  getFlightsQuery,
  getTotalUniqueFlightsQuery,
} from "../queries/queries";

export const getFlights = async (request: Request, response: Response) => {
  const page = parseInt(request.query.page as string) || 1;
  const limit = 6;
  const offset = (page - 1) * limit;

  try {
    const result = await query(getFlightsQuery, [limit, offset]);
    response.send(result);
  } catch (error) {
    response.status(500).send({ error });
  }
};

export const getTotalUniqueFlights = async (
  request: Request,
  response: Response
) => {
  try {
    const result = await query(getTotalUniqueFlightsQuery);
    response.send(result);
  } catch (error) {
    response.status(500).send({ error });
  }
};
