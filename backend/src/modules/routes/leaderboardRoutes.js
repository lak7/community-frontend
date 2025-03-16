import { Router } from "express";
import { getLeaderboard } from "../controller/leaderboardController.js";

const leaderboardRouting = Router();

leaderboardRouting.get("/", getLeaderboard);

export default leaderboardRouting;