import * as React from "react";
import { PLAYING_CARD_IMAGES, PLAYING_CARD_BACK } from "./PlayingCardResources";
import "./PlayingCard.css";

/**
 * props:
 *   suit: value of PLAYING_CARD_SUITS
 *   rank: number (1-13, Ace=1 and King=13)
 *   selected?: boolean
 *   flipped?: boolean
 *   width: number
 */
export class PlayingCard extends React.Component {
    render() {
        return (
            <div className="playing-card__container" style={{width: this.props.width, height: this.props.width * 1.53}}>
                <img className="playing-card__image" src={this.props.flipped ? PLAYING_CARD_BACK : PLAYING_CARD_IMAGES[this.props.suit][this.props.rank-1]} />
                {this.props.selected && <div className="playing-card--selected" />}
            </div>
        );
    }
}