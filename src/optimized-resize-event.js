/**
 * Creates a more memory/process friendly resize event.
 */
export default {
        startEventDispatcher: startEventDispatcher,   
}

function startEventDispatcher(argument) {
    var running = false;
    var augumentedEvtName = 'optimizedResize';
    window.addEventListener('resize', dispatchEventAt60FPS);
    
    function dispatchEventAt60FPS() {
        if (running) {
            return;
        }
        running = true;
        if (window.requestAnimationFrame) {
            window.requestAnimationFrame(dispatchEvt);
        } else {
            setTimeout(dispatchEvt(), 16.66);
        }
    }
    
    function dispatchEvt() {
        window.dispatchEvent(new CustomEvent(augumentedEvtName));
        running = false;
    }
}