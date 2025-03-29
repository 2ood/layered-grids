window.onload = function() {

    /* variables */
    const tags = document.querySelectorAll('tag');
    const upButton = document.getElementById('up-button');
    const downButton = document.getElementById('down-button'); 
    const toggleShuffleModeButton = document.getElementById('toggle-shuffle-mode');
    const layers = document.querySelectorAll("layer");
    const layerContainer = document.getElementById('layer-container');
    const containerHandle = document.getElementById('container-handle');
    const objectsContainer = document.getElementById('objects-container');
    const shuffleHint = document.getElementById("shuffle-hint");

    /* states */
    let states = {};

    /* add event listeners */
    tags.forEach(tag => tag.addEventListener('click', tagClickHandler));
    upButton.addEventListener('click', (evt) => upButtonClickHandler(evt));
    downButton.addEventListener('click', (evt) => downButtonClickHandler(evt));
    toggleShuffleModeButton.addEventListener('click', (evt)=>{toggleShuffleClickHandler(evt)});
    layers.forEach(layer => {
        layer.draggable = true;
        layer.addEventListener('dragstart', ()=>{});
        layer.addEventListener('dragend', ()=>{});
    });
    containerHandle.addEventListener('click', ()=>{objectsContainer.classList.toggle('active')});

    /* enable shortcut keys */
    ShortcutKeysEnabler();
    
    /* end of main flow */

    /* state variable scanner */
    function currentStates(){
        const isShuffleMode = layerContainer.classList.contains('shuffle-mode');
        const selectedLayer = document.querySelector('layer.selected');
        const currentFloorNumber = selectedLayer?parseInt(selectedLayer.style.getPropertyValue('--floor')):1;
        const upperLayer = document.querySelector(`layer[floor="${currentFloorNumber + 1}"]`);
        const lowerLayer = document.querySelector(`layer[floor="${currentFloorNumber-1}"]`);

        return {
            "isShuffleMode": isShuffleMode,
            "selectedLayer": selectedLayer,
            "currentFloorNumber": currentFloorNumber,
            "upperLayer": upperLayer,
            "lowerLayer": lowerLayer
        }
    }

    function toggleShuffleClickHandler(evt) {
        const isShuffleMode = layerContainer.classList.contains('shuffle-mode');
        const selectedLayer = document.querySelector('layer.selected');

        if (isShuffleMode) {
            upButton.disabled = true;
            downButton.disabled = true;
            shuffleHint.classList.add("invisible");
        } else {
            if (selectedLayer ==null) {
                layers[0].classList.add("selected");
            }
            shuffleHint.classList.remove("invisible");
            upButton.disabled = false;
            downButton.disabled = false;
        }
        layerContainer.classList.toggle('shuffle-mode');
        
    }

    /* below are event handler definitions */
    function tagClickHandler(evt){
        const clickedLayer = evt.target.parentElement;

        layers.forEach(layer => {
            if (layer==clickedLayer) {
                layer.classList.toggle('selected');
            } else {
                layer.classList.remove('selected');
            }
        });
    }

    function upButtonClickHandler(evt){
        states = currentStates(); 

        if(!states.isShuffleMode) return;
        
        const selectedLayer = states.selectedLayer;
        const currentFloorNumber = states.currentFloorNumber;
        const upperLayer = states.upperLayer;
    
        if (upperLayer) {
            selectedLayer.style.setProperty('--floor', currentFloorNumber +1);
            selectedLayer.setAttribute('floor', currentFloorNumber + 1);
            upperLayer.style.setProperty('--floor', currentFloorNumber);
            upperLayer.setAttribute('floor', currentFloorNumber);
        }
    }

    function downButtonClickHandler(evt) {
        states = currentStates(); 

        if(!states.isShuffleMode) return;
        
        const selectedLayer = states.selectedLayer;
        const currentFloorNumber = states.currentFloorNumber;
    
        const lowerLayer = states.lowerLayer;
        if (lowerLayer) {
            selectedLayer.style.setProperty('--floor', currentFloorNumber-1);
            selectedLayer.setAttribute('floor', currentFloorNumber-1);
            lowerLayer.style.setProperty('--floor', currentFloorNumber);
            lowerLayer.setAttribute('floor', currentFloorNumber);
        }
    }

    function ShortcutKeysEnabler(evt) {
        window.addEventListener('keydown', function(evt) {
            switch(evt.key) {
                case 'ArrowUp':
                    upButton.click(); break;
                case 'ArrowDown':
                    downButton.click();break;
            }
        });
    }
}




