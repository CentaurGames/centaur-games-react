import * as React from "react";
import loadable from "@loadable/component";

/**
 * props:
 *      gameName: string representing the keys of the GAME_META_INFO dictionary
 *          e.g. "Entombed", "Snake", "BubbleShooter", "MahjongMycenaean" NOT "Bubble Shooter" or "Mahjong Mycenaean"
 */
export class GameComponent extends React.Component {
    render() {
        switch (this.props.gameName) {
            case "Brimstone":
                const Brimstone = loadable(() => import("../Games/Brimstone/BrimstoneComponent"));
                return <Brimstone fallback={<></>} />;
            case "BubbleShooter":
                const BubbleShooter = loadable(() => import("../Games/Bubble Shooter/BubbleShooter"));
                return <BubbleShooter fallback={<></>} />;
            case "ChickenWings":
                const ChickenWings = loadable(() => import("../Games/Chicken Wings/ChickenWings"));
                return <ChickenWings fallback={<></>} />;
            case "ChickenWings2":
                const ChickenWings2 = loadable(() => import("../Games/Chicken Wings 2/ChickenWings2"));
                return <ChickenWings2 fallback={<></>} />;
            case "ChickenWings3":
                const ChickenWings3 = loadable(() => import("../Games/Chicken Wings 3/ChickenWings3"));
                return <ChickenWings3 fallback={<></>} />;
            case "EightBallPool":
                const EightBallPool = loadable(() => import("../Games/Eight-Ball Pool/EightBallPool"));
                return <EightBallPool fallback={<></>} />;
            case "Entombed":
                const Entombed = loadable(() => import("../Games/Entombed/Entombed"));
                return <Entombed fallback={<></>} />;
            case "LumpyDumplings":
                const LumpyDumplings = loadable(() => import("../Games/Lumpy Dumplings/LumpyDumplings"));
                return <LumpyDumplings fallback={<></>} />;
            case "LumpyDumplings2":
                const LumpyDumplings2 = loadable(() => import("../Games/Lumpy Dumplings 2/LumpyDumplings2"));
                return <LumpyDumplings2 fallback={<></>} />;
            case "LumpyDumplings3":
                const LumpyDumplings3 = loadable(() => import("../Games/Lumpy Dumplings 3/LumpyDumplings3"));
                return <LumpyDumplings3 fallback={<></>} />;
            case "MahjongAlchemy":
                const MahjongAlchemy = loadable(() => import("../Games/Mahjong Alchemy/MahjongAlchemy"));
                return <MahjongAlchemy fallback={<></>} />;
            case "MahjongClassic":
                const MahjongClassic = loadable(() => import("../Games/Mahjong Classic/MahjongClassic"));
                return <MahjongClassic fallback={<></>} />;
            case "MahjongEmoji":
                const MahjongEmoji = loadable(() => import("../Games/Mahjong Emoji/MahjongEmoji"));
                return <MahjongEmoji fallback={<></>} />;
            case "MahjongMycenaean":
                const MahjongMycenaean = loadable(() => import("../Games/Mahjong Mycenaean/MahjongMycenaean"));
                return <MahjongMycenaean fallback={<></>} />;
            case "MahjongPyramid":
                const MahjongPyramid = loadable(() => import("../Games/Mahjong Pyramid/MahjongPyramidComponent"));
                return <MahjongPyramid fallback={<></>} />;
            case "MahjongZodiac":
                const MahjongZodiac = loadable(() => import("../Games/Mahjong Zodiac/MahjongZodiac"));
                return <MahjongZodiac fallback={<></>} />;
            case "Minesweeper":
                const Minesweeper = loadable(() => import("../Games/Minesweeper/Minesweeper"));
                return <Minesweeper fallback={<></>} />;
            case "PoolChampions":
                const PoolChampions = loadable(() => import("../Games/Pool Champions/PoolChampionsComponent"));
                return <PoolChampions fallback={<></>} />;
            case "PoolDynamite":
                const PoolDynamite = loadable(() => import("../Games/Pool Dynamite/PoolDynamite"));
                return <PoolDynamite fallback={<></>} />;
            case "PoolOutbreak":
                const PoolOutbreak = loadable(() => import("../Games/Pool Outbreak/PoolOutbreak"));
                return <PoolOutbreak fallback={<></>} />;
            case "PoolSolitaire":
                const PoolSolitaire = loadable(() => import("../Games/Pool Solitaire/PoolSolitaire"));
                return <PoolSolitaire fallback={<></>} />;
            case "RocketRacers":
                const RocketRacers = loadable(() => import("../Games/Rocket Racers/RocketRacers"));
                return <RocketRacers fallback={<></>} />;
            case "RocketRacers2":
                const RocketRacers2 = loadable(() => import("../Games/Rocket Racers 2/RocketRacers2"));
                return <RocketRacers2 fallback={<></>} />;
            case "RocketRacersNitro":
                const RocketRacersNitro = loadable(() => import("../Games/Rocket Racers Nitro/RocketRacersNitro"));
                return <RocketRacersNitro fallback={<></>} />;
            case "Snake":
                const Snake = loadable(() => import("../Games/Snake/SnakeComponent"));
                return <Snake fallback={<></>} />;
            case "SpeedPool":
                const SpeedPool = loadable(() => import("../Games/Speed Pool/SpeedPool"));
                return <SpeedPool fallback={<></>} />;
            case "StraightPool":
                const StraightPool = loadable(() => import("../Games/Straight Pool/StraightPool"));
                return <StraightPool fallback={<></>} />;
            case "UltimateRocketRacers":
                const UltimateRocketRacers = loadable(() => import("../Games/Ultimate Rocket Racers/UltimateRocketRacers"));
                return <UltimateRocketRacers fallback={<></>} />;
            case "VolcanoFrenzy":
                const VolcanoFrenzy = loadable(() => import("../Games/Volcano Frenzy/VolcanoFrenzy"));
                return <VolcanoFrenzy fallback={<></>} />;
            case "VolcanoFrenzy2":
                const VolcanoFrenzy2 = loadable(() => import("../Games/Volcano Frenzy 2/VolcanoFrenzy2"));
                return <VolcanoFrenzy2 fallback={<></>} />;
        }
    }
}


