import { Request, Response } from "express";
import { query } from "../config/db";
import { getFlightsQuery } from "../queries/queries";

export const getFlights = async (request: Request, response: Response) => {
  const page = parseInt(request.query.page as string) || 1;
  const limit = 6;
  const offset = (page - 1) * limit;

  try {
    const result = await query(getFlightsQuery, [limit, offset]);
    response.send(result);
  } catch (error) {
    console.log("error", error);
    response.status(500).send({ error });
  }
}