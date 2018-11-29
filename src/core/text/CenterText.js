import { CenterOrientation } from '../orientations/CenterOrientation';
import { AbstractText } from './AbstractText';


export class CenterText extends AbstractText {

    constructor (owner, content) {
        super(new CenterOrientation(owner), content);
    }

}
