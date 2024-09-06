import { Request, Response, Router } from "express";
import {
    getCountByOriginDestination,
    getFlights,
    getTotalUniqueFlights,
} from "../controllers/flight.controller";

const router = Router();

router.get("/", getFlights);
router.get("/unique-count", getTotalUniqueFlights);
router.get("/count-by-origin-destination", getCountByOriginDestination);

export { router };
