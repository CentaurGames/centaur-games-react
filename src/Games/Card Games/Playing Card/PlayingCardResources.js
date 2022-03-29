import clubs1 from "./Card Images/AC.png";
import clubs2 from "./Card Images/2C.png";
import clubs3 from "./Card Images/3C.png";
import clubs4 from "./Card Images/4C.png";
import clubs5 from "./Card Images/5C.png";
import clubs6 from "./Card Images/6C.png";
import clubs7 from "./Card Images/7C.png";
import clubs8 from "./Card Images/8C.png";
import clubs9 from "./Card Images/9C.png";
import clubs10 from "./Card Images/10C.png";
import clubs11 from "./Card Images/JC.png";
import clubs12 from "./Card Images/QC.png";
import clubs13 from "./Card Images/KC.png";
import spades1 from "./Card Images/AS.png";
import spades2 from "./Card Images/2S.png";
import spades3 from "./Card Images/3S.png";
import spades4 from "./Card Images/4S.png";
import spades5 from "./Card Images/5S.png";
import spades6 from "./Card Images/6S.png";
import spades7 from "./Card Images/7S.png";
import spades8 from "./Card Images/8S.png";
import spades9 from "./Card Images/9S.png";
import spades10 from "./Card Images/10S.png";
import spades11 from "./Card Images/JS.png";
import spades12 from "./Card Images/QS.png";
import spades13 from "./Card Images/KS.png";
import hearts1 from "./Card Images/AH.png";
import hearts2 from "./Card Images/2H.png";
import hearts3 from "./Card Images/3H.png";
import hearts4 from "./Card Images/4H.png";
import hearts5 from "./Card Images/5H.png";
import hearts6 from "./Card Images/6H.png";
import hearts7 from "./Card Images/7H.png";
import hearts8 from "./Card Images/8H.png";
import hearts9 from "./Card Images/9H.png";
import hearts10 from "./Card Images/10H.png";
import hearts11 from "./Card Images/JH.png";
import hearts12 from "./Card Images/QH.png";
import hearts13 from "./Card Images/KH.png";
import diamonds1 from "./Card Images/AD.png";
import diamonds2 from "./Card Images/2D.png";
import diamonds3 from "./Card Images/3D.png";
import diamonds4 from "./Card Images/4D.png";
import diamonds5 from "./Card Images/5D.png";
import diamonds6 from "./Card Images/6D.png";
import diamonds7 from "./Card Images/7D.png";
import diamonds8 from "./Card Images/8D.png";
import diamonds9 from "./Card Images/9D.png";
import diamonds10 from "./Card Images/10D.png";
import diamonds11 from "./Card Images/JD.png";
import diamonds12 from "./Card Images/QD.png";
import diamonds13 from "./Card Images/KD.png";
import back from "./Card Images/blue_back.png";

const clubs = [clubs1, clubs2, clubs3, clubs4, clubs5, clubs6, clubs7, clubs8, clubs9, clubs10, clubs11, clubs12, clubs13];
const spades = [spades1, spades2, spades3, spades4, spades5, spades6, spades7, spades8, spades9, spades10, spades11, spades12, spades13];
const hearts = [hearts1, hearts2, hearts3, hearts4, hearts5, hearts6, hearts7, hearts8, hearts9, hearts10, hearts11, hearts12, hearts13];
const diamonds = [diamonds1, diamonds2, diamonds3, diamonds4, diamonds5, diamonds6, diamonds7, diamonds8, diamonds9, diamonds10, diamonds11, diamonds12, diamonds13];

export const PLAYING_CARD_SUITS = {
    Hearts: "HEARTS",
    Diamonds: "DIAMONDS",
    Spades: "SPADES",
    Clubs: "CLUBS",
};

export const PLAYING_CARD_IMAGES = {
    [PLAYING_CARD_SUITS.Clubs]: clubs,
    [PLAYING_CARD_SUITS.Spades]: spades,
    [PLAYING_CARD_SUITS.Hearts]: hearts,
    [PLAYING_CARD_SUITS.Diamonds]: diamonds,
};

export const PLAYING_CARD_BACK = back;