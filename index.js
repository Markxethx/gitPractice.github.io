import {catsData} from './data.js';

window.addEventListener('load', () => {
    const emotionRadio = document.getElementById('emotion-radios');
    const gifsOnlyOption = document.getElementById('gifs-only-option');
    const memeModal = document.getElementById('meme-modal')
    const memeModalInner = document.getElementById('meme-modal-inner');
    const getImageBtn = document.getElementById('get-image-btn');
    const memeModalCloseBtn = document.getElementById('meme-modal-close-btn');
    const catsEmotionArray = [];
    emotionRadio.addEventListener('change', getHighLighted);
    getImageBtn.addEventListener('click', renderCats);

    memeModalCloseBtn.addEventListener('click', function() {
        memeModal.style.display = 'none';
    });

    function getHighLighted(e) {
        const radios = document.getElementsByClassName('radio');

        for (let radio of radios) {
            radio.classList.remove('highlight')
        }
        document.getElementById(e.target.id).parentElement.classList.add('highlight')
    };

    function getMatchingArray() {
        if (document.querySelector('input[type="radio"]:checked')){
            const selectedEmotion = document.querySelector('input[type="radio"]:checked').value;
            const isGif = gifsOnlyOption.checked;

            const matchingCatsArray = catsData.filter(function(cat){

                if (isGif) {
                    return cat.emotionTags.includes(selectedEmotion) && cat.isGif
                } else {
                    return cat.emotionTags.includes(selectedEmotion)
                }
            });
            return matchingCatsArray
        }
    }

    function getSingleObject() {
        const catsArray = getMatchingArray();

        if (catsArray.length === 1) {
            return catsArray[0]
        } else {
            const random = Math.floor(Math.random() * catsArray.length)
            return catsArray[random]
        }
    }

    function renderCats() {
        const catsObject = getSingleObject();

        memeModalInner.innerHTML = `
        <img 
        class="cat-img"
        src="/images/${catsObject.image}" 
        alt="${catsObject.alt}"
        >
        `

        memeModal.style.display = 'flex';
    }
    function getSelectedEmotion(cats) {
        for (let cat of cats) {
            for (let emotion of cat.emotionTags) {
                if (!catsEmotionArray.includes(emotion)) {
                    catsEmotionArray.push(emotion)
                };
            };
        };
        return catsEmotionArray
    };

    function renderEmotionToDom(cats) {
        let radioItem = ``;
        let emotions = getSelectedEmotion(cats);
        for (let emotion of emotions) {
            radioItem += `
            <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input 
            type="radio" 
            value="${emotion}"  
            id="${emotion}"
            name="emotions">
            </div>
            `
        };

        emotionRadio.innerHTML = radioItem;

    }
    renderEmotionToDom(catsData);
})



