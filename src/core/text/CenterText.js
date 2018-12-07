import { CenterOrientation } from '../orientations/CenterOrientation';
import { Text } from './Text';


export class CenterText extends Text {

    constructor (owner, content) {
        super(new CenterOrientation(owner), content);
    }

}
