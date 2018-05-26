import util from '../util';
import Colorpicker from './colorpicker';
import Range from './range';
import drawHtml from '../template/submenu/draw';

export default class Draw {
    constructor(subMenuElement) {
        const selector = str => subMenuElement.querySelector(str);
        this._makeSubMenuElement(subMenuElement);

        this._el = {
            lineSelectButton: selector('#draw-line-select-button'),
            drawColorpicker: new Colorpicker(selector('#draw-color')),
            drawRange: new Range(selector('#draw-range'), {
                min: 5,
                max: 30,
                value: 12
            }),
            drawRangeValue: selector('#draw-range-value')
        };

        this.type = 'line';
        this.color = this._el.drawColorpicker.getColor();
        this.width = this._el.drawRange.getValue();
    }

    _makeSubMenuElement(subMenuElement) {
        const drawSubMenu = document.createElement('div');
        drawSubMenu.className = 'draw';
        drawSubMenu.innerHTML = drawHtml;

        subMenuElement.appendChild(drawSubMenu);
    }

    setDrawMode() {
        this.actions.setDrawMode(this.type, {
            width: this.width,
            color: util.getRgb(this.color, 0.7)
        });
    }

    addEvent(actions) {
        this.actions = actions;

        this._el.lineSelectButton.addEventListener('click', event => {
            const button = event.target.closest('.button');
            const [lineType] = button.className.match(/(free|line)/);
            this._el.lineSelectButton.classList.remove(this.type);
            this._el.lineSelectButton.classList.add(lineType);

            this.type = lineType;
            this.setDrawMode();
        });

        this._el.drawColorpicker.on('change', color => {
            color = color || 'transparent';
            this.color = color;
            this.setDrawMode();
        });

        this._el.drawRange.on('change', value => {
            value = parseInt(value, 10);
            this._el.drawRangeValue.value = value;
            this.width = value;
            this.setDrawMode();
        });
        this._el.drawRangeValue.value = this._el.drawRange.getValue();
    }
}