var Counter = 0,
    BaseTemplate =
        '<div id="{id}" class="modal fade" tabindex="-1" role="dialog">' +
            '<div class="modal-dialog {size}">' +
                '<div class="modal-content">' +
                    '<div class="modal-header">{header}</div>' +
                    '<div class="modal-body">{body}</div>' +
                    '<div class="modal-footer">{footer}</div>' +
                '</div>' +
            '</div>' +
        '</div>';

//helper functions

/**
 *  replace matches in string
 */
function setValue(string, key, value){
    return string.replace('{' + key + '}', $.type(value) === "string" ? value : '');
}

//hidden callback
function hidden(){
    if(this.params.autoDestroy === true){
        this.destroy();
    }else if(this.hiddenCallback){
        this.hiddenCallback();
    }
}

/**
 *
 * @param params
 * @constructor
 */
Modal = function(params){
    var template = BaseTemplate;
    if(!params){
        params = {};
    }
    //assign a unique id
    template = setValue(template, 'id', params.id || ('modal-' + ++Counter));
    //set modal dialog size
    template = setValue(template, 'size', 'modal-' + (params.size === 'large' ? 'lg' : 'sm'));
    //update template content
    $(['header', 'body', 'footer']).each(function(index, key){
        template =  setValue(template, key, params[key]);
        delete params[key];
    });
    //create dom from html string
    this.window = $(template);
    //update header element with dom if specified
    if(params.headerEl){
        this.window.find('.modal-header').append(params.headerEl);
        delete params.headerEl;
    }
    //update body element with dom if specified
    if(params.bodyEl){
        this.window.find('.modal-body').append(params.bodyEl);
        delete params.bodyEl;
    }
    //update footer element with dom if specified
    if(params.footerEl){
        this.window.find('.modal-footer').append(params.footerEl);
        delete params.footerEl;
    }
    /**
     * append to the given parent dom (if specified)
     * or to body element (default)
     * setting append to false will prevent this action
     */
    if(params.append !== false){
        $(params.parent || 'body').append(this.window);
        delete params.parent;
    }
    /**
     * store params for future reference
     */
    this.params = params;
    /**
     * autoDestroy (defaults to true)
     * will destroy this modal when it is
     * hidden either by calling hide method
     * or via user interaction
     */
    this.window.on('hidden.bs.modal', hidden.bind(this));
};

//returns the dom element
Modal.prototype.getElement = function(){
    return this.window;
};

//returns the id of the dom (modal) element
Modal.prototype.getId = function(){
    return this.window.attr('id');
};

//returns true if modal is alive
Modal.prototype.isAlive = function(){
    return $.type(this.window) !== 'undefined';
};

//shows the bootstrap modal
Modal.prototype.show = function(params){
    this.window.modal(params);
};

//hides the bootstrap modal
Modal.prototype.hide = function(){
    this.window.modal('hide');
};

//add hidden callback
Modal.prototype.hidden = function(callback){
    this.hiddenCallback = callback;
};

//destroy the bootstrap modal
Modal.prototype.destroy = function(){
    this.window.remove();
    delete this.window;
    delete this.params;
    delete this.hiddenCallback;
};