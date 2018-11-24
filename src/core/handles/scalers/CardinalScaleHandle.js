import { CardinalOrientation } from '../../orientations/CardinalOrientation';
import { ScaleHandle } from './ScaleHandle';


export class CardinalScaleHandle extends ScaleHandle {

    constructor (parent, orientation) {
        super(parent, new CardinalOrientation(parent, orientation));
    }

}
