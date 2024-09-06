import { Request, Response } from "express";
import { query } from "../config/db";

export const getFlights = async (request: Request, response: Response) => {
  const page = parseInt(request.query.page as string) || 1;
  const limit = 6;
  const offset = (page - 1) * limit;

  const sql = `SELECT 
    t.origin, 
    t.destination, 
    t.marketing_airline_code as airline, 
    t.flight_num,
    t.origin_iata_code,
    t.origin_name,
    t.origin_latitude,
    t.origin_longitude,
    i.iata_code as destination_iata_code,
    i.name as destination_name,
    i.latitude as destination_latitude,
    i.longitude as destination_longitude
FROM 
    airport i 
JOIN 
    (
        SELECT 
            f.origin, 
            f.destination, 
            f.marketing_airline_code, 
            f.flight_num,
            a.latitude as origin_latitude,
            a.longitude as origin_longitude,
            a.name as origin_name,
            a.iata_code as origin_iata_code
        FROM 
            airport a 
        JOIN 
            (
                SELECT 
                    coupon.origin, 
                    coupon.destination, 
                    coupon.marketing_airline_code, 
                    coupon.flight_num
                FROM 
                    coupon
                WHERE 
                    coupon.origin IN (SELECT iata_code FROM airport WHERE country LIKE 'Mexico')
                    AND coupon.flight_num IS NOT NULL
                LIMIT 3000
            ) f
        ON 
            f.origin = a.iata_code
    ) t 
ON 
    t.destination = i.iata_code
    LIMIT ? OFFSET ?;`;

  try {
    const result = await query(sql, [limit, offset]);
    response.send(result);
  } catch (error) {
    console.log("error", error);
    response.status(500).send({ error });
  }
};
