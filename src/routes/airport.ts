import { Request, Response, Router } from "express";
import {
    getFlights,
    getTotalUniqueFlights,
} from "../controllers/flight.controller";

const router = Router();

router.get("/", getFlights);
router.get("/unique-count", getTotalUniqueFlights);

export { router };
