import { Router } from "express";
import { Container } from "inversify";
import movieTheaterContainerModule from "../containers/movie-theater.container";
import { APP_TYPES } from "../types/app.type";
import MovieTheaterController from "../controllers/movie-theater.controller";

const container: Container = new Container();
container.load(movieTheaterContainerModule);

const movieTheaterController: MovieTheaterController =
  container.get<MovieTheaterController>(APP_TYPES.MovieTheaterController);

const router = Router();

router.get(
  "/sala-cine/:id",
  movieTheaterController.get.bind(movieTheaterController),
);

router.post(
  "/sala-cine",
  movieTheaterController.create.bind(movieTheaterController),
);

export default router;
