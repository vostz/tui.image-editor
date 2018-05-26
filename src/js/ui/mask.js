import maskHtml from '../template/submenu/mask';

export default class Mask {
    constructor(subMenuElement) {
        const selector = str => subMenuElement.querySelector(str);
        this._makeSubMenuElement(subMenuElement);

        this._el = {
            applyButton: selector('#mask-apply'),
            maskImageButton: selector('#mask-image-file')
        };
    }

    addEvent({loadImageFromURL, applyFilter}) {
        this._el.maskImageButton.addEventListener('change', event => {
            const supportingFileAPI = !!(window.File && window.FileList && window.FileReader);
            let imgUrl;

            if (!supportingFileAPI) {
                alert('This browser does not support file-api');
            }

            const [file] = event.target.files;

            if (file) {
                imgUrl = URL.createObjectURL(file);
                loadImageFromURL(imgUrl, file);
                this._el.applyButton.classList.add('active');
            }
        });

        this._el.applyButton.addEventListener('click', () => {
            applyFilter();
            this._el.applyButton.classList.remove('active');
        });
    }

    _makeSubMenuElement(subMenuElement) {
        const maskSubMenu = document.createElement('div');
        maskSubMenu.className = 'mask';
        maskSubMenu.innerHTML = maskHtml;

        subMenuElement.appendChild(maskSubMenu);
    }
}