import * as React from "react";
import {Brimstone} from "../Games/Brimstone/BrimstoneComponent";
import {BubbleShooter} from "../Games/Bubble Shooter/BubbleShooter";
import {ChickenWings} from "../Games/Chicken Wings/ChickenWings";
import {ChickenWings2} from "../Games/Chicken Wings 2/ChickenWings2";
import {ChickenWings3} from "../Games/Chicken Wings 3/ChickenWings3";
import {EightBallPool} from "../Games/Eight-Ball Pool/EightBallPool";
import {Entombed} from "../Games/Entombed/Entombed";
import {LumpyDumplings} from "../Games/Lumpy Dumplings/LumpyDumplings";
import {LumpyDumplings2} from "../Games/Lumpy Dumplings 2/LumpyDumplings2";
import {LumpyDumplings3} from "../Games/Lumpy Dumplings 3/LumpyDumplings3";
import {MahjongAlchemy} from "../Games/Mahjong Alchemy/MahjongAlchemy";
import {MahjongClassic} from "../Games/Mahjong Classic/MahjongClassic";
import {MahjongEmoji} from "../Games/Mahjong Emoji/MahjongEmoji";
import {MahjongMycenaean} from "../Games/Mahjong Mycenaean/MahjongMycenaean";
import {MahjongPyramid} from "../Games/Mahjong Pyramid/MahjongPyramidComponent";
import {MahjongZodiac} from "../Games/Mahjong Zodiac/MahjongZodiac";
import {Minesweeper} from "../Games/Minesweeper/Minesweeper";
import {PoolChampions} from "../Games/Pool Champions/PoolChampionsComponent";
import {PoolDynamite} from "../Games/Pool Dynamite/PoolDynamite";
import {PoolOutbreak} from "../Games/Pool Outbreak/PoolOutbreak";
import {PoolSolitaire} from "../Games/Pool Solitaire/PoolSolitaire";
import {RocketRacers} from "../Games/Rocket Racers/RocketRacers";
import {RocketRacers2} from "../Games/Rocket Racers 2/RocketRacers2";
import {RocketRacersNitro} from "../Games/Rocket Racers Nitro/RocketRacersNitro";
import {Snake} from "../Games/Snake/SnakeComponent";
import {SpeedPool} from "../Games/Speed Pool/SpeedPool";
import {StraightPool} from "../Games/Straight Pool/StraightPool";
import {UltimateRocketRacers} from "../Games/Ultimate Rocket Racers/UltimateRocketRacers";
import {VolcanoFrenzy} from "../Games/Volcano Frenzy/VolcanoFrenzy";
import {VolcanoFrenzy2} from "../Games/Volcano Frenzy 2/VolcanoFrenzy2";

/**
 * props:
 *      gameName: string representing the keys of the GAME_META_INFO dictionary
 *          e.g. "Entombed", "Snake", "BubbleShooter", "MahjongMycenaean" NOT "Bubble Shooter" or "Mahjong Mycenaean"
 */
export class GameComponent extends React.Component {
    render() {
        switch (this.props.gameName) {
            case "Brimstone":
                return <Brimstone />;
            case "BubbleShooter":
                return <BubbleShooter />;
            case "ChickenWings":
                return <ChickenWings />;
            case "ChickenWings2":
                return <ChickenWings2 />;
            case "ChickenWings3":
                return <ChickenWings3 />;
            case "EightBallPool":
                return <EightBallPool />;
            case "Entombed":
                return <Entombed />;
            case "LumpyDumplings":
                return <LumpyDumplings />;
            case "LumpyDumplings2":
                return <LumpyDumplings2 />;
            case "LumpyDumplings3":
                return <LumpyDumplings3 />;
            case "MahjongAlchemy":
                return <MahjongAlchemy />;
            case "MahjongClassic":
                return <MahjongClassic />;
            case "MahjongEmoji":
                return <MahjongEmoji />;
            case "MahjongMycenaean":
                return <MahjongMycenaean />;
            case "MahjongPyramid":
                return <MahjongPyramid />;
            case "MahjongZodiac":
                return <MahjongZodiac />;
            case "Minesweeper":
                return <Minesweeper />;
            case "PoolChampions":
                return <PoolChampions />;
            case "PoolDynamite":
                return <PoolDynamite />;
            case "PoolOutbreak":
                return <PoolOutbreak />;
            case "PoolSolitaire":
                return <PoolSolitaire />;
            case "RocketRacers":
                return <RocketRacers />;
            case "RocketRacers2":
                return <RocketRacers2 />;
            case "RocketRacersNitro":
                return <RocketRacersNitro />;
            case "Snake":
                return <Snake />;
            case "SpeedPool":
                return <SpeedPool />;
            case "StraightPool":
                return <StraightPool />;
            case "Entombed":
                return <Entombed />;
            case "UltimateRocketRacers":
                return <UltimateRocketRacers />;
            case "VolcanoFrenzy":
                return <VolcanoFrenzy />;
            case "VolcanoFrenzy2":
                return <VolcanoFrenzy2 />;
        }
    }
}


