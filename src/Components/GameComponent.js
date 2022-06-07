import * as React from "react";
import loadable from "@loadable/component";
import { LoadingIndicator } from "./LoadingIndicator";

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
                Game = loadable(() => import("../Games/Brimstone/BrimstoneComponent"));
                break;
            case "BubbleShooter":
                Game = loadable(() => import("../Games/Bubble Shooter/BubbleShooter"));
                break;
            case "ChickenWings":
                Game = loadable(() => import("../Games/Chicken Wings/ChickenWings"));
                break;
            case "ChickenWings2":
                Game = loadable(() => import("../Games/Chicken Wings 2/ChickenWings2"));
                break;
            case "ChickenWings3":
                Game = loadable(() => import("../Games/Chicken Wings 3/ChickenWings3"));
                break;
            case "EightBallPool":
                Game = loadable(() => import("../Games/Eight-Ball Pool/EightBallPool"));
                break;
            case "Entombed":
                Game = loadable(() => import("../Games/Entombed/Entombed"));
                break;
            case "LumpyDumplings":
                Game = loadable(() => import("../Games/Lumpy Dumplings/LumpyDumplings"));
                break;
            case "LumpyDumplings2":
                Game = loadable(() => import("../Games/Lumpy Dumplings 2/LumpyDumplings2"));
                break;
            case "LumpyDumplings3":
                Game = loadable(() => import("../Games/Lumpy Dumplings 3/LumpyDumplings3"));
                break;
            case "MahjongAlchemy":
                Game = loadable(() => import("../Games/Mahjong Alchemy/MahjongAlchemy"));
                break;
            case "MahjongClassic":
                Game = loadable(() => import("../Games/Mahjong Classic/MahjongClassic"));
                break;
            case "MahjongEmoji":
                Game = loadable(() => import("../Games/Mahjong Emoji/MahjongEmoji"));
                break;
            case "MahjongMycenaean":
                Game = loadable(() => import("../Games/Mahjong Mycenaean/MahjongMycenaean"));
                break;
            case "MahjongPyramid":
                Game = loadable(() => import("../Games/Mahjong Pyramid/MahjongPyramidComponent"));
                break;
            case "MahjongZodiac":
                Game = loadable(() => import("../Games/Mahjong Zodiac/MahjongZodiac"));
                break;
            case "Minesweeper":
                Game = loadable(() => import("../Games/Minesweeper/Minesweeper"));
                break;
            case "PoolChampions":
                Game = loadable(() => import("../Games/Pool Champions/PoolChampionsComponent"));
                break;
            case "PoolDynamite":
                Game = loadable(() => import("../Games/Pool Dynamite/PoolDynamite"));
                break;
            case "PoolOutbreak":
                Game = loadable(() => import("../Games/Pool Outbreak/PoolOutbreak"));
                break;
            case "PoolSolitaire":
                Game = loadable(() => import("../Games/Pool Solitaire/PoolSolitaire"));
                break;
            case "RocketRacers":
                Game = loadable(() => import("../Games/Rocket Racers/RocketRacers"));
                break;
            case "RocketRacers2":
                Game = loadable(() => import("../Games/Rocket Racers 2/RocketRacers2"));
                break;
            case "RocketRacersNitro":
                Game = loadable(() => import("../Games/Rocket Racers Nitro/RocketRacersNitro"));
                break;
            case "Snake":
                Game = loadable(() => import("../Games/Snake/SnakeComponent"));
                break;
            case "SpeedPool":
                Game = loadable(() => import("../Games/Speed Pool/SpeedPool"));
                break;
            case "StraightPool":
                Game = loadable(() => import("../Games/Straight Pool/StraightPool"));
                break;
            case "UltimateRocketRacers":
                Game = loadable(() => import("../Games/Ultimate Rocket Racers/UltimateRocketRacers"));
                break;
            case "VolcanoFrenzy":
                Game = loadable(() => import("../Games/Volcano Frenzy/VolcanoFrenzy"));
                break;
            case "VolcanoFrenzy2":
                Game = loadable(() => import("../Games/Volcano Frenzy 2/VolcanoFrenzy2"));
                break;
            default:
                return <></>;
        }
        return (
            <Game fallback={<LoadingIndicator />} />
        );
    }
}


