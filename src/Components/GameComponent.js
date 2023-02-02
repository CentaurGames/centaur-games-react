import * as React from "react";
import { LoadingIndicator } from "./LoadingIndicator";
import { GlobalLoadingIndicator } from "./GlobalLoadingIndicator";

/**
 * props:
 *      gameName: string representing the keys of the GAME_META_INFO dictionary
 *          e.g. "Entombed", "Snake", "BubbleShooter", "MahjongMycenaean" NOT "Bubble Shooter" or "Mahjong Mycenaean"
 */
export class GameComponent extends React.Component {
  render() {
    let Game;
    switch (this.props.gameName) {
      case "Brimstone":
        Game = React.lazy(() =>
          import("../Games/Brimstone/BrimstoneComponent")
        );
        break;
      case "BubbleShooter":
        Game = React.lazy(() =>
          import("../Games/Bubble Shooter/BubbleShooter")
        );
        break;
      case "ChickenWings":
        Game = React.lazy(() => import("../Games/Chicken Wings/ChickenWings"));
        break;
      case "ChickenWings2":
        Game = React.lazy(() =>
          import("../Games/Chicken Wings 2/ChickenWings2")
        );
        break;
      case "ChickenWings3":
        Game = React.lazy(() =>
          import("../Games/Chicken Wings 3/ChickenWings3")
        );
        break;
      case "EightBallPool":
        Game = React.lazy(() =>
          import("../Games/Eight-Ball Pool/EightBallPool")
        );
        break;
      case "Entombed":
        Game = React.lazy(() => import("../Games/Entombed/Entombed"));
        break;
      case "LumpyDumplings":
        Game = React.lazy(() =>
          import("../Games/Lumpy Dumplings/LumpyDumplings")
        );
        break;
      case "LumpyDumplings2":
        Game = React.lazy(() =>
          import("../Games/Lumpy Dumplings 2/LumpyDumplings2")
        );
        break;
      case "LumpyDumplings3":
        Game = React.lazy(() =>
          import("../Games/Lumpy Dumplings 3/LumpyDumplings3")
        );
        break;
      case "MahjongAlchemy":
        Game = React.lazy(() =>
          import("../Games/Mahjong Alchemy/MahjongAlchemy")
        );
        break;
      case "MahjongClassic":
        Game = React.lazy(() =>
          import("../Games/Mahjong Classic/MahjongClassic")
        );
        break;
      case "MahjongEmoji":
        Game = React.lazy(() => import("../Games/Mahjong Emoji/MahjongEmoji"));
        break;
      case "MahjongMycenaean":
        Game = React.lazy(() =>
          import("../Games/Mahjong Mycenaean/MahjongMycenaean")
        );
        break;
      case "MahjongPyramid":
        Game = React.lazy(() =>
          import("../Games/Mahjong Pyramid/MahjongPyramidComponent")
        );
        break;
      case "MahjongZodiac":
        Game = React.lazy(() =>
          import("../Games/Mahjong Zodiac/MahjongZodiac")
        );
        break;
      case "Minesweeper":
        Game = React.lazy(() => import("../Games/Minesweeper/Minesweeper"));
        break;
      case "PoolChampions":
        Game = React.lazy(() =>
          import("../Games/Pool Champions/PoolChampionsComponent")
        );
        break;
      case "PoolDynamite":
        Game = React.lazy(() => import("../Games/Pool Dynamite/PoolDynamite"));
        break;
      case "PoolOutbreak":
        Game = React.lazy(() => import("../Games/Pool Outbreak/PoolOutbreak"));
        break;
      case "PoolSolitaire":
        Game = React.lazy(() =>
          import("../Games/Pool Solitaire/PoolSolitaire")
        );
        break;
      case "RocketRacers":
        Game = React.lazy(() => import("../Games/Rocket Racers/RocketRacers"));
        break;
      case "RocketRacers2":
        Game = React.lazy(() =>
          import("../Games/Rocket Racers 2/RocketRacers2")
        );
        break;
      case "RocketRacersNitro":
        Game = React.lazy(() =>
          import("../Games/Rocket Racers Nitro/RocketRacersNitro")
        );
        break;
      case "Snake":
        Game = React.lazy(() => import("../Games/Snake/SnakeComponent"));
        break;
      case "SpeedPool":
        Game = React.lazy(() => import("../Games/Speed Pool/SpeedPool"));
        break;
      case "StraightPool":
        Game = React.lazy(() => import("../Games/Straight Pool/StraightPool"));
        break;
      case "UltimateRocketRacers":
        Game = React.lazy(() =>
          import("../Games/Ultimate Rocket Racers/UltimateRocketRacers")
        );
        break;
      case "VolcanoFrenzy":
        Game = React.lazy(() =>
          import("../Games/Volcano Frenzy/VolcanoFrenzy")
        );
        break;
      case "VolcanoFrenzy2":
        Game = React.lazy(() =>
          import("../Games/Volcano Frenzy 2/VolcanoFrenzy2")
        );
        break;
      default:
        return <></>;
    }
    return (
      <React.Suspense fallback={<LoadingIndicator />}>
        <GlobalLoadingIndicator>
          <Game />
        </GlobalLoadingIndicator>
      </React.Suspense>
    );
  }
}
