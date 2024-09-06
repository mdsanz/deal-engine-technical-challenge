export const getFlightsQuery = `SELECT 
    t.id,  -- Añadir la columna id aquí
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
            c.id,  -- Añadir la columna id aquí
            c.origin, 
            c.destination, 
            c.marketing_airline_code, 
            c.flight_num,
            a.latitude as origin_latitude,
            a.longitude as origin_longitude,
            a.name as origin_name,
            a.iata_code as origin_iata_code
        FROM 
            airport a 
        JOIN 
            (
                SELECT 
                    coupon.id,  -- Añadir la columna id aquí
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
            ) c
        ON 
            c.origin = a.iata_code
    ) t 
ON 
    t.destination = i.iata_code
    LIMIT ? OFFSET ?;`;

export const getTotalUniqueFlightsQuery = `SELECT SUM(z.count) AS total_flights, 'total_flights' AS name
FROM (
    SELECT COUNT(*) AS count, x.origin, x.destination
    FROM (
        SELECT 
            t.origin, 
            t.destination, 
            t.marketing_airline_code, 
            t.flight_num,
            t.origin_iata_code, 
            t.origin_name,
            t.origin_latitude, 
            t.origin_longitude,
            i.iata_code AS destination_iata_code,
            i.name AS destination_name,
            i.latitude AS destination_latitude, 
            i.longitude AS destination_longitude
        FROM 
            airport i 
        JOIN (
            SELECT  
                f.origin, 
                f.destination, 
                f.marketing_airline_code, 
                f.flight_num, 
                a.latitude AS origin_latitude, 
                a.longitude AS origin_longitude,
                a.name AS origin_name,
                a.iata_code AS origin_iata_code
            FROM 
                airport a 
            JOIN (
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
            ON f.origin = a.iata_code
        ) t 
        ON t.destination = i.iata_code
    ) x
    GROUP BY x.origin, x.destination
) z;`;

export const getCountByOriginDestinationQuery = `SELECT COUNT(*) AS count, x.origin, x.destination
FROM (
    SELECT 
        t.origin, 
        t.destination, 
        t.marketing_airline_code, 
        t.flight_num,
        t.origin_iata_code, 
        t.origin_name,
        t.origin_latitude, 
        t.origin_longitude,
        i.iata_code AS destination_iata_code,
        i.name AS destination_name,
        i.latitude AS destination_latitude, 
        i.longitude AS destination_longitude
    FROM 
        airport i 
    JOIN (
        SELECT  
            f.origin, 
            f.destination, 
            f.marketing_airline_code, 
            f.flight_num, 
            a.latitude AS origin_latitude, 
            a.longitude AS origin_longitude,
            a.name AS origin_name,
            a.iata_code AS origin_iata_code
        FROM 
            airport a 
        JOIN (
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
        ON f.origin = a.iata_code
    ) t 
    ON t.destination = i.iata_code
) x
GROUP BY x.origin, x.destination
ORDER BY count DESC
LIMIT ? OFFSET ?;`;
