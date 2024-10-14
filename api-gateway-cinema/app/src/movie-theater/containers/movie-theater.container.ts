import { ContainerModule, interfaces } from "inversify";
import MovieTheaterController from "../controllers/movie-theater.controller";
import MovieTheaterService from "../services/movie-theater.service";
import MovieTheaterImplProvider from "../providers/impl/movie-theater.impl.provider";
import { MovieTheaterProvider } from "../providers/movie-theater.provider";
import { APP_TYPES } from "../types/app.type";

const movieTheaterContainerModule = new ContainerModule(
  (bind: interfaces.Bind): void => {
    bind<MovieTheaterController>(APP_TYPES.MovieTheaterController).to(
      MovieTheaterController,
    );
    bind<MovieTheaterService>(APP_TYPES.MovieTheaterService).to(
      MovieTheaterService,
    );
    bind<MovieTheaterProvider>(APP_TYPES.MovieTheaterProvider).to(
      MovieTheaterImplProvider,
    );
  },
);

export default movieTheaterContainerModule;
