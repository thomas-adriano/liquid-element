import optimizedResizeEvent from 'optimized-resize-event';

main();

function main() {
    const liquidElement = document.getElementById('liquid-element');
    let actualLiquidElementHeight = 0;
    if (!liquidElement) {
        console.warn('No #liquid-element element found.');
        console.warn('To use liquid-element you have to specify one element with id #liquid-element.');
        return;
    }
    resizeLiquidElement();
    optimizedResizeEvent.startEventDispatcher();
    window.addEventListener('optimizedResize', function() {
        resizeLiquidElement();
    });

    function resizeLiquidElement() {
        let refHeights = getReferenceHeights();
        let totalRefHeight = refHeights.prevHeight + refHeights.nextHeight;
        actualLiquidElementHeight = (window.innerHeight - totalRefHeight);
        actualLiquidElementHeight = actualLiquidElementHeight < 1 ? 1 : actualLiquidElementHeight;
        liquidElement.style.height = actualLiquidElementHeight + 'px';
    }

    function getReferenceHeights() {
        let prevHeight = getPrevSiblingsRefereneHeight(liquidElement) || 0;
        let nextHeight = getNextSiblingsRefereneHeight(liquidElement, prevHeight + actualLiquidElementHeight) || 0;
        return {
            prevHeight: prevHeight,
            nextHeight: nextHeight
        };
    }

    function getPrevSiblingsRefereneHeight(el) {
        return getSiblingsRefereneHeight(el, (elem) => {
            return elem.previousElementSibling;
        }, (elem) => {
            return elem.getBoundingClientRect().top + elem.offsetHeight;
        });
    }

    function getNextSiblingsRefereneHeight(el, prevReferenceHeight) {
        return getSiblingsRefereneHeight(el, (elem) => {
            return elem.nextElementSibling;
        }, (elem) => {
            let relativeTop = elem.getBoundingClientRect().top - prevReferenceHeight;
            relativeTop = relativeTop < 0 ? 0 : relativeTop;
            let res = relativeTop + elem.offsetHeight;
            return res;
        });
    }

    function getSiblingsRefereneHeight(el, nextFunc, heightFunc) {
        let res = [];
        let sibling = nextFunc(el);
        let actualReferenceHeight;
        let prevReferenceHeight;
        let referenceHeight;
        while (sibling) {
            prevReferenceHeight = actualReferenceHeight;
            actualReferenceHeight = heightFunc(sibling);
            let cs = window.getComputedStyle(sibling, null);
            let pos = cs.getPropertyValue('position');
            if (pos !== 'absolute' && pos !== 'fixed') {
                if (!prevReferenceHeight || actualReferenceHeight > prevReferenceHeight) {
                    referenceHeight = actualReferenceHeight;
                }
            }
            sibling = nextFunc(sibling);
        }
        return referenceHeight;
    }
}