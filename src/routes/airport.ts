import { Request, Response, Router } from "express";
import { getFlights } from "../controllers/flight.controller";

const router = Router();

router.get("/", getFlights);

export { router }
